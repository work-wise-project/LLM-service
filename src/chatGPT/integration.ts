import OpenAI from "openai";
import { getConfig } from "../config/config";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: getConfig().chatGPTApiKey,
});

export const sendMessageToGPT = ({
  prompt,
  model = "gpt-4o-mini",
  storeResponse = false,
}: {
  prompt: string;
  model?: ChatCompletionCreateParamsBase["model"];
  storeResponse?: boolean;
  fileId?: string;
}) => {
  return openai.chat.completions.create({
    model,
    store: storeResponse,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
};
