import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { ErrorBoundary } from "@/components/error_boundary";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { SearchParams } from "@/features/ticket/search-params";

// export const dynamic = "force-dynamic";
// ISR time based
// export const revalidate = 30;

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();
  return (
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
          <TicketList userId={user?.id} searchParams={await searchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
