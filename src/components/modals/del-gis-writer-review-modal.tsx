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

interface DelGisWriterReviewModalProps {
  handleDelReview: () => void;
}

export function DelGisWriterReviewModal({
  handleDelReview,
}: DelGisWriterReviewModalProps) {
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
        <AlertDialogTitle>Вы точно хотите удалить отзыв?</AlertDialogTitle>
        <AlertDialogDescription>
          Отзыв будет {isDeleting ? 'оставлен' : 'удален'}
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
          onClick={handleDelReview}
        >
          Удалить
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
