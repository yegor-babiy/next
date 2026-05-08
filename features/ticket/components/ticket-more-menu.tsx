"use client";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/lib/generated/prisma/client";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
};

export const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  // const deleteButton = (
  //   <DropdownMenuItem>
  //     <LucideTrash className="w-4 h-4 mr-2" />
  //     <span>Delete</span>
  //   </DropdownMenuItem>
  // );

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="w-4 h-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    )
  });

  // const deleteButton = (
  //   <ConfirmDialog
  //     action={deleteTicket.bind(null, ticket.id)}
  //     trigger={
  //       <DropdownMenuItem>
  //         <LucideTrash className="w-4 h-4 mr-2" />
  //         <span>Delete</span>
  //       </DropdownMenuItem>
  //     }
  //   />
  // );

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: "Updating status..."
    });

    const result = await promise;

    if (result?.status === "SUCCESS") {
      toast.success(result.message);
    } else if (result?.status === "ERROR") {
      toast.error(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_STATUS_LABELS).map(([key, label]) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
