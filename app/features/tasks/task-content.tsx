import {
  BookOpen,
  CheckCircle,
  ClipboardList,
  Clock,
  Code,
  FlaskConical,
  Lightbulb,
} from "lucide-react";
import { TaskCard } from "~/components/task-card";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

const mockTaskData = {
  title: "Secure Login Form with Authentication",
  description:
    "Implement a modern login form with field validation, session-based authentication, and real-time error feedback.",
  estimated_time: "2 days",
  steps: [
    "Create a form component using React",
    "Add field validation using a suitable library",
    "Connect backend for user authentication",
    "Persist sessions using SQLite",
    "Test full login and logout flow",
  ],
  suggested_tests: [
    "it('should render login form correctly')",
    "it('should validate input fields')",
    "it('should authenticate valid credentials')",
    "it('should prevent access with invalid credentials')",
  ],
  acceptance_criteria: [
    "Login form displays properly with required fields",
    "Invalid input is correctly flagged",
    "Valid users can log in and maintain a session",
    "Users are redirected upon login and logout",
  ],
  implementation_suggestion:
    "Use React Hook Form for input validation, Prisma ORM for managing user data, and configure protected routes using React Router 7.",
};

export default function TaskContent() {
  const task = mockTaskData; // Replace with actual data from chatbot later

  const cardData = [
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
      content: (
        <ul className="list-disc pl-5">
          {task.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      ),
      icon: Lightbulb,
    },
    {
      title: "Acceptance Criteria",
      content: (
        <ul className="list-disc pl-5">
          {task.acceptance_criteria.map((criteria, index) => (
            <li key={index}>{criteria}</li>
          ))}
        </ul>
      ),
      icon: CheckCircle,
    },
    {
      title: "Suggested Tests",
      content: (
        <ul className="list-disc pl-5">
          {task.suggested_tests.map((test, index) => (
            <li key={index}>{test}</li>
          ))}
        </ul>
      ),
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
          {cardData.map((card, index) => (
            <TaskCard
              key={index}
              title={card.title}
              content={card.content}
              icon={card.icon}
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
