import type { AIProvider } from "../constants/data";
import { buildReplyPrompt, buildRoastPrompt } from "./prompts";

const BACKEND_URL = "https://ghost-writer-api-xrxh.onrender.com";
const APP_SECRET = "ghostwriter2024secret";

interface GenerateParams {
  mode: "reply" | "roast";
  inputText: string;
  relationship?: string;
  tone?: string;
  roastLevel?: string;
  hasImage: boolean;
  imageBase64?: string;
  provider: AIProvider;
  apiKey?: string;
}

export async function generateReplies(params: GenerateParams): Promise<string[]> {
  let prompt: string;
  const imageContext = params.imageBase64
    ? "\nI have attached a screenshot. Please read the messages and use them as context. Focus on the most recent message that needs a reply."
    : "";
  if (params.mode === "roast") {
    prompt = buildRoastPrompt({
      inputText: params.inputText + (params.imageBase64 ? "\n[A photo has been attached to roast]" : ""),
      roastLevel: params.roastLevel || "medium",
      hasImage: !!params.imageBase64,
    });
    if (params.imageBase64) prompt += "\nLook at the attached image and roast what you see.";
  } else {
    prompt = buildReplyPrompt({
      inputText: params.inputText + imageContext,
      relationship: params.relationship || "friend",
      tone: params.tone || "funny",
      hasImage: !!params.imageBase64,
    });
  }
  try {
    const response = await fetch(BACKEND_URL + "/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-app-secret": APP_SECRET },
      body: JSON.stringify({ provider: params.provider, prompt, imageBase64: params.imageBase64 || undefined }),
    });
    if (!response.ok) {
      const errBody = await response.text();
      console.error("Backend error:", errBody);
      throw new Error("API error: " + response.status);
    }
    const data = await response.json();
    return data.replies;
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
}