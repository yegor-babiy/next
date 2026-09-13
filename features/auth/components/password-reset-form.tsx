"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { passwordReset } from "@/features/auth/actions/password-reset";

type PasswordResetFormProps = {
  tokenId: string;
};

export const PasswordResetForm = ({ tokenId }: PasswordResetFormProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="New Password"
        name="password"
        type="password"
        defaultValue={actionState?.payload?.get("password") as string}
      />
      <FieldError name="password" actionState={actionState} />

      <Input
        placeholder="Confirm New Password"
        name="confirmPassword"
        type="password"
        defaultValue={actionState?.payload?.get("confirmPassword") as string}
      />
      <FieldError name="confirmPassword" actionState={actionState} />

      <SubmitButton label="Reset Password" />
    </Form>
  );
};
