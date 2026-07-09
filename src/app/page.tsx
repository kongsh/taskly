"use client";

import { TaskList } from "@/components/task/TaskList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tasks } from "@/data/tasks";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const items = [
  { value: "전체", label: "전체" },
  { value: "준비 중", label: "준비 중" },
  { value: "진행 중", label: "진행 중" },
  { value: "완료", label: "완료" },
];

export default function Home() {
  const [taskList] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = taskList.filter((task) => {
    const keyword = searchQuery.toLowerCase();

    return (
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex h-full flex-col p-8 gap-6">
      <h2 className="text-3xl font-bold">My Tasks</h2>
      <div className="text-lg text-muted-foreground">
        <span>12 tasks</span> | <span>8 In progress</span> |{" "}
        <span>4 Completed</span>
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Input
            className="max-w-64"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select>
            <SelectTrigger>
              <SelectValue className="w-16" placeholder="전체" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue className="w-16" placeholder="정렬" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectItem value="최신 순">최신 순</SelectItem>
              <SelectItem value="오래된 순">오래된 순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <CirclePlus className="size-4" />
          New Task
        </Button>
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  );
}
