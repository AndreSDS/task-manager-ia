import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import type { Task } from "~/generated/prisma/client";

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "estimated_time",
    header: "Estimated Time",
    cell: ({ row }) => <div>{row.getValue("estimated_time")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className="flex gap-2">
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
        </div>
      );
    },
  },
];
