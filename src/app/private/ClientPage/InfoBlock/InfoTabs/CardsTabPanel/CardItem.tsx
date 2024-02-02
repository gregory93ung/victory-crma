// import { Badge, Box, Card, CardBody, CardFooter, CardHeader, HStack, Text, VStack } from '@chakra-ui/react'
import { Clients } from '@/types';
// import { PLATFORM, PLATFORM_COLORS } from '@/constants'
import { useTabs } from '@/hooks/useTabs';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type CardItemProps = {
  card: Clients.ICard;
};

export const CardItem = ({
  card: { platform, firm_name, firm_address, card_url, rating, comment, id },
}: CardItemProps) => {
  // const platformColor = PLATFORM_COLORS[platform as PLATFORM]
  const { addTab } = useTabs();

  return (
    <Card
      className='w-full bg-layer-02 border border-border-subtitle-02 rounded cursor-pointer'
      onClick={() => {
        addTab(id, 'card');
      }}
    >
      <CardHeader className='flex flex-col gap-3'>
        <CardTitle className='flex flex-row items-center justify-between'>
          <Badge>{platform}</Badge>
          <p
            className={cn(
              'font-medium text-text-secondary',
              !rating && 'text-text-disabled',
            )}
          >
            {rating ? rating : 'Не указан'}
          </p>
        </CardTitle>
        <Separator className='border-b border-border-subtitle-02' />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p
            className={cn(
              'font-medium text-text-primary leading-5 break-words line-clamp-[1]',
              !firm_name && 'text-text-disabled',
            )}
          >
            {firm_name ? firm_name : 'Название не установлено'}
          </p>

          <p
            className={cn(
              'font-medium text-text-primary leading-5 break-words line-clamp-[1]',
              !firm_address && 'text-text-disabled',
            )}
          >
            {firm_address ? firm_address : 'Адрес не указан'}
          </p>
        </div>
        <div className='bg-layer-03 px-2 py-1 rounded break-words line-clamp-[1]'>
          <p
            className={cn(
              'font-regular text-text-primary',
              !card_url && 'text-text-disabled',
            )}
          >
            {card_url ? card_url : 'Ссылка не установлена'}
          </p>
        </div>
        <div className='bg-layer-03 px-2 py-1 rounded'>
          <p
            className={cn(
              'font-regular text-text-primary',
              !comment && 'text-text-disabled',
            )}
          >
            {comment ? comment : 'Комментарий отсутствует'}
          </p>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-3'>
        <Separator className='border-b border-border-subtitle-02' />
        <div className='w-full flex flex-row gap-2 items-center justify-between'>
          <p className='font-semibold text-text-secondary'>Карточка:</p>
          <p
            className={cn(
              'font-regular text-text-secondary',
              !id && 'text-text-disabled',
            )}
          >
            {id ? `№ ${id}` : '-'}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
