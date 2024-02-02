import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ReactNode, useState } from 'react';
import { EditClientContactModal } from '../modals/edit-client-contact-modal';
import { DeleteClientContactModal } from '../modals/delete-client-contact-modal';
import { ContactItemProps } from '@/app/private/ClientPage/InfoBlock/InfoTabs/ContactsTabPanel/ContactItem';

interface ContactCardContextMenuProps {
  children: ReactNode;
  title: string;
  currentContact: ContactItemProps;
  handleDelContact: () => void;
}

export function ContactCardContextMenu({
  children,
  title,
  currentContact,
  handleDelContact,
}: ContactCardContextMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertDialog>
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
            <AlertDialogTrigger className='w-full hover:bg-layer-accent-hover-02 hover:text-text-primary'>
              <ContextMenuItem className='cursor-pointer'>
                Удалить
              </ContextMenuItem>
            </AlertDialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        <EditClientContactModal
          currentContact={currentContact}
          setOpen={setOpen}
        />
        <DeleteClientContactModal
          title={title}
          handleDelContact={handleDelContact}
        />
      </AlertDialog>
    </Dialog>
  );
}
