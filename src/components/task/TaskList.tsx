import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {tasks.map((task, index) => (
        <li key={index}>
          <TaskCard {...task} />
        </li>
      ))}
    </ul>
  );
}
