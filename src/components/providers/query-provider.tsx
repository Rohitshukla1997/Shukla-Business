"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24, // 24 hours (data remains fresh indefinitely)
            gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days cache persistence in memory
            refetchOnWindowFocus: false, // No refetch when tab is refocused
            refetchOnMount: false, // No refetch when component remounts
            refetchOnReconnect: false, // No refetch on network reconnect
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
