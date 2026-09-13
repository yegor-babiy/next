"use server";

import z from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";

const passwordForgotSchema = z.object({
  email: z.email().min(1, "Is required").max(191)
});

export const passwordForgot = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { email } = passwordForgotSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);
    // send email with reset password link
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for reset a reset link");
};
