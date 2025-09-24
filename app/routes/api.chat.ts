import prisma from "prisma/prisma";
import { redirect } from "react-router";
import { ChatMessageRole } from "~/generated/prisma/client";
import { getChatCompletionsStream } from "~/services/aiChat.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userMessage = formData.get("message") as string;
  const chatId = formData.get("chatId") as string;

  let chat;
  let existingChat: any;
  let answerMessage: any;

  const chatMessage = {
    role: ChatMessageRole.user,
    content: userMessage,
  };

  if (chatId) {
    existingChat = await prisma.chat.findUnique({
      where: { id: chatId },
    });
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
        answerMessage = {
          role: ChatMessageRole.assistant,
          content: answerContent,
        };

        if (existingChat) {
          await prisma.chatMessages.createMany({
            data: [
              {
                chat_id: existingChat.id,
                ...chatMessage,
              },
              {
                chat_id: existingChat.id,
                ...answerMessage,
              },
            ],
          });
        } else {
          // Create new chat and get its ID
          chat = await prisma.chat.create({
            data: {},
          });

          await prisma.chatMessages.createMany({
            data: [
              {
                chat_id: chat.id,
                ...chatMessage,
              },
              {
                chat_id: chat.id,
                ...answerMessage,
              },
            ],
          });

          redirect(`tasks/new?chat=${chat.id}`)
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}
