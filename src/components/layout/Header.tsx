import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="h-16 border-b flex items-center">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <h1 className="text-lg font-bold">Taskly</h1>
        <Button>Profile</Button>
      </div>
    </header>
  );
}
