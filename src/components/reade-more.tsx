import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ReadeMoreProps {
  text: string;
}

export function ReadeMore({ text }: ReadeMoreProps) {
  const [isOpen, setIsOpent] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);

  const toggleReviewTextVisibility = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsOpent(!isOpen);
  };

  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight,
      );
    }
  }, []);

  return (
    <div className='flex flex-col items-start gap-1 break-words'>
      <p
        className={cn(
          'font-normal text-text-primary text-left',
          !isOpen && 'line-clamp-[1]',
        )}
        ref={ref}
      >
        {text}
      </p>
      {showReadMoreButton && (
        <span
          className='font-light text-text-secondary cursor-pointer hover:text-text-primary hover:underline'
          onClick={toggleReviewTextVisibility}
        >
          {isOpen ? 'Скрыть' : 'Показать'}
        </span>
      )}
    </div>
  );
}
