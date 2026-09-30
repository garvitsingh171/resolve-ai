import { GoogleGenAI } from "@google/genai";
import { getServerEnvironment } from "@/lib/env";
let geminiClient: GoogleGenAI | undefined;
export function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) geminiClient = new GoogleGenAI({ apiKey: getServerEnvironment().GEMINI_API_KEY });
  return geminiClient;
}
