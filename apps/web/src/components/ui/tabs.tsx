import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import {
  Tabs as TabsAnimated,
  TabsContent as TabsContentAnimated,
  TabsList as TabsListAnimated,
  TabsTrigger as TabsTriggerAnimated,
} from './tabs.animated';

import { cn } from '@/lib/utils';

type TabsVariant = 'default' | 'underline';

const TabsVariantContext = React.createContext<{ variant: TabsVariant; animated: boolean }>({
  variant: 'default',
  animated: true,
});

function Tabs({
  className,
  variant = 'default',
  animated = true,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant; animated?: boolean }) {
  if (animated) return <TabsAnimated variant={variant} {...props} />;
  return (
    <TabsVariantContext.Provider value={{ variant, animated }}>
      <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />
    </TabsVariantContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant, animated } = React.useContext(TabsVariantContext);
  if (animated) return <TabsListAnimated {...props} />;

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        variant === 'default'
          ? 'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg'
          : 'border-b flex w-full',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, animated } = React.useContext(TabsVariantContext);
  if (animated) return <TabsTriggerAnimated {...props} />;

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        variant === 'default'
          ? "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          : 'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-all text-muted-foreground hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const { animated } = React.useContext(TabsVariantContext);
  if (animated) return <TabsContentAnimated {...props} />;
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
export type { TabsVariant };
