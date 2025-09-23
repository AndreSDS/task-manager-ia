import prisma from "prisma/prisma";
import TaskList from "~/features/tasks/task-list";

export async function loader() {
    const tasks =  await prisma.task.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            created_at: true,
            updated_at: true,
            steps: true,
            estimated_time: true,
            implementation_suggestion: true,
            acceptance_criteria: true,
            suggested_tests: true,
            content: true,
            chat_history: true,
            completed: true
        }
    });

    return {
        tasks
    }
}

export default function () {
    return <TaskList />
}
