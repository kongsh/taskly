"use client";

import { StatusFilter, Task, TaskForm } from "@/types/task";
import TaskCard from "./TaskCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Trash2Icon } from "lucide-react";

type TaskListProps = {
  tasks: Task[];
  updateTask: (updatedTask: Task) => void;
  deleteTask: (deleteTaskId: string) => void;
};

const selectStatusItems: { value: StatusFilter; label: string }[] = [
  { value: "todo", label: "준비 중" },
  { value: "progress", label: "진행 중" },
  { value: "done", label: "완료" },
];

const INITIAL_FORM: TaskForm = {
  id: "",
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
};

export function TaskList({ tasks, updateTask, deleteTask }: TaskListProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [form, setForm] = useState<TaskForm>(INITIAL_FORM);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<{ id: string; title: string }>({
    id: "",
    title: "",
  });

  const handleUpdateClick = (nextOpen: boolean, task: TaskForm) => {
    setForm({ ...task });
    setUpdateDialogOpen(nextOpen);
  };

  const handleUpdateSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) return;
    if (form.dueDate === "") return;
    if (Number(form.dueDate) < 0) return;

    updateTask({ ...form, dueDate: Number(form.dueDate) });

    setUpdateDialogOpen(false);
  };

  const updateForm = <K extends keyof TaskForm>(key: K, value: TaskForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteClick = (nextOpen: boolean, id: string, title: string) => {
    setDeleteInfo({ id, title });
    setDeleteDialogOpen(nextOpen);
  };

  const handleDelete = () => {
    deleteTask(deleteInfo.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              handleUpdateClick={handleUpdateClick}
              handleDeleteClick={handleDeleteClick}
            />
          </li>
        ))}
      </ul>
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <form onSubmit={handleUpdateSubmit}>
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
              <DialogDescription>Task를 수정하세요.</DialogDescription>
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
                    {selectStatusItems.map((item) => (
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
                Update Task
              </Button>
              <DialogClose className="inline-flex items-center justify-center rounded-md bg-destructive/70 px-4 py-1 text-sm font-medium text-destructive-foreground hover:bg-destructive/80 transition-colors cursor-pointer">
                Cancel
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col">
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteInfo.title}을(를) 정말 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete Task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
