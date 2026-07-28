import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/features/task/services/taskApi";
import { TaskForm } from "@/types/task";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: TaskForm }) =>
      updateTask(id, task),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return updateTaskMutation;
}
