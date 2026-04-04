import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error_boundary";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";
import { TicketList } from "@/features/ticket/components/ticket-list";

// export const dynamic = "force-dynamic";
// ISR time based
// export const revalidate = 30;

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Card className="w-full max-w-[420px] self-center">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>

      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
