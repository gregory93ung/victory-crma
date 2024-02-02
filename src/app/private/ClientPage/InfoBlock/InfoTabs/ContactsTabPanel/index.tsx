import { useParams } from 'react-router-dom';

import { clients } from '@/api/query.key';
import { query } from '@/api/fetcherHook/useQueryWrapper';

import { cn } from '@/lib/utils';

import ContactItem from './ContactItem';
import { Skeleton } from '@/components/ui/skeleton';
import { AddClientContactModal } from '@/components/modals/add-client-contact-modal';

export const ContactsTabPanel = () => {
  const { client_id } = useParams();

  const {
    loading,
    fetching,
    data: clientContacts,
  } = query(
    clients.getAllContactsClient,
    { slug: client_id as string },
    { enabled: Boolean(client_id) },
  );

  return (
    <div className='h-full flex flex-col gap-3 p-5'>
      <div className='flex flex-row gap-2 justify-between items-center'>
        {!loading && !fetching && (
          <>
            <p className='font-normal'>Всего контактов</p>
            <p className='font-normal text-text-secondary'>
              {clientContacts?.length}
            </p>
          </>
        )}
        {(loading || fetching) && (
          <Skeleton className='w-full h-4 bg-miscellaneous-skeleton-background' />
        )}
      </div>
      <div className='w-full flex-1 flex flex-col border border-border-subtitle-01 rounded'>
        <div className='p-4 pt-0 pb-0 flex flex-1 flex-col gap-3 basis-0 overflow-y-auto scroll-smooth'>
          <div
            className={cn(
              'flex flex-col items-center flex-1 gap-5 pt-4 pb-4',
              clientContacts?.length === 0 && 'justify-center',
            )}
          >
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-48 w-full bg-miscellaneous-skeleton-background'
                />
              ))}

            {!loading &&
              fetching &&
              Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-48 w-full bg-miscellaneous-skeleton-background'
                />
              ))}

            {!loading && !fetching && clientContacts?.length === 0 && (
              <span className='text-sm text-text-secondary'>
                Контакты отсутствуют
              </span>
            )}

            {!fetching &&
              !loading &&
              clientContacts?.map((contact, index) => (
                <ContactItem key={index} {...contact} />
              ))}
          </div>
        </div>
        <div className='w-full h-[64px] flex items-center justify-center px-4 border-t border-border-subtitle-01'>
          <AddClientContactModal>Добавить контакт</AddClientContactModal>
        </div>
      </div>
    </div>
  );
};
