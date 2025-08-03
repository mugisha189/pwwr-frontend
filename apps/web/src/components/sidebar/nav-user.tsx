'use client';

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

type Props = {
  variant?: 'default' | 'short';
};

export function NavUser({ variant = 'default' }: Props) {
  const { isMobile } = useSidebar();
  // const { profile: user } = useAuth();
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jNt7s@example.com',
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={variant === 'short' ? 'default' : 'lg'}
              className={cn(
                variant === 'default'
                  ? 'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                  : 'w-fit h-auto rounded-full p-0',
              )}
            >
              <Avatar className={cn('h-8 w-8 rounded-lg', variant === 'short' && 'h-9 w-9')}>
                {/* <AvatarImage src={user.} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">{user?.firstName?.toUpperCase().slice(0, 2)}</AvatarFallback>
              </Avatar>
              {variant === 'default' && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.firstName + ' ' + user?.lastName}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile || variant === 'short' ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">{user?.firstName?.toUpperCase().slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.firstName + ' ' + user?.lastName}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/auth/logout">
                <LogOut />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
