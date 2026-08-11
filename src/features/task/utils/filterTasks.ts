import { StatusFilter, Task } from "@/types/task";

export function filterTasks(
  tasks: Task[],
  searchQuery: string,
  statusFilter: StatusFilter,
): Task[] {
  const keyword = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesSearchQuery =
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);

    return matchesStatus && matchesSearchQuery;
  });
}
