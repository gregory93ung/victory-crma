import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'w-full h-10 flex items-stretch justify-start bg-layer-accent-01 rounded-t-lg overflow-hidden px-0',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // transition-all
      `relative flex items-center justify-center gap-2 whitespace-nowrap px-3 text-sm text-text-secondary font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-layer-01 data-[state=active]:text-text-primary rounded-t-lg data-[state=active]:z-10`,

      `after:content-[''] after:w-[1px] after:h-[15px] after:absolute after:bottom-auto after:top-auto after:right-[-1px] after:bg-layer-accent-hover-01`,

      `data-[state=active]:before:content-[''] data-[state=active]:before:w-[16px] data-[state=active]:before:h-[16px] data-[state=active]:before:absolute data-[state=active]:before:bg-base-transparent data-[state=active]:before:bottom-0
      data-[state=active]:before:right-[100%] data-[state=active]:before:rounded-br-[8px] data-[state=active]:before:shadow-[8px_0px_0px_0px] data-[state=active]:before:text-layer-01 first:data-[state=active]:before:content-none`,

      `data-[state=active]:after:content-[''] data-[state=active]:after:w-[16px] data-[state=active]:after:h-[16px] data-[state=active]:after:absolute data-[state=active]:after:bg-base-transparent data-[state=active]:after:bottom-0
      data-[state=active]:after:left-[100%] data-[state=active]:after:rounded-bl-[8px] data-[state=active]:after:shadow-[-8px_0px_0px_0px] data-[state=active]:after:text-layer-01 last:data-[state=active]:after:content-none`,

      `hover:after:content-[''] hover:after:w-[16px] hover:after:h-[16px] hover:after:absolute hover:after:bg-base-transparent hover:after:bottom-0 hover:after:left-[100%] hover:after:rounded-bl-[8px] hover:after:shadow-[-8px_0px_0px_0px] hover:after:text-layer-accent-hover-01 last:hover:after:content-none`,

      `hover:before:content-[''] hover:before:w-[16px] hover:before:h-[16px] hover:before:absolute hover:before:bg-base-transparent hover:before:bottom-0 hover:before:right-[100%] hover:before:rounded-br-[8px] hover:before:shadow-[8px_0px_0px_0px] hover:before:text-layer-accent-hover-01 first:hover:before:content-none`,

      `hover:bg-layer-accent-hover-01`,

      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('flex-1 bg-layer-01 rounded-b outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
