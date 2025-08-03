import DashboardHeader from '@/components/shared/dashboard-header';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <Suspense fallback={<Skeleton className="h-full w-full bg-muted/50" />}>
          <div className="flex bg-surface flex-col min-h-[calc(100vh-4rem)] w-full md:p-6 p-2">
            <Outlet />
          </div>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
