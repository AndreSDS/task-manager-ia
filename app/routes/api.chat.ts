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

    const assistantMessageRecord = await createChatMessages(chatId, userMessage, assistantMessage);

    // Buscar task existente relacionada a este chat
    const existingTask = await prisma.task.findFirst({
      where: {
        chat_message_id: {
          in: chat.messages.map(msg => msg.id)
        }
      },
    });

    if (existingTask) {
      // Atualizar a task existente
      await prisma.task.update({
        where: { id: existingTask.id },
        data: {
          title: userMessage.content || existingTask.title,
          description: assistantMessage.content,
          chat_history: `${existingTask.chat_history || ''}\n${userMessage.content}\n${assistantMessage.content}`,
          chat_message_id: assistantMessageRecord.id, // Associar à nova mensagem do assistente
          updated_at: new Date(),
        },
      });
    } else {
      // Criar uma nova task e associar à última mensagem do assistente
      await prisma.task.create({
        data: {
          title: userMessage.content || "Nova Task",
          description: assistantMessage.content || "Descrição gerada pela IA", 
          chat_history: `${userMessage.content}\n${assistantMessage.content}`,
          chat_message_id: assistantMessageRecord.id,
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

    const assistantMessageRecord = await createChatMessages(chat.id, userMessage, assistantMessage);

    await prisma.task.create({
      data: {
        title: userMessage.content || "Nova Task",
        description: assistantMessage.content || "Descrição gerada pela IA",
        chat_history: `${userMessage.content}\n${assistantMessage.content}`,
        chat_message_id: assistantMessageRecord.id,
      },
    });

    return redirect(`/tasks/new?chat=${chat.id}`);
  }
}
