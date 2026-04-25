"use client";
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function TanstackQueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );
}

export default TanstackQueryProvider;
