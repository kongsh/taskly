export type TaskStatus = "todo" | "progress" | "done";

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: number;
}
