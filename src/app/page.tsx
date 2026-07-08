import { TaskList } from "@/components/task/TaskList";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-between p-24">
      <p className="text-3xl font-bold">DashBoard</p>
      <TaskList />
    </div>
  );
}
