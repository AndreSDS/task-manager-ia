import prisma from "prisma/prisma";
import { redirect } from "react-router";
import { ChatMessageRole } from "~/generated/prisma/client";
import {
  createChatMessages,
  getChatCompletion,
  type Message,
} from "~/services/aiChat.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userInput = formData.get("message") as string;
  const chatId = formData.get("chatId") as string;

  let chat;
  let assistantMessage: Message;

  const userMessage = {
    role: ChatMessageRole.user,
    content: userInput,
  };

  if (chatId) {
    chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });
  }

  if (chat) {
    assistantMessage = {
      content: await getChatCompletion([...chat.messages, userMessage]),
      role: ChatMessageRole.assistant,
    };

    await createChatMessages(chatId, userMessage, assistantMessage);

    const existingTask = await prisma.task.findUnique({
      where: { chatId },
    });

    if (existingTask) {
      await prisma.task.update({
        where: { id: existingTask.id },
        data: {
          description: assistantMessage.content,
          chat_history: `${existingTask.chat_history}\n${userMessage}\n${assistantMessage.content}`,
          updated_at: new Date(),
        },
      });
    }

    return redirect(`/tasks/new?chat=${chatId}`);
  } else {
    assistantMessage = {
      role: ChatMessageRole.assistant,
      content: await getChatCompletion([userMessage]),
    };

    chat = await prisma.chat.create({
      data: {},
    });

    await createChatMessages(chat.id, userMessage, assistantMessage);

    await prisma.task.create({
      data: {
        title: userMessage.content || "Nova Task",
        description: assistantMessage.content || "Descrição gerada pela IA",
        chat_history: `${userMessage.content}\n${assistantMessage}`,
        chatId: chat.id,
      },
    });

    return redirect(`/tasks/new?chat=${chat.id}`);
  }
}
