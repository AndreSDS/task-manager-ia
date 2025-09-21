import TaskList from "~/features/tasks/task-list";
import { turso } from "~/services/turso";

export async function loader() {
   return {}
}

export default function () {
    return <TaskList />
}
