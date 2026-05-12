import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatMistralAI } from "@langchain/mistralai";

import app_config from "../config/congig.js";

export const googleModel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: app_config.GOOGLE_API_KEY,
});

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: app_config.COHERE_API_KEY,
});

export const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: app_config.MISTRAL_API_KEY,
});
