import React from 'react';
import { QueryProvider } from './QueryProvider';
import { Provider as JotaiProvider } from 'jotai';
import { Toaster } from '@/components/ui/sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <JotaiProvider>
      <QueryProvider>{children}</QueryProvider>
      <Toaster richColors position="top-right" />
    </JotaiProvider>
  );
};

export default Providers;
