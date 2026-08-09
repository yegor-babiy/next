import type { Route } from "next";

export type NavItem = {
  title: string;
  href: Route;
  separator?: boolean;
  icon: React.ReactElement<{ className?: string }>;
  matches: (currentPath: string) => boolean;
};
