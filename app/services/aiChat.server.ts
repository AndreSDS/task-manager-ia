import OpenAI from "openai";
import type { ChatMessage } from "~/features/tasks/types";
import { getApiKey, getEndpoint, loadEnvironment } from "~/lib/helpers";

loadEnvironment();


export async function* getChatCompletionsStream(messages: ChatMessage[]) {
  try {
    const token = getApiKey("GITHUB_MODELS_TOKEN");
    const endpoint = getEndpoint("GITHUB_MODELS_ENDPOINT");
    const modelName = process.env.GITHUB_MODELS_NAME || "";

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const stream = await client.chat.completions.create({
      messages,
      temperature: 0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName,
      stream: true,
    });

    for await (const chunk of stream) {
      // chunk.choices[0]?.delta?.content pode conter parte da resposta
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) yield delta;
    }
  } catch (error) {
    console.error("Erro:", error instanceof Error ? error.message : error);
  }
}
