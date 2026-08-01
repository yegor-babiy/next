import type { Route } from "next";

export type NavItem = {
  title: string;
  href: Route;
  icon: React.ReactElement<{ className?: string }>;
};
