import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export interface TaskCardProps {
  title: string;
  content: React.ReactNode;
  icon?: LucideIcon;
}

export function TaskCard({ title, content, icon: Icon }: TaskCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
