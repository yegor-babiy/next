"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CardCompact } from "@/components/card-compact";
import { PaginagedData } from "@/components/pagination/types";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentEditButton } from "./comment-edit-button";
import { CommentItem } from "./comment-item";
import { CommentUpsertForm } from "./comment-upsert-form";

type CommentsProps = {
  ticketId: string;
  editingCommentId?: string | null;
  paginatedComments?: PaginagedData<CommentWithMetadata>;
};

type CommentsCursor = NonNullable<
  PaginagedData<CommentWithMetadata>["metadata"]["cursor"]
>;

export const Comments = ({
  ticketId,
  paginatedComments = {
    list: [],
    metadata: { count: 0, hasNextPage: false }
  },
  editingCommentId
}: CommentsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["comments", ticketId],
      queryFn: async ({ pageParam }) => {
        const comments = await getComments(ticketId, pageParam);
        return comments;
      },
      initialPageParam: undefined as CommentsCursor | undefined,
      getNextPageParam: lastPage =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata
          }
        ],
        pageParams: [undefined]
      }
    });

  const comments = data.pages.flatMap(page => page.list);

  const handleDeleteComment = () => refetch();

  const handleUpsertComment = () => refetch();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentUpsertForm
            ticketId={ticketId}
            onUpsertComment={handleUpsertComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            editingCommentId={editingCommentId}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                    <CommentEditButton key="1" id={comment.id} />
                  ]
                : [])
            ]}
          />
        ))}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">No more comments</p>
        )}
      </div>
    </>
  );
};
