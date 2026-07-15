import { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "This is the description for Task 1",
    status: "todo",
    dueDate: 7,
  },
  {
    id: "2",
    title: "Task 2",
    description: "This is the description for Task 2",
    status: "progress",
    dueDate: 5,
  },
  {
    id: "3",
    title: "Task 3",
    description: "This is the description for Task 3",
    status: "done",
    dueDate: 0,
  },
  {
    id: "4",
    title: "Task 4",
    description: "This is the description for Task 4",
    status: "todo",
    dueDate: 10,
  },
  {
    id: "5",
    title: "Task 5",
    description: "This is the description for Task 5",
    status: "progress",
    dueDate: 3,
  },
];
