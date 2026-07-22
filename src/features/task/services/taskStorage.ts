import { Task } from "@/types/task";

const STORAGE_KEY = "TASK_LIST";

export function loadTasks(fallback: Task[]): Task[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return fallback;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

export function saveTasks(taskList: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
}
