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
import { validateTaskForm } from "@/features/task/utils/validateTaskForm";
import { TaskFormDialog } from "./TaskFormDialog";
import { useUpdateTask } from "@/features/task/hooks/useUpdateTask";
import { useDeleteTask } from "@/features/task/hooks/useDeleteTask";

type TaskListProps = {
  tasks: Task[];
};

const INITIAL_FORM: TaskForm = {
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
};

export function TaskList({ tasks }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [form, setForm] = useState<TaskForm>(INITIAL_FORM);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<{ id: string; title: string }>({
    id: "",
    title: "",
  });

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleUpdateClick = (nextOpen: boolean, task: Task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: String(task.dueDate),
    });

    setUpdateDialogOpen(nextOpen);
  };

  const handleUpdateSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validateTaskForm(form);

    if (!result.valid) {
      toast.error(result.message);
      return;
    }

    if (!editingTask) return;

    updateTaskMutation.mutate(
      { id: editingTask.id, task: form },
      {
        onSuccess: () => {
          setUpdateDialogOpen(false);

          toast.success("Task가 수정되었습니다.");
        },
        onError: () => {
          toast.error("Task 수정에 실패하였습니다.");
        },
      },
    );
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
    deleteTaskMutation.mutate(
      { id: deleteInfo.id },
      {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          toast.success("Task가 삭제되었습니다.");
        },
        onError: () => {
          toast.error("Task 삭제에 실패하였습니다.");
        },
      },
    );
  };

  const handleStatusClick = (clickedTask: Task) => {
    const { id, description, dueDate, status, title } = clickedTask;

    switch (status) {
      case "todo":
        updateTaskMutation.mutate(
          {
            id: id,
            task: {
              title,
              description,
              status: "progress",
              dueDate: String(dueDate),
            },
          },
          {
            onError: () => {
              toast.error("Task 수정에 실패하였습니다.");
            },
          },
        );

        break;
      case "progress":
        updateTaskMutation.mutate(
          {
            id: id,
            task: {
              title,
              description,
              status: "done",
              dueDate: String(dueDate),
            },
          },
          {
            onError: () => {
              toast.error("Task 수정에 실패하였습니다.");
            },
          },
        );
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
              isStatusPending={
                updateTaskMutation.isPending &&
                updateTaskMutation.variables?.id === task.id
              }
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
        isPending={updateTaskMutation.isPending}
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
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteTaskMutation.isPending}
            >
              {deleteTaskMutation.isPending ? "처리 중..." : "Delete Task"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
