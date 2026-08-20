import OpenAI from "openai";
import { env } from "@/lib/env";

let _client: OpenAI | null = null;

export function getOpenAI(): OpenAI | null {
  if (!env.hasOpenAI) return null;
  if (_client) return _client;
  _client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  return _client;
}
