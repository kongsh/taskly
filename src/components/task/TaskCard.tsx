import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Circle, EllipsisVertical } from "lucide-react";
import { Task, TaskForm } from "@/types/task";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type TaskCardProps = {
  task: Task;
  handleUpdateClick: (nextOpen: boolean, task: TaskForm) => void;
  handleDeleteClick: (nextOpen: boolean, id: string, title: string) => void;
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
}: TaskCardProps) {
  const { id, title, description, status, dueDate } = task;

  const statusInfo = STATUS[status];

  return (
    <Card className="min-w-72 w-full p-4">
      <CardContent className="text-sm text-black flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Checkbox className="cursor-pointer size-4" />
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold ">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="justify-between cursor-pointer w-20 gap-2"
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
          <p className="text-sm text-muted-foreground text-center w-10">
            D-{dueDate}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="cursor-pointer" />
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
        </div>
      </CardContent>
    </Card>
  );
}
