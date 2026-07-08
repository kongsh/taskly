import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const mainMenus = [
  { label: "Dashboard", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Settings", href: "#" },
];

const secondaryMenus = [
  { label: "Dark Mode", href: "#" },
  { label: "Profile", href: "#" },
  { label: "Logout", href: "#" },
];

function MenuList({ menus }: { menus: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2">
      {menus.map((menu) => (
        <li key={menu.label}>
          <Link
            href={menu.href}
            className="block rounded-md px-3 py-2 hover:bg-muted"
          >
            {menu.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 border-r py-4 px-4 hidden md:flex">
      <nav className="flex flex-col justify-between h-full w-full">
        <MenuList menus={mainMenus} />
        <div>
          <Separator className="my-4 " />

          <MenuList menus={secondaryMenus} />
        </div>
      </nav>
    </aside>
  );
}

function MobileSidebar() {
  return (
    <aside className="w-full h-full py-4 px-4">
      <nav className="flex flex-col justify-between h-full">
        <MenuList menus={mainMenus} />
        <div>
          <Separator className="my-4" />

          <MenuList menus={secondaryMenus} />
        </div>
      </nav>
    </aside>
  );
}

export { Sidebar, MobileSidebar };
