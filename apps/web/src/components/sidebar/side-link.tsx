import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import type { RouteGroup, Route as IRoute } from './nav-routes';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Link, useLocation } from '@tanstack/react-router';

const SideLink = (link: RouteGroup) => {
  const { pathname } = useLocation();
  const { open, setOpen } = useSidebar();
  const isCollapsed = !open;

  const isGroupActive =
    link.routes?.some((item) => item.url === pathname) ||
    link.route?.url === pathname ||
    (link.route?.url ? pathname.endsWith(link.route?.url) && !link.route?.url.endsWith('/') : false);
  console.log('isGroupActive', isGroupActive);

  useEffect(() => {
    // setOpen(false);
  }, [pathname]);

  const Route = ({ item }: { item: IRoute }) => {
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          className={cn(
            'h-auto duration-300 transition-all hover:text-primary hover:bg-primary/10',
            item.isActive && 'font-semibold bg-primary/10 text-primary',
          )}
          tooltip={item.title}
          asChild
        >
          <Link to={item.url} className="flex items-center w-full">
            {item.icon && <item.icon className="!size-5" />}
            <span className="truncate">{item.title}</span>
            {item.badge && <span className="ml-auto">{item.badge}</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  if (link.routes) {
    if (isCollapsed) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenu>
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton
                  className={cn(
                    'h-auto duration-300 transition-all hover:text-primary hover:bg-primary/10',
                    link.isActive && 'font-semibold bg-primary/10 text-primary',
                  )}
                  tooltip={link.title}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  <span className="sr-only">{link.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <SidebarMenu>
              {link.routes.map((subLink, index) => {
                const isActive = subLink.url === pathname || (pathname.endsWith(subLink.url) && !subLink.url.endsWith('/'));
                // console.log('pathname', pathname, subLink.url);

                return (
                  <DropdownMenuItem key={index} asChild>
                    <Route item={{ ...subLink, isActive }} />
                  </DropdownMenuItem>
                );
              })}
            </SidebarMenu>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Accordion type="single" collapsible className="w-full" defaultValue={isGroupActive ? link.title : ''}>
        <AccordionItem value={link.title} className="border-b-0">
          <AccordionTrigger className="hover:bg-primary/5 rounded-md hover:text-primary py-2.5 px-2">
            <div className="flex items-center text-sm">
              {link.icon && <link.icon className="mr-2 h-5 w-5" />}
              {link.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-4">
            <SidebarMenu>
              {link.routes.map((subLink, index) => {
                const isActive = subLink.url === pathname || (pathname.endsWith(subLink.url) && !subLink.url.endsWith('/'));
                return <Route key={index} item={{ ...subLink, isActive }} />;
              })}
            </SidebarMenu>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Route item={link.route} />
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {link.title}
          {link.route.badge && <span className="">{link.route.badge}</span>}
        </TooltipContent>
      </Tooltip>
    );
  }
  return <Route item={{ ...link.route, isActive: !!isGroupActive }} />;
};

export default SideLink;
