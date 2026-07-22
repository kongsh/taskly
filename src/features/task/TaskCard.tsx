import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Circle, EllipsisVertical } from "lucide-react";
import { Task, TaskForm } from "@/types/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
  handleUpdateClick: (nextOpen: boolean, task: TaskForm) => void;
  handleDeleteClick: (nextOpen: boolean, id: string, title: string) => void;
  handleStatusClick: (updatedTask: Task) => void;
};

const STATUS: Record<Task["status"], { label: string; color: string }> = {
  todo: { label: "준비 중", color: "fill-red-400" },
  progress: { label: "진행 중", color: "fill-yellow-300" },
  done: { label: "완료", color: "fill-green-300" },
};

export default function TaskCard({
  task,
  handleUpdateClick,
  handleDeleteClick,
  handleStatusClick,
}: TaskCardProps) {
  const { id, title, description, status, dueDate } = task;

  const { label, color } = STATUS[status];

  const handleUpdate = () => {
    handleUpdateClick(true, {
      ...task,
      dueDate: String(dueDate),
    });
  };

  const handleDelete = () => {
    handleDeleteClick(true, id, title);
  };

  return (
    <Card
      className={cn(
        "w-full p-4 h-auto transition-colors",
        status === "done" ? "bg-muted/70 border-muted" : "bg-background",
      )}
    >
      <CardContent className="flex justify-between gap-6 p-0">
        <div className="flex flex-col gap-3 flex-1 md:flex-row md:items-center">
          <Button
            variant={status === "done" ? "outline" : "secondary"}
            className="justify-between cursor-pointer w-20 gap-2"
            onClick={() => handleStatusClick(task)}
          >
            {
              <>
                <Circle className={cn("h-3 w-3", color)} />
                <span className="flex-1 text-center text-xs text-black">
                  {label}
                </span>
              </>
            }
          </Button>
          <div className="flex flex-col gap-1 flex-1">
            <CardTitle
              className={cn(
                "text-lg font-semibold",
                status === "done" && "text-muted-foreground",
              )}
            >
              {title}
            </CardTitle>
            <CardDescription
              className={cn(
                "text-sm",
                status === "done"
                  ? "text-muted-foreground/80"
                  : "text-muted-foreground",
              )}
            >
              {description}
            </CardDescription>
          </div>
          <p
            className={cn(
              "text-sm text-muted-foreground text-nowrap md:min-w-20 md:text-right",
              status === "done"
                ? "text-muted-foreground/80"
                : "text-muted-foreground",
            )}
          >
            D-{dueDate}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-md p-1 hover:bg-muted">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleUpdate}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
