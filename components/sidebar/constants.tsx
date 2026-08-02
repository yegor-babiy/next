import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import { accountProfilePath, homePath, ticketsPath } from "@/paths";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <LucideLibrary />,
    href: homePath(),
    matches: (currentPath: string) => homePath() === currentPath
  },
  {
    title: "My Tickets",
    icon: <LucideBook />,
    href: ticketsPath(),
    matches: (currentPath: string) => ticketsPath() === currentPath
  },
  {
    separator: true,
    title: "Account",
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
    matches: (currentPath: string) => /account\/.*/.test(currentPath)
  }
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
