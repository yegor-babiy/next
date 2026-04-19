import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { ErrorBoundary } from "@/components/error_boundary";
import { Heading } from "@/components/heading";
import { RedirectToast } from "@/components/redirect-toast";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

// export const dynamic = "force-dynamic";
// ISR time based
// export const revalidate = 30;

const TicketsPage = () => {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading title="Tickets" description="All your tickets at one place" />

        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
          className="w-full max-w-[420px] self-center"
        />

        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <TicketList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <RedirectToast />
    </>
  );
};

export default TicketsPage;
