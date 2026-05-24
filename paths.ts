import { Route } from "next";

export const homePath = (): Route => "/";

export const ticketsPath = (): Route => "/tickets";

export const ticketPath = (ticketId: string): Route =>
  `/tickets/${ticketId}` as Route;

export const ticketEditPath = (ticketId: string): Route =>
  `/tickets/${ticketId}/edit` as Route;

export const signUpPath = (): Route => "/sign-up" as Route;

export const signInPath = (): Route => "/sign-in" as Route;

export const signOutPath = (): Route => "/sign-out" as Route;

export const passwordForgotPath = (): Route => "/password-forgot" as Route;
