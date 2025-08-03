'use client';

import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

type TabsVariant = 'default' | 'underline';

const TabsVariantContext = React.createContext<TabsVariant>('default');

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & { variant?: TabsVariant }
>(({ className, variant = 'default', ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.Root ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
  </TabsVariantContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const tabsListRef = useRef<HTMLDivElement | null>(null);
  const variant = React.useContext(TabsVariantContext);

  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;

    const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');
    if (!activeTab) return;

    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();

    requestAnimationFrame(() => {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        top: activeRect.top - tabsRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    });
  }, []);

  useEffect(() => {
    // Initial update
    const timeoutId = setTimeout(updateIndicator, 0);

    // Event listeners
    window.addEventListener('resize', updateIndicator);
    const observer = new MutationObserver(updateIndicator);

    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div className={cn('relative', variant === 'underline' && 'w-full')} ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          variant === 'default'
            ? 'relative inline-flex items-center justify-center border-y border-b-primary text-muted-foreground'
            : 'border-b flex w-full',
          className,
        )}
        {...props}
      />
      {variant === 'default' ? (
        <div
          className="absolute bg-primary text-white shadow-sm transition-all duration-300 ease-in-out"
          style={indicatorStyle}
        />
      ) : (
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      )}
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        // 'relative after:absolute after:right-0 after:h-10 after:w-2 after:bg-accent'
        'font-semibold border-r',
        variant === 'default'
          ? 'inline-flex items-center justify-center whitespace-nowrap px-3 py-2.5 text-sm font-medium ring-offset-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-white z-10'
          : 'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-all text-muted-foreground hover:text-foreground data-[state=active]:text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
export type { TabsVariant };
