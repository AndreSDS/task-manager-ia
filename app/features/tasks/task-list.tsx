import { useLoaderData, Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { PencilIcon, Trash2Icon } from "lucide-react";
import type { loader } from "~/routes/tasks";

export default function TaskList() {
    const { tasks } = useLoaderData<typeof loader>();

    console.log(tasks[0])

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Tasks List</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Estimated Time</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>
                                <Checkbox checked={task.completed} />
                            </TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.estimated_time}</TableCell>
                            <TableCell>{new Date(task.created_at).toLocaleString()}</TableCell>
                            <TableCell>{new Date(task.updated_at).toLocaleString()}</TableCell>
                            <TableCell className="flex gap-2">
                                <Link to={`/tasks/${task.id}/edit`}>
                                    <Button variant="outline" size="icon">
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <form action={`/tasks/${task.id}/delete`} method="post">
                                    <Button variant="destructive" size="icon" type="submit">
                                        <Trash2Icon className="h-4 w-4" />
                                    </Button>
                                </form>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
