import { SideBar } from '@/components/side-bar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  const layout = localStorage.getItem('react-resizable-panels:layout');
  const collapsed = localStorage.getItem('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  const saveLayoutToLocalStorage = (sizes: number[]) => {
    localStorage.setItem(
      'react-resizable-panels:layout',
      JSON.stringify(sizes),
    );
  };

  return (
    <div className='h-screen'>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes) => {
          saveLayoutToLocalStorage(sizes);
        }}
      >
        <SideBar
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
        <ResizableHandle withHandle />
        <ResizablePanel className='h-full'>
          <Outlet />
        </ResizablePanel>
        <Toaster
          position='bottom-left'
          toastOptions={{
            classNames: {
              toast:
                'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto',
            },
          }}
        />
      </ResizablePanelGroup>
    </div>
  );
};
