import { ChatInterface } from "~/components/chat-interface";
import TaskContent from "./task-content";

export default function () {
    return (
        <div className="p-6 grid grid-cols-2 gap-6">
            <ChatInterface />
            <TaskContent />
        </div>
    )
}

