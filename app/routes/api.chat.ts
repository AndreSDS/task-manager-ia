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
  let answerContent = "";

  const chatMessage = {
    role: ChatMessageRole.user,
    content: userMessage,
  };

  if (chatId) {
    existingChat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });
  }
  
  // Resposta para chat existente
  if (existingChat) {
    // Gera resposta da IA
    for await (const chunk of getChatCompletionsStream([...existingChat.messages, chatMessage])) {
      answerContent += chunk;
    }
    answerMessage = {
      role: ChatMessageRole.assistant,
      content: answerContent,
    };

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

    // Atualiza a Task vinculada ao chat, se existir
    const existingTask = await prisma.task.findUnique({
      where: { chatId: existingChat.id },
    });
    if (existingTask) {
      await prisma.task.update({
        where: { id: existingTask.id },
        data: {
          description: answerContent,
          chat_history: `${existingTask.chat_history}\n${userMessage}\n${answerContent}`,
          updated_at: new Date(),
        },
      });
    }

    // Redireciona após atualizar a task
    return redirect(`tasks/new?chat=${existingChat.id}`);
  } else {
    // Criação de novo chat, chatMessages e task, depois redirect
    let answerContent = "";
    for await (const chunk of getChatCompletionsStream([chatMessage])) {
      answerContent += chunk;
    }
    answerMessage = {
      role: ChatMessageRole.assistant,
      content: answerContent,
    };

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

    await prisma.task.create({
      data: {
        title: userMessage || "Nova Task",
        description: answerContent || "Descrição gerada pela IA",
        chat_history: `${userMessage}\n${answerContent}`,
        chatId: chat.id,
      },
    });

    // Retorna redirect corretamente
    return redirect(`tasks/new?chat=${chat.id}`);
  }
}
