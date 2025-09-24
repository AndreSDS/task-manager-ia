import prisma from "prisma/prisma";
import type { ChatMessage } from "~/features/tasks/types";
import { getChatCompletionsStream } from "~/services/aiChat.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userMessage = formData.get("message") as string;
  const chatId = formData.get("chatId") as string;

  let existingMessages;
  let existingChat: any;

  const chatMessage: ChatMessage = {
    id: Date.now().toFixed(),
    role: "user",
    content: userMessage,
    timestamp: new Date(),
  };

  if (chatId) {
    existingChat = await prisma.chat.findUnique({
      where: { id: chatId },
    });
  }

  if (existingChat) {
    existingMessages = JSON.parse(existingChat.content);
  } else {
    existingMessages = [];
  }

  // Streaming response
  let answerContent = "";
  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of getChatCompletionsStream([chatMessage])) {
          answerContent += chunk;
          controller.enqueue(chunk);
        }
        // Mensagem da IA montada, fecha stream
        controller.close();

        // Salva no banco após a stream estar completa
        const answerMessage = {
          id: Date.now().toFixed(),
          role: "assistant",
          content: answerContent,
          timestamp: new Date(),
        };
        if (existingChat) {
          await prisma.chat.update({
            where: { id: chatId },
            data: {
              content: JSON.stringify([...existingMessages, chatMessage, answerMessage]),
            },
          });
        } else {
          await prisma.chat.create({
            data: {
              content: JSON.stringify([chatMessage, answerMessage]),
            },
          });
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    }
  );
}
