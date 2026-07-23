import { Tables } from "@/types/database.types";
import { Task } from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");

  if (!response.ok) {
    throw new Error("Task를 불러오지 못했습니다.");
  }

  const tasks = await response.json();

  return tasks.map(toTask);
}

const toTask = ({
  deadline,
  id,
  title,
  description,
  status,
}: Tables<"Task">): Task => {
  const dueDate = Math.max(
    0,
    Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ),
  );

  return {
    id,
    title,
    description,
    status,
    dueDate,
  };
};
