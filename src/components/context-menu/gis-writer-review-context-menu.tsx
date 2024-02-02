import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ReactNode, useState } from 'react';
import { DelGisWriterReviewModal } from '../modals/del-gis-writer-review-modal';
import { Clients } from '@/types';
import { EditGisWriterReviewModal } from '../modals/edit-gis-writer-review-modal';

interface GisWriterReviewContextMenuProps {
  children: ReactNode;
  currentReview: {
    id: number;
    review_text: string;
    date: string;
    sex: Clients.sex;
  };
  handleDelReview: () => void;
}

export function GisWriterReviewContextMenu({
  children,
  currentReview,
  handleDelReview,
}: GisWriterReviewContextMenuProps) {
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
        <EditGisWriterReviewModal
          currentReview={currentReview}
          setOpen={setOpen}
        />
        <DelGisWriterReviewModal handleDelReview={handleDelReview} />
      </AlertDialog>
    </Dialog>
  );
}
