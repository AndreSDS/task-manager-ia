import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function Welcome() {
  return (
    <main className="flex min-h-screen items-center justify-center p-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Get started with your task management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This is your personal task management dashboard. Start organizing
            your tasks efficiently.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Get Started</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
