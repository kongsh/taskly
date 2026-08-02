import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/features/task/services/taskApi";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}
