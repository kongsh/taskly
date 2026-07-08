import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

const tasks: Task[] = [
  {
    title: "Task 1",
    description: "This is the description for Task 1",
    status: "todo",
    dueDate: 7,
  },
  {
    title: "Task 2",
    description: "This is the description for Task 2",
    status: "progress",
    dueDate: 5,
  },
  {
    title: "Task 3",
    description: "This is the description for Task 3",
    status: "done",
    dueDate: 0,
  },
  {
    title: "Task 4",
    description: "This is the description for Task 4",
    status: "todo",
    dueDate: 10,
  },
  {
    title: "Task 5",
    description: "This is the description for Task 5",
    status: "progress",
    dueDate: 3,
  },
];

export function TaskList() {
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
