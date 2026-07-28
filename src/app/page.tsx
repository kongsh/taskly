"use client";

import { TaskList } from "@/features/task/components/TaskList";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusFilter, TaskForm, TaskSortOrder } from "@/types/task";
import { useState } from "react";
import { toast } from "sonner";
import { validateTaskForm } from "@/features/task/utils/validateTaskForm";
import { TaskFormDialog } from "@/features/task/components/TaskFormDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useTasks } from "@/features/task/hooks/useTasks";
import { useCreateTask } from "@/features/task/hooks/useCreateTask";

const selectStatusItems: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "todo", label: "준비 중" },
  { value: "progress", label: "진행 중" },
  { value: "done", label: "완료" },
];

const selectSortItems: { value: TaskSortOrder; label: string }[] = [
  { value: "desc", label: "최신 순" },
  { value: "asc", label: "오래된 순" },
];

const INITIAL_FORM: TaskForm = {
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<TaskSortOrder>("asc");
  const [form, setForm] = useState<TaskForm>(INITIAL_FORM);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { data: tasks = [] } = useTasks();
  const createTaskMutation = useCreateTask();

  const keyword = searchQuery.trim().toLowerCase();

  const currentStatusLabel =
    selectStatusItems.find((item) => item.value === statusFilter)?.label ??
    "전체";

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesSearchQuery =
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);

    return matchesStatus && matchesSearchQuery;
  });

  const currentSortLabel =
    selectSortItems.find((item) => item.value === sortOrder)?.label ??
    "오래된 순";

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === "asc" ? a.dueDate - b.dueDate : b.dueDate - a.dueDate;
  });

  const stats = tasks.reduce(
    (acc, task) => {
      if (task.status === "progress") acc.inProgress++;
      if (task.status === "done") acc.completed++;
      return acc;
    },
    { inProgress: 0, completed: 0 },
  );

  const updateForm = <K extends keyof TaskForm>(key: K, value: TaskForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setDialogOpen(nextOpen);

    if (!nextOpen) {
      setForm(INITIAL_FORM);
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validateTaskForm(form);

    if (!result.valid) {
      toast.error(result.message);
      return;
    }
    createTaskMutation.mutate(form, {
      onSuccess: () => {
        setDialogOpen(false);
        setForm(INITIAL_FORM);

        toast.success("Task가 추가되었습니다.");
      },
      onError: () => {
        toast.error("Task 생성에 실패하였습니다.");
      },
    });
  };

  return (
    <div className="min-w-96 flex size-full flex-col p-8 gap-6">
      <h2 className="text-3xl font-bold">My Tasks</h2>
      <div className="text-lg text-muted-foreground text-nowrap">
        <span>{tasks.length} tasks</span> |{" "}
        <span>{stats.inProgress} In progress</span> |{" "}
        <span>{stats.completed} Completed</span>
      </div>
      <div className="flex w-full items-center justify-between gap-4 flex-col-reverse md:flex-row">
        <div className="flex items-center gap-4 w-full flex-col md:flex-row">
          <Input
            className="w-full md:max-w-64"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-4 w-full md:w-auto">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                if (value) {
                  setStatusFilter(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue className="w-16" placeholder="전체">
                  {currentStatusLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {selectStatusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value) => {
                if (value) {
                  setSortOrder(value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue className="w-16" placeholder="정렬">
                  {currentSortLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {selectSortItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TaskFormDialog
          open={dialogOpen}
          onOpenChange={handleOpenChange}
          form={form}
          onSubmit={handleSubmit}
          updateForm={updateForm}
          title="Task 생성"
          description="새 Task를 작성해보세요."
          submitLabel="Task 생성"
          trigger={
            <DialogTrigger
              type="button"
              className="flex items-center gap-2 border p-1.5 rounded-lg h-8 text-base text-center w-full justify-center text-nowrap hover:bg-muted md:w-35"
            >
              <CirclePlus className="size-4" />
              New Task
            </DialogTrigger>
          }
        />
      </div>
      <TaskList tasks={sortedTasks} />
    </div>
  );
}
