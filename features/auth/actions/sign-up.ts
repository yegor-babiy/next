"use server";

import { redirect } from "next/navigation";
import z from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState
} from "@/components/form/utils/to-action-state";
import { Prisma } from "@/lib/generated/prisma/client";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { generateRandomSessionToken } from "@/utils/crypto";
import { hashPassword } from "../utils/hash-and-verify";
import { setSessionCookie } from "../utils/session-cookie";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(191)
      .refine(value => !value.includes(" "), "Username cannot contain spaces"),
    email: z.email().min(1, "Is required").max(191),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191)
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"]
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash
      }
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(user.id, sessionToken);
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData
      );
    }
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
