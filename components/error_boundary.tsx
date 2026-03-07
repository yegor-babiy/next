"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Placeholder } from "./placeholder";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error }) => (
        <Placeholder
          label={(error as Error).message || "Something went wrong"}
        />
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export { ErrorBoundary };
