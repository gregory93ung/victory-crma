import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  title: string;
  icon: LucideIcon;
  value: string | number | null | undefined;
  isLoading: boolean;
}

const InfoItem = ({ title, icon: Icon, value, isLoading }: InfoItemProps) => {
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
      <h4 className='text-lg font-semibold tracking-tight'>{title}</h4>
      <div className='flex flex-row items-center gap-2'>
        <Icon className='h-4 w-4 stroke-muted-foreground' />
        <p
          className={cn(
            'font-normal text-text-primary',
            !value && 'text-muted-foreground',
          )}
        >
          {value ? value : '-'}
        </p>
      </div>
    </div>
  );
};

export default InfoItem;
