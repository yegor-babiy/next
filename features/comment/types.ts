import { Prisma } from "@/lib/generated/prisma/client";

export type CommentWithMetadata = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}> & { isOwner: boolean };
