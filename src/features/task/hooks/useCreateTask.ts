import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/features/task/services/taskApi";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return createTaskMutation;
}
