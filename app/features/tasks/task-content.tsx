import { BookOpen, CheckCircle, ClipboardList, Clock, Code, FlaskConical, Lightbulb } from "lucide-react";
import { useLoaderData } from "react-router";
import { TaskCard, type TaskCardProps } from "~/components/task-card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { loader } from "~/routes/task-new";

export default function TaskContent() {
  const { task } = useLoaderData<typeof loader>();

  if (!task.title) return null;

  const stepsArray = Array.isArray(task.steps) ? (task.steps as string[]) : [];
  const acceptanceCriteriaArray = Array.isArray(task.acceptance_criteria)
    ? (task.acceptance_criteria as string[])
    : [];
  const suggestedTestsArray = Array.isArray(task.suggested_tests)
    ? (task.suggested_tests as string[])
    : [];

  const listItems = (items: string | string[] | undefined) => {
    if (!items) return null;
    if (Array.isArray(items)) {
      return (
        <ul className="list-disc pl-5">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p>{items}</p>;
  };

  const cardData: TaskCardProps[] = [
    {
      title: "Title",
      content: task.title,
      icon: BookOpen,
    },
    {
      title: "Description",
      content: task.description,
      icon: ClipboardList,
    },
    {
      title: "Estimated Time",
      content: task.estimated_time,
      icon: Clock,
    },
    {
      title: "Steps",
      content: listItems(stepsArray),
      icon: Lightbulb,
    },
    {
      title: "Acceptance Criteria",
      content: listItems(acceptanceCriteriaArray),
      icon: CheckCircle,
    },
    {
      title: "Suggested Tests",
      content: listItems(suggestedTestsArray),
      icon: FlaskConical,
    },
    {
      title: "Implementation Suggestion",
      content: task.implementation_suggestion,
      icon: Code,
    },
  ];

  return (
    <section className="flex flex-col w-full mx-auto px-4 max-h-[calc(100vh-10rem)]">
      <ScrollArea className="flex-1 p-4 h-full overflow-y-auto">
        <div className="grid gap-4">
          {cardData.map((card) => (
            <TaskCard
              key={card.title}
              title={card.title || ""}
              content={card.content}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-end pt-4">
        <Button>Salvar Task</Button>
      </div>
    </section>
  );
}
