"use server";

import z from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { generatePasswordResetLink } from "../utils/generate-password-reset-link";
import { verifyPasswordHash } from "../utils/hash-and-verify";

const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191)
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const auth = await getAuthOrRedirect();

  try {
    const { password } = passwordChangeSchema.parse(
      Object.fromEntries(formData)
    );

    const validPassword = await verifyPasswordHash(
      auth.user.passwordHash,
      password
    );

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect password", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(auth.user.id);
    // send email with reset password link
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Check your email for reset a reset link");
};
