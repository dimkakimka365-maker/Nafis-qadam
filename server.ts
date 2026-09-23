import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { EdgeTTS } from "node-edge-tts";
import dotenv from "dotenv";
import { prepareUzbekSpeechText } from "./src/utils/uzbekPhonetics";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Audio cache to prevent re-generating frequent phrases (letters, numbers, praises)
const ttsCache = new Map<string, Buffer>();
const MAX_CACHE_ITEMS = 600;

// Rate-limit & quota cooldown tracker (prevents 429 error cascades)
let quotaCooldownUntil = 0;

// WAV header generator for 16-bit linear PCM (24000 Hz, 1 channel mono)
function pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000, numChannels: number = 1): Buffer {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcmBuffer.length;
  const chunkSize = 36 + dataSize;
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // Linear PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34); // 16 bits per sample
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// Multilingual text normalizer for Gemini TTS
function normalizeSpeechText(rawText: string, lang: string = "uz"): { promptText: string; mood: string } {
  if (!rawText) return { promptText: "", mood: "warm" };

  const lower = rawText.toLowerCase();
  let moodTag = "[calm, warm]";

  if (lang === "ru") {
    if (
      lower.includes("молодец") ||
      lower.includes("правильно") ||
      lower.includes("отлично") ||
      lower.includes("поздравляем") ||
      lower.includes("супер")
    ) {
      moodTag = "[cheerful, happy]";
    } else if (lower.includes("попробуй") || lower.includes("ошибка") || lower.includes("неправильно")) {
      moodTag = "[gentle, comforting]";
    }
    return { promptText: `${moodTag} ${rawText}`, mood: moodTag };
  }

  if (lang === "en") {
    if (
      lower.includes("correct") ||
      lower.includes("well done") ||
      lower.includes("great") ||
      lower.includes("awesome") ||
      lower.includes("star")
    ) {
      moodTag = "[cheerful, happy]";
    } else if (lower.includes("try again") || lower.includes("incorrect")) {
      moodTag = "[gentle, encouraging]";
    }
    return { promptText: `${moodTag} ${rawText}`, mood: moodTag };
  }

  // Default: Uzbek with phonetic normalization
  const text = prepareUzbekSpeechText(rawText);
  if (
    lower.includes("barakalla") ||
    lower.includes("ofarin") ||
    lower.includes("tabriklaymiz") ||
    lower.includes("to'ppa-to'g'ri") ||
    lower.includes("to'g'ri") ||
    lower.includes("yutuq")
  ) {
    moodTag = "[cheerful, happy]";
  } else if (
    lower.includes("urinib ko'r") ||
    lower.includes("yana bir bor") ||
    lower.includes("hechqisi yo'q") ||
    lower.includes("o'ylab ko'ring")
  ) {
    moodTag = "[gentle, comforting]";
  }

  const promptText = `${moodTag} ${text}`;
  return { promptText, mood: moodTag };
}

// Lazy-initialize Gemini AI client with required User-Agent
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    ttsReady: Boolean(process.env.GEMINI_API_KEY),
    cacheSize: ttsCache.size,
  });
});

// API: Text to Speech synthesis endpoint
async function handleTtsRequest(req: express.Request, res: express.Response) {
  try {
    const text = (req.method === "POST" ? req.body?.text : req.query?.text) as string;
    const lang = (
      (req.method === "POST" ? req.body?.lang : req.query?.lang) || "uz"
    ) as string;
    const requestedVoice = (
      (req.method === "POST" ? req.body?.voice : req.query?.voice) || "Madina"
    ) as string;

    if (!text || !text.trim()) {
      res.status(400).json({ error: "Matn (text) kiritilmagan" });
      return;
    }

    const { promptText } = normalizeSpeechText(text, lang);
    const cacheKey = `${lang}::${requestedVoice}::${promptText}`;

    // 1. Check in-memory cache for instant 0ms playback
    const cached = ttsCache.get(cacheKey);
    if (cached) {
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400, immutable");
      res.send(cached);
      return;
    }

    // 2. Primary Engine: High-Fidelity EdgeTTS (Native Uzbek Neural Voice)
    // uz-UZ-MadinaNeural provides native, accent-free, warm Uzbek pronunciation
    try {
      let voice = "uz-UZ-MadinaNeural";
      if (lang === "uz") {
        voice = requestedVoice.toLowerCase().includes("sardor")
          ? "uz-UZ-SardorNeural"
          : "uz-UZ-MadinaNeural";
      } else if (lang === "ru") {
        voice = "ru-RU-SvetlanaNeural";
      } else if (lang === "en") {
        voice = "en-US-JennyNeural";
      }

      const tempId = `tts-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp3`;
      const tempPath = path.join(os.tmpdir(), tempId);

      const edgeTts = new EdgeTTS({
        voice,
        rate: "-3%", // Unhurried, clear, educational pace for young learners
      });

      // Pass the clean text to EdgeTTS
      const speechInput = lang === "uz" ? prepareUzbekSpeechText(text) : text;
      await edgeTts.ttsPromise(speechInput, tempPath);

      if (fs.existsSync(tempPath)) {
        const mp3Buffer = await fs.promises.readFile(tempPath);
        await fs.promises.unlink(tempPath).catch(() => {});

        if (mp3Buffer && mp3Buffer.length > 0) {
          if (ttsCache.size >= MAX_CACHE_ITEMS) {
            const firstKey = ttsCache.keys().next().value;
            if (firstKey) ttsCache.delete(firstKey);
          }
          ttsCache.set(cacheKey, mp3Buffer);

          res.setHeader("Content-Type", "audio/mpeg");
          res.setHeader("Cache-Control", "public, max-age=86400, immutable");
          res.send(mp3Buffer);
          return;
        }
      }
    } catch (edgeError) {
      console.warn("EdgeTTS error, checking secondary engines:", edgeError instanceof Error ? edgeError.message : edgeError);
    }

    // 3. Secondary Engine: Gemini 3.1 Flash TTS (if quota is available)
    if (Date.now() >= quotaCooldownUntil) {
      const ai = getGenAI();
      if (ai) {
        try {
          const validVoices = ["Kore", "Aoede", "Puck", "Zephyr", "Fenrir"];
          const voiceName = validVoices.includes(requestedVoice) ? requestedVoice : "Kore";

          const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: promptText,
            config: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName,
                  },
                },
              },
            },
          });

          const part = response.candidates?.[0]?.content?.parts?.[0];
          const base64Data = part?.inlineData?.data;

          if (base64Data) {
            const pcmBuffer = Buffer.from(base64Data, "base64");
            const wavBuffer = pcmToWav(pcmBuffer, 24000, 1);

            if (ttsCache.size >= MAX_CACHE_ITEMS) {
              const firstKey = ttsCache.keys().next().value;
              if (firstKey) ttsCache.delete(firstKey);
            }
            ttsCache.set(cacheKey, wavBuffer);

            res.setHeader("Content-Type", "audio/wav");
            res.setHeader("Cache-Control", "public, max-age=86400, immutable");
            res.send(wavBuffer);
            return;
          }
        } catch (geminiError: unknown) {
          const errMessage = geminiError instanceof Error ? geminiError.message : String(geminiError);
          const isRateLimit =
            errMessage.includes("429") ||
            errMessage.includes("RESOURCE_EXHAUSTED") ||
            errMessage.includes("quota") ||
            errMessage.includes("rate-limits");

          if (isRateLimit) {
            quotaCooldownUntil = Date.now() + 60 * 1000;
          }
        }
      }
    }

    // 4. Return fallback signal so client-side speech synthesis runs
    res.json({ fallback: true, reason: "FALLBACK" });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.warn("TTS request failed:", errMessage.slice(0, 120));
    res.json({ fallback: true, reason: "FALLBACK" });
  }
}

app.post("/api/tts", handleTtsRequest);
app.get("/api/tts", handleTtsRequest);

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
