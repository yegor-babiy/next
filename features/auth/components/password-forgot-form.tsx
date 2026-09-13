"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { passwordForgot } from "@/features/auth/actions/password-forgot";

export const PasswordForgotForm = () => {
  const [actionState, action] = useActionState(
    passwordForgot,
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input
        placeholder="Email"
        name="email"
        defaultValue={actionState?.payload?.get("email") as string}
      />
      <FieldError name="email" actionState={actionState} />

      <SubmitButton label="Send Email" />
    </Form>
  );
};
