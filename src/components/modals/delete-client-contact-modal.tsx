import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useState } from 'react';

interface DeleteClientContactModalProps {
  title: string;
  handleDelContact: () => void;
}

export function DeleteClientContactModal({
  title,
  handleDelContact,
}: DeleteClientContactModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMouseEnter = () => {
    setIsDeleting(true);
  };

  const handleMouseLeave = () => {
    setIsDeleting(false);
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Вы точно хотите удалить контакт?</AlertDialogTitle>
        <AlertDialogDescription>
          Контакт {title} будет {isDeleting ? 'оставлен' : 'удален'}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Отмена
        </AlertDialogCancel>
        <AlertDialogAction
          className='hover:bg-button-danger-hover'
          onClick={handleDelContact}
        >
          Удалить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
