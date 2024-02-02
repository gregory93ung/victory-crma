import { ReactNode } from 'react';

import { Clients } from '@/types';

import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { cn } from '@/lib/utils';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface OrderInfoModalProps {
  children: ReactNode;
  info: Clients.IClientOrder;
}

export const OrderInfoModal = ({
  children,
  info: { count, price, period_start, period_end, service, implementer },
}: OrderInfoModalProps) => {
  const [_, copy] = useCopyToClipboard();

  const handleCopyClick = async (textToCopy: string) => {
    const isSuccess = await copy(textToCopy);

    if (isSuccess) {
      toast('Вы скопировали', {
        description: textToCopy,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger className='outline-none'>{children}</SheetTrigger>
      <SheetContent className='flex flex-col gap-5'>
        <SheetHeader>
          <SheetTitle className='flex flex-row items-center justify-between'>
            Общая информация
          </SheetTitle>
        </SheetHeader>
        <div className='flex-1 flex flex-col justify-between gap-5 overflow-y-scroll'>
          <div className='flex-1 flex flex-col bg-layer-01 rounded'>
            <div className='flex flex-col gap-3 p-3'>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Количество:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    count && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => count && handleCopyClick(String(count))}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !count && 'text-text-disabled',
                    )}
                  >
                    {count ? count : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Дата начала:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    period_start && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => period_start && handleCopyClick(period_start)}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !period_start && 'text-text-disabled',
                    )}
                  >
                    {period_start ? period_start : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Дата окончания:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    period_end && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => period_end && handleCopyClick(period_end)}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !period_end && 'text-text-disabled',
                    )}
                  >
                    {period_end ? period_end : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>Цена:</p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    price && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => price && handleCopyClick(String(price))}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !price && 'text-text-disabled',
                    )}
                  >
                    {price ? price : 'Не указано'}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-3 p-3'>
              <p className='font-semibold text-text-primary'>
                Информация по услуге
              </p>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Услуга:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    service.name && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() => service.name && handleCopyClick(service.name)}
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !service.name && 'text-text-disabled',
                    )}
                  >
                    {service.name ? service.name : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Платформа:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    service.platform && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() =>
                    service.platform && handleCopyClick(service.platform)
                  }
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !service.platform && 'text-text-disabled',
                    )}
                  >
                    {service.platform ? service.platform : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>Цена:</p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    service.price && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() =>
                    service.price && handleCopyClick(service.price)
                  }
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !service.price && 'text-text-disabled',
                    )}
                  >
                    {service.price ? service.price : 'Не указано'}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-3 p-3'>
              <p className='font-semibold text-text-primary'>Исполнитель:</p>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>Имя:</p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    implementer && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() =>
                    implementer && handleCopyClick(implementer.name)
                  }
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !implementer && 'text-text-disabled',
                    )}
                  >
                    {implementer ? implementer.name : 'Не указано'}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-sm text-text-primary'>
                  Департамент:
                </p>
                <div
                  className={cn(
                    'bg-field-02 p-2 rounded',
                    implementer && 'hover:bg-field-hover-02 cursor-copy',
                  )}
                  onClick={() =>
                    implementer &&
                    handleCopyClick(implementer.departament.title)
                  }
                >
                  <p
                    className={cn(
                      'font-normal text-text-secondary break-words line-clamp-[1]',
                      !implementer && 'text-text-disabled',
                    )}
                  >
                    {implementer ? implementer.departament.title : 'Не указано'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
