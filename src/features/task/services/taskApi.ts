import { Tables } from "@/types/database.types";
import { Task, TaskForm } from "@/types/task";

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

export async function createTask(task: TaskForm) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Task 생성에 실패하였습니다.");
  }

  return response.json();
}

export async function updateTask(id: string, task: TaskForm) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Task 수정에 실패하였습니다.");
  }

  return response.json();
}
export async function deleteTask(id: string) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Task 삭제에 실패하였습니다.");
  }

  return response.json();
}
