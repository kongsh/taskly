import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Circle, EllipsisVertical } from "lucide-react";
import { Task, TaskForm } from "@/types/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  task: Task;
  handleUpdateClick: (nextOpen: boolean, task: TaskForm) => void;
  handleDeleteClick: (nextOpen: boolean, id: string, title: string) => void;
  handleStatusClick: (updatedTask: Task) => void;
};

const STATUS = {
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

  const statusInfo = STATUS[status];

  return (
    <Card
      className={cn(
        "w-full p-4 text-black h-auto",
        status === "done" && "bg-muted text-gray-500",
      )}
    >
      <CardContent className="text-sm gap-4 flex justify-between md:items-center md:justify-between">
        <div className="flex flex-col gap-2 flex-1 md:flex-row md:items-center">
          <Button
            variant="secondary"
            className="justify-between cursor-pointer w-20 gap-2"
            onClick={() => handleStatusClick(task)}
          >
            {
              <>
                <Circle className={`h-3 w-3 ${statusInfo.color}`} />
                <span className="flex-1 text-center text-xs text-black">
                  {statusInfo.label}
                </span>
              </>
            }
          </Button>
          <div className="text-wrap">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground ">
              {description}
            </CardDescription>
          </div>
          <p className="text-sm text-muted-foreground md:flex-1 md:text-right">
            D-{dueDate}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-md p-1 hover:bg-muted">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                handleUpdateClick(true, {
                  ...task,
                  dueDate: String(dueDate),
                })
              }
            >
              수정
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteClick(true, id, title)}
            >
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
