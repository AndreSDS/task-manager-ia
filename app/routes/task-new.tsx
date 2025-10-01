import prisma from "prisma/prisma";
import { redirect } from "react-router";
import TaskChatBot from "~/features/tasks/task-chat-bot";
import type { ChatMessages, Task } from "~/generated/prisma/client";
import type { Route } from "./+types/task-new";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const message_id = formData.get("message_id") as string;
  const task_id = formData.get("task_id") as string | null;

  const message = await prisma.chatMessages.findUnique({
    where: { id: message_id },
  });

  if (!message) {
    throw new Error("Message not found");
  }

  const content = JSON.parse(message.content);

  const taskData = {
    title: content.title,
    description: content.description,
    steps: JSON.stringify(content.steps),
    acceptance_criteria: JSON.stringify(content.acceptance_criteria),
    suggested_tests: JSON.stringify(content.suggested_tests),
    estimated_time: content.estimated_time,
    implementation_suggestion: content.implementation_suggestion,
    chat_message_id: message.id,
  };

  if (task_id) {
    // Atualizar task existente
    await prisma.task.update({
      where: { id: task_id },
      data: taskData as any,
    });
  } else {
    // Verificar se já existe uma task para este message_id
    const existingTask = await prisma.task.findUnique({
      where: { chat_message_id: message.id },
    });

    if (!existingTask) {
      // Criar nova task apenas se não existir
      await prisma.task.create({
        data: taskData as any,
      });
    }
  }

  return null; // Sucesso
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get("chat");
  let messages = [] as ChatMessages[];
  let taskJson = null;
  let task = {} as Task;
  let message_id;
  let task_id;

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          include: { task: true },
        },
      },
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

    const message = chat.messages[messages.length - 1];

    taskJson = message.content;
    message_id = message.id;
    task_id = message.task?.id;

    task = JSON.parse(taskJson ?? "{}");
  }

  return { chatId, messages, task, message_id, task_id };
}

export default function () {
  return <TaskChatBot />;
}
