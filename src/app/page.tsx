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
import { StatusFilter, TaskSortOrder } from "@/types/task";
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

export default function Home() {
  const [taskList] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<TaskSortOrder>("asc");
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

        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <CirclePlus className="size-4" />
          New Task
        </Button>
      </div>
      <TaskList tasks={sortedTasks} />
    </div>
  );
}
