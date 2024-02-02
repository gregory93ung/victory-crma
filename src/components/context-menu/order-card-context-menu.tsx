import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { ReactNode, useState } from 'react';
import { EditClientOrderModal } from '../modals/edit-client-order-modal';
import { OrderItemProps } from '@/app/private/ClientPage/InfoBlock/InfoTabs/OrdersTabPanel/OrderItem';
import { Clients } from '@/types';

interface OrderCardContextMenuProps {
  children: ReactNode;
  currentOrder: Clients.IClientOrder;
}

export function OrderCardContextMenu({
  children,
  currentOrder,
}: OrderCardContextMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger className='w-full'>{children}</ContextMenuTrigger>
        <ContextMenuContent className='bg-layer-accent-02 text-text-secondary border border-border-subtitle-03 hover:text-text-primary'>
          <DialogTrigger
            asChild
            className='w-full hover:bg-layer-accent-hover-02'
          >
            <ContextMenuItem className='cursor-pointer'>
              Редактировать
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <EditClientOrderModal currentOrder={currentOrder} setOpen={setOpen} />
    </Dialog>
  );
}
