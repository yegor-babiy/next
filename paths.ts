import { Route } from "next";

export const homePath = (): Route => "/";

export const ticketsPath = (): Route => "/tickets";

export const ticketPath = (ticketId: string): Route =>
  `/tickets/${ticketId}` as Route;

export const ticketEditPath = (ticketId: string): Route =>
  `/tickets/${ticketId}/edit` as Route;
