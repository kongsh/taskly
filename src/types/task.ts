export type TaskStatus = "todo" | "progress" | "done";

export type StatusFilter = TaskStatus | "all";

export type TaskSortOrder = "asc" | "desc";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: number;
}

export interface TaskForm {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}
