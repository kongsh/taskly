import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebar } from "./Sidebar";

export default function Header() {
  return (
    <header className="h-16 border-b flex items-center">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <Sheet>
          <SheetTrigger className="block md:hidden">
            <Menu className="h-6 w-6 hover:bg-muted rounded-sm" />
          </SheetTrigger>
          <SheetContent side="left" showCloseButton={false}>
            <MobileSidebar />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-bold">Taskly</h1>
        <Button>Profile</Button>
      </div>
    </header>
  );
}
