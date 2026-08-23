"use client";
import { LucidePencil } from "lucide-react";
import { setCookieByKey } from "@/actions/cookies";
import { Button } from "@/components/ui/button";

type CommentEditButtonProps = {
  id: string;
};

export const CommentEditButton = ({ id }: CommentEditButtonProps) => {
  const handleEditClick = async (id: string) => {
    await setCookieByKey("editingComment", id);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleEditClick.bind(null, id)}
    >
      <LucidePencil className="w-4 h-4" />
    </Button>
  );
};
