import { Task, TaskSortOrder } from "@/types/task";

export function sortTasks(tasks: Task[], sortOrder: TaskSortOrder): Task[] {
  return [...tasks].sort((a, b) => {
    return sortOrder === "asc" ? a.dueDate - b.dueDate : b.dueDate - a.dueDate;
  });
}
