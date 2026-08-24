import React from "react";
import { getCookieByKey } from "@/actions/cookies";
import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";
import { CommentUpsertForm } from "./comment-upsert-form";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};

export const CommentItem = async ({ comment, buttons }: CommentItemProps) => {
  const editingCommentId = await getCookieByKey("editingComment");

  return (
    <div className="flex gap-x-2">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        {comment.id === editingCommentId ? (
          <CommentUpsertForm comment={comment} ticketId={comment.ticketId} />
        ) : (
          <p className="whitespace-pre-line">{comment.content}</p>
        )}
      </Card>

      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
};
