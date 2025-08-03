'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarRail
} from '@/components/ui/sidebar';
import { useAuth } from '@/providers/AuthProvider';
import * as React from 'react';
import { useMemo } from 'react';
import { Icons } from '../icons';
import routes from './nav-routes';
import SideLink from './side-link';
import { NavUser } from './nav-user';

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const userRoutes = useMemo(() => routes, []);

  return (
    <Sidebar variant="sidebar" className="border-none bg-white" {...props}>
      <SidebarContent className="flex flex-col justify-between h-full py-6 px-2">
        <div className="space-y-1">
          {userRoutes?.map((grp) => (
            <SidebarGroup key={grp.title} className="px-2">
              {grp.routes ? (
                <SideLink {...grp} />
              ) : (
                <SidebarMenu>
                  <SideLink {...grp} />
                </SidebarMenu>
              )}
            </SidebarGroup>
          ))}
        </div>

        {/* Footer */}
        <SidebarFooter className="px-2 pt-6">
          <NavUser variant="default" />
        </SidebarFooter>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
