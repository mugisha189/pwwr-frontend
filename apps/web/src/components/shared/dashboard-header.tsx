'use client';

import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { NavUser } from '../sidebar/nav-user';

export default function DashboardHeader() {
  return (
    <header className="flex items-center w-full sticky backdrop-blur-md z-20 top-0 bg-background/70 justify-between h-16 px-6">
      <div className="flex items-center gap-4">
        <h1 className=" font-medium">Dashboard</h1>
      </div>
      {/* <SidebarTrigger className="-ml-1 cursor-pointer">
        <Icons.Sidebar className="h-6 w-6" />
      </SidebarTrigger> */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <NavUser variant="short" />
      </div>
    </header>
  );
}
