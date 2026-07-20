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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tasks } from "@/data/tasks";
import {
  StatusFilter,
  Task,
  TaskForm,
  TaskSortOrder,
  TaskStatus,
} from "@/types/task";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  id: "",
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
};

const selectStatusFormItems: { value: TaskStatus; label: string }[] =
  selectStatusItems.filter(
    (item): item is { value: TaskStatus; label: string } => item.value !== "all"
  );

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<TaskSortOrder>("asc");
  const [form, setForm] = useState<TaskForm>(INITIAL_FORM);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("TASK_LIST");

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTaskList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TASK_LIST", JSON.stringify(taskList));
  }, [taskList]);

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

  const currentStatusFormLabel = selectStatusFormItems.find(
    (item) => item.value === form.status,
  )?.label;

  const handleOpenChange = (nextOpen: boolean) => {
    setDialogOpen(nextOpen);

    if (!nextOpen) {
      setForm(INITIAL_FORM);
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!form.description.trim()) {
      toast.error("설명을 입력해주세요.");
      return;
    }
    if (form.dueDate === "") {
      toast.error("D-day를 입력해주세요.");
      return;
    }
    if (Number(form.dueDate) < 1) {
      toast.error("D-day는 1 이상의 값을 입력해주세요.");
      return;
    }
    if (Number(form.dueDate) > 3650) {
      toast.error("D-day는 3650 이하의 값을 입력해주세요.");
      return;
    }

    setTaskList((prev) => [
      ...prev,
      {
        ...form,
        id: crypto.randomUUID(),
        dueDate: Number(form.dueDate),
      },
    ]);

    setDialogOpen(false);
    setForm(INITIAL_FORM);

    toast.success("Task가 추가되었습니다.");
  };

  const updateTask = (updatedTask: Task) => {
    setTaskList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (deleteTaskId: string) => {
    setTaskList((prev) => prev.filter((task) => task.id !== deleteTaskId));
  };

  return (
    <div className="min-w-96 flex size-full flex-col p-8 gap-6">
      <h2 className="text-3xl font-bold">My Tasks</h2>
      <div className="text-lg text-muted-foreground text-nowrap">
        <span>{taskList.length} tasks</span> |{" "}
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

        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger
            type="button"
            className="flex items-center gap-2 border p-1.5 rounded-lg h-8 text-base text-center w-full justify-center text-nowrap hover:bg-muted md:w-35"
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
                  <FieldLabel htmlFor="title">Task 제목</FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Task 제목"
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    maxLength={50}
                  />
                  <FieldDescription className="text-right">
                    {form.title.length} / 50
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">설명</FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Task 설명란"
                    value={form.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    maxLength={300}
                  />
                  <FieldDescription className="text-right">
                    {form.description.length} / 300
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="status">현재 상태</FieldLabel>
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
                      <SelectValue>{currentStatusFormLabel}</SelectValue>
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
                  <FieldLabel htmlFor="dueDate">마감 기한(D-day)</FieldLabel>
                  <Input
                    type="number"
                    min={1}
                    max={3650}
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
      </div>
      <TaskList
        tasks={sortedTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
