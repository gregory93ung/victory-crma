import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface InfoItemProps {
  value: string | null;
  isLoading: boolean;
}

export const InfoComment = ({ value, isLoading }: InfoItemProps) => {
  if (isLoading) {
    return (
      <div className='flex flex-col items-start gap-2'>
        <Skeleton className='h-4 w-[45%] bg-miscellaneous-skeleton-background' />
        <Skeleton className='h-4 w-full bg-miscellaneous-skeleton-background' />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-start gap-2'>
      <h4 className='text-xl font-semibold tracking-tight'>Комментарий</h4>
      <div className='w-full bg-layer-02 rounded p-2'>
        <p className={cn(!value && 'text-muted-foreground')}>
          {value ? value : 'Не указан'}
        </p>
      </div>
    </div>
  );
};
