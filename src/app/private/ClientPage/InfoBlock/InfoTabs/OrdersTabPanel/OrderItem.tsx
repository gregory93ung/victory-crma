import { Clients } from '@/types';
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
import { OrderCardContextMenu } from '@/components/context-menu/order-card-context-menu';
import { Badge } from '@/components/ui/badge';

// export type OrderItemProps = Clients.IClientOrder;
export interface OrderItemProps {
  currentOrder: Clients.IClientOrder;
}

export const OrderItem = ({ currentOrder }: OrderItemProps) => {
  const {
    id,
    service,
    count,
    implementer,
    period_end,
    period_start,
    price,
    status,
    card,
  } = currentOrder;
  const { addTab } = useTabs();

  return (
    <OrderCardContextMenu currentOrder={currentOrder}>
      <Card
        className='w-full bg-layer-02 border border-border-subtitle-02 rounded cursor-pointer'
        onClick={() => {
          addTab(id, 'order');
        }}
      >
        <CardHeader className='flex flex-col gap-3'>
          <div className='flex flex-row items-center justify-between'>
            <CardTitle>
              <p
                className={cn(
                  'font-semibold text-text-secondary',
                  !service && 'text-text-disabled',
                )}
              >
                {service.name ? service.name : 'Не указано'}
              </p>
            </CardTitle>
            <Badge variant='default'>{status}</Badge>
          </div>
          <Separator className='border-b border-border-subtitle-02' />
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex flex-row gap-2 items-center'>
            <p className='font-semibold text-text-primary'>Платформа:</p>
            <Badge variant='default'>
              {service.platform ? service.platform : 'Не указана'}
            </Badge>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <p className='font-semibold text-text-primary'>Количество:</p>
            <p
              className={cn(
                'font-normal text-text-primary',
                !count && 'text-text-disabled',
              )}
            >
              {count ? count : 'Не установлено'}
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <p className='font-semibold text-text-primary'>Исполнитель:</p>
            <p
              className={cn(
                'font-normal text-text-primary',
                !implementer && 'text-text-disabled',
              )}
            >
              {implementer ? implementer.name : 'Не назначен'}
            </p>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <div className='flex flex-row gap-2 items-center'>
              <p className='font-semibold text-text-primary'>Начало:</p>
              <p
                className={cn(
                  'font-normal text-text-primary',
                  !period_start && 'text-text-disabled',
                )}
              >
                {period_start ? period_start : '-'}
              </p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <p className='font-semibold text-text-primary'>Конец:</p>
              <p
                className={cn(
                  'font-normal text-text-primary',
                  !period_end && 'text-text-disabled',
                )}
              >
                {period_end ? period_end : '-'}
              </p>
            </div>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <p className='font-semibold text-text-primary'>Цена:</p>
            <p
              className={cn(
                'font-normal text-text-primary',
                !price && 'text-text-disabled',
              )}
            >
              {price ? `${price} ₽` : '-'}
            </p>
          </div>
          <div className='bg-layer-03 px-2 py-1 rounded break-words line-clamp-[1]'>
            <p
              className={cn(
                'font-regular text-text-primary',
                !card.card_url && 'text-text-disabled',
              )}
            >
              {card.card_url ? card.card_url : 'Ссылка не установлена'}
            </p>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-3'>
          <Separator className='border-b border-border-subtitle-02' />
          <div className='w-full flex flex-row gap-2 items-center justify-between'>
            <p className='font-semibold text-text-secondary'>Заказ:</p>
            <p
              className={cn(
                'font-normal text-text-secondary',
                !id && 'text-text-disabled',
              )}
            >
              {id ? `№ ${id}` : '-'}
            </p>
          </div>
        </CardFooter>
      </Card>
    </OrderCardContextMenu>
  );
};
