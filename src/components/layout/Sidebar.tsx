import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r py-4 px-4 hidden md:block">
      <nav className="flex flex-col justify-between h-full">
        <div>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 hover:bg-muted"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 hover:bg-muted"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 hover:bg-muted"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Separator className="my-4" />

          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 hover:bg-muted"
              >
                Dark Mode
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 hover:bg-muted"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 hover:bg-muted"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
