"use client";

import { TaskList } from "@/components/task/TaskList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tasks } from "@/data/tasks";
import { StatusFilter, Task, TaskForm, TaskSortOrder } from "@/types/task";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

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
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<TaskSortOrder>("asc");
  const [form, setForm] = useState<TaskForm>(INITIAL_FORM);
  const [dialogOpen, setDialogOpen] = useState(false);

  const keyword = searchQuery.toLowerCase();

  const currentStatusLabel =
    selectStatusItems.find((item) => item.value === statusFilter)?.label ??
    "전체";

  const filteredTasks = taskList.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesSearchQuery =
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);

    return matchesStatus && matchesSearchQuery;
  });

  const currentSortLabel = selectSortItems.find(
    (item) => item.value === sortOrder,
  )?.label;

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === "asc" ? a.dueDate - b.dueDate : b.dueDate - a.dueDate;
  });

  const stats = taskList.reduce(
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

    if (!form.title.trim()) return;
    if (form.dueDate === "") return;
    if (Number(form.dueDate) < 0) return;

    setTaskList((prev) => [
      ...prev,
      { ...form, dueDate: Number(form.dueDate) },
    ]);

    setDialogOpen(false);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="flex h-full flex-col p-8 gap-6">
      <h2 className="text-3xl font-bold">My Tasks</h2>
      <div className="text-lg text-muted-foreground">
        <span>{taskList.length} tasks</span> |{" "}
        <span>{stats.inProgress} In progress</span> |{" "}
        <span>{stats.completed} Completed</span>
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Input
            className="max-w-64"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger
            type="button"
            className="flex items-center gap-2 border p-1.5 rounded-lg h-8 text-base hover:bg-muted"
          >
            <CirclePlus className="size-4" />
            New Task
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>새 Task를 작성해보세요.</DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="title">Task 제목</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Task 제목"
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                  />
                </Field>
                <Field>
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Task 설명란"
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                  />
                </Field>
                <Field>
                  <Label htmlFor="status">현재 상태</Label>
                  <Select
                    id="status"
                    name="status"
                    value={form.status}
                    onValueChange={(value) => {
                      if (value) {
                        updateForm("status", value);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="준비 중" />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {selectStatusItems
                        .filter((item) => item.value !== "all")
                        .map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <Label htmlFor="dueDate">마감 기한(D-day)</Label>
                  <Input
                    type="number"
                    min={0}
                    id="dueDate"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={(e) => updateForm("dueDate", e.target.value)}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Button type="submit" variant="outline">
                  Add Task
                </Button>
                <DialogClose className="inline-flex items-center justify-center rounded-md bg-destructive/70 px-4 py-1 text-sm font-medium text-destructive-foreground hover:bg-destructive/80 transition-colors cursor-pointer">
                  Cancel
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
      <TaskList tasks={sortedTasks} />
    </div>
  );
}
