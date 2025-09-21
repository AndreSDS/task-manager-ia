import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface TaskCardProps {
  title: string;
  content: React.ReactNode;
  icon: LucideIcon;
}

export function TaskCard({ title, content, icon: Icon }: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <Icon className="h-5 w-5" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
