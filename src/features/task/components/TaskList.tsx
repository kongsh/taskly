import { Task, TaskForm } from "@/types/task";
import TaskCard from "./TaskCard";
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
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { validateTaskForm } from "../utils/validateTaskForm";
import { TaskFormDialog } from "./TaskFormDialog";

type TaskListProps = {
  tasks: Task[];
  updateTask: (updatedTask: Task) => void;
  deleteTask: (deleteTaskId: string) => void;
};

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

    const result = validateTaskForm(form);

    if (!result.valid) {
      toast.error(result.message);
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
      <TaskFormDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        form={form}
        onSubmit={handleUpdateSubmit}
        updateForm={updateForm}
        title="Task 수정"
        description="Task를 수정해보세요."
        submitLabel="Task 수정"
      />
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
