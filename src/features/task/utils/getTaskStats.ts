import { Task } from "@/types/task";

type TaskStats = {
  inProgress: number;
  completed: number;
};

export function getTaskStats(tasks: Task[]): TaskStats {
  return tasks.reduce(
    (acc, task) => {
      if (task.status === "progress") {
        acc.inProgress++;
      }

      if (task.status === "done") {
        acc.completed++;
      }

      return acc;
    },
    {
      inProgress: 0,
      completed: 0,
    },
  );
}
