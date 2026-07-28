import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/features/task/services/taskApi";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return deleteTaskMutation;
}
