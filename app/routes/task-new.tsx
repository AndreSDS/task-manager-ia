import prisma from "prisma/prisma";
import { redirect } from "react-router";
import TaskChatBot from "~/features/tasks/task-chat-bot";
import type { ChatMessages, Task } from "~/generated/prisma/client";
import type { Route } from "./+types/task-new";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get("chat");
  let messages = [] as ChatMessages[];
  let taskJson = null;
  let task = {} as Task;

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      return redirect("/tasks/new");
    }

    messages = chat.messages.map((msg) => ({
      ...msg,
      content:
        msg.role === "assistant"
          ? msg.content === "{}"
            ? "Sua pergunta gerou uma pessoa invalida"
            : "Solicitação atendida. Verifique o painel ao lado"
          : msg.content,
    }));

    taskJson = chat.messages[messages.length - 1].content;

    task = JSON.parse(taskJson ?? "{}");
  }

  return { chatId, messages, task };
}

export default function () {
  return <TaskChatBot />;
}
