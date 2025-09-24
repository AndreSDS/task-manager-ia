import prisma from "prisma/prisma";
import { redirect } from "react-router";
import TaskChatBot from "~/features/tasks/task-chat-bot";
import type { ChatMessages } from "~/generated/prisma/client";
import type { Route } from "./+types/task-new";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get("chat");
  let messages = [] as ChatMessages[];

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) {
      return redirect("/tasks/new");
    }

    messages = chat.messages;
  }

  return { chatId, messages };
}

export default function () {
  return <TaskChatBot />;
}
