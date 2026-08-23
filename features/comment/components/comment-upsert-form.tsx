"use client";

import { useActionState } from "react";
import { consumeCookieByKey } from "@/actions/cookies";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/generated/prisma/client";
import { upsertComment } from "../actions/upsert-comment";

type CommentUpsertFormProps = {
  ticketId: string;
  comment?: Comment;
};

export const CommentUpsertForm = ({
  ticketId,
  comment
}: CommentUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertComment.bind(null, comment?.id, ticketId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = async () => {
    await consumeCookieByKey("editingComment");
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea
        name="content"
        defaultValue={
          (actionState?.payload?.get("content") as string) ?? comment?.content
        }
        placeholder="What's on your mind..."
      />
      <FieldError name="content" actionState={actionState} />
      <SubmitButton label={comment ? "Save Comment" : "Create Comment"} />
    </Form>
  );
};
