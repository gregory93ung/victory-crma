import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/config/client';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
