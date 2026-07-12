export type TaskStatus = "todo" | "progress" | "done";

export type StatusFilter = TaskStatus | "all";

export type TaskSortOrder = "asc" | "desc";

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: number;
}
