import { useLoaderData } from "react-router";
import { DataTable } from "~/components/data-table";
import { taskColumns } from "~/features/tasks/task-table-columns";
import type { loader } from "~/routes/tasks";

export default function TaskList() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <DataTable data={tasks} columns={taskColumns} />
    </div>
  );
}
