import path from 'path';
import fs from 'fs';
import os from 'os';
import { EdgeTTS } from 'node-edge-tts';
import { GoogleGenAI } from '@google/genai';
import { prepareUzbekSpeechText } from '../../src/utils/uzbekPhonetics';

const ttsCache = new Map<string, Buffer>();
const MAX_CACHE_ITEMS = 200;

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

export const handler = async (event: any) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  let body: any = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch {
      body = {};
    }
  }

  const query = event.queryStringParameters || {};
  const text = (event.httpMethod === 'POST' ? body?.text : query?.text) as string;
  const lang = ((event.httpMethod === 'POST' ? body?.lang : query?.lang) || 'uz') as string;
  const requestedVoice = ((event.httpMethod === 'POST' ? body?.voice : query?.voice) || 'Madina') as string;

  if (!text || !text.trim()) {
    return {
      statusCode: 400,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Text is required' }),
    };
  }

  const cleanText = lang === 'uz' ? prepareUzbekSpeechText(text) : text.trim();
  const cacheKey = `${lang}::${requestedVoice}::${cleanText}`;

  // 1. In-memory cache
  const cached = ttsCache.get(cacheKey);
  if (cached) {
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
      body: cached.toString('base64'),
      isBase64Encoded: true,
    };
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

        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400, immutable',
          },
          body: mp3Buffer.toString('base64'),
          isBase64Encoded: true,
        };
      }
    }
  } catch {
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

        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'audio/wav',
            'Cache-Control': 'public, max-age=86400, immutable',
          },
          body: wavBuffer.toString('base64'),
          isBase64Encoded: true,
        };
      }
    } catch {
      // Continue to client fallback
    }
  }

  // 4. Return fallback signal so client-side speech synthesis runs
  return {
    statusCode: 200,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fallback: true, reason: 'FALLBACK' }),
  };
};
