import path from 'path';
import fs from 'fs';
import os from 'os';
import { EdgeTTS } from 'node-edge-tts';
import { GoogleGenAI } from '@google/genai';
import { prepareUzbekSpeechText } from '../src/utils/uzbekPhonetics';

// In-memory cache across serverless warm invocations
const ttsCache = new Map<string, Buffer>();
const MAX_CACHE_ITEMS = 300;

function pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000, numChannels: number = 1): Buffer {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcmBuffer.length;
  const chunkSize = 36 + dataSize;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // Linear PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34); // 16 bits
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

export default async function handler(req: any, res: any) {
  // Support both GET and POST
  const text = (req.method === 'POST' ? req.body?.text : req.query?.text) as string;
  const lang = ((req.method === 'POST' ? req.body?.lang : req.query?.lang) || 'uz') as string;
  const requestedVoice = ((req.method === 'POST' ? req.body?.voice : req.query?.voice) || 'Madina') as string;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const cleanText = lang === 'uz' ? prepareUzbekSpeechText(text) : text.trim();
  const cacheKey = `${lang}::${requestedVoice}::${cleanText}`;

  // 1. In-memory cache
  const cached = ttsCache.get(cacheKey);
  if (cached) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    return res.send(cached);
  }

  // 2. EdgeTTS
  try {
    let voice = 'uz-UZ-MadinaNeural';
    if (lang === 'uz') {
      voice = requestedVoice.toLowerCase().includes('sardor')
        ? 'uz-UZ-SardorNeural'
        : 'uz-UZ-MadinaNeural';
    } else if (lang === 'ru') {
      voice = 'ru-RU-SvetlanaNeural';
    } else if (lang === 'en') {
      voice = 'en-US-JennyNeural';
    }

    const tempId = `tts-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp3`;
    const tempPath = path.join(os.tmpdir(), tempId);

    const edgeTts = new EdgeTTS({
      voice,
      rate: '-3%',
    });

    await edgeTts.ttsPromise(cleanText, tempPath);

    if (fs.existsSync(tempPath)) {
      const mp3Buffer = await fs.promises.readFile(tempPath);
      await fs.promises.unlink(tempPath).catch(() => {});

      if (mp3Buffer && mp3Buffer.length > 0) {
        if (ttsCache.size >= MAX_CACHE_ITEMS) {
          const firstKey = ttsCache.keys().next().value;
          if (firstKey) ttsCache.delete(firstKey);
        }
        ttsCache.set(cacheKey, mp3Buffer);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
        return res.send(mp3Buffer);
      }
    }
  } catch (edgeErr) {
    // Continue to Gemini fallback
  }

  // 3. Gemini TTS fallback
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: `[calm, warm] ${cleanText}`,
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: 'Kore',
              },
            },
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const base64Data = part?.inlineData?.data;

      if (base64Data) {
        const pcmBuffer = Buffer.from(base64Data, 'base64');
        const wavBuffer = pcmToWav(pcmBuffer, 24000, 1);

        res.setHeader('Content-Type', 'audio/wav');
        res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
        return res.send(wavBuffer);
      }
    } catch {
      // Continue to client fallback
    }
  }

  // 4. Client Web Speech fallback signal
  return res.json({ fallback: true, reason: 'FALLBACK' });
}
