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
} from "../../components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
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
} from "../../components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

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

    updateTask({ ...form, dueDate: Number(form.dueDate) });

    setUpdateDialogOpen(false);

    toast.success("Task가 수정되었습니다.");
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
    toast.success("Task가 삭제되었습니다.");
  };

  const handleStatusClick = (clickedTask: Task) => {
    switch (clickedTask.status) {
      case "todo":
        updateTask({ ...clickedTask, status: "progress" });
        break;
      case "progress":
        updateTask({ ...clickedTask, status: "done" });
        break;
      case "done":
        break;
    }
  };

  const currentStatusLabel = selectStatusItems.find(
    (item) => item.value === form.status,
  )?.label;

  return (
    <>
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              handleUpdateClick={handleUpdateClick}
              handleDeleteClick={handleDeleteClick}
              handleStatusClick={handleStatusClick}
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
                    <SelectValue>{currentStatusLabel}</SelectValue>
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
