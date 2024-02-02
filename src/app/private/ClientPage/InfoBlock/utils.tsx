import { InfoTabPanel } from './InfoTabs/InfoTabPanel/index';
import { ContactsTabPanel } from './InfoTabs/ContactsTabPanel';
import { OrdersTabPanel } from './InfoTabs/OrdersTabPanel';
import { CardsTabPanel } from './InfoTabs/CardsTabPanel';
import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clients } from '@/types';

interface TabsData {
  key: 'info' | 'contacts' | 'orders' | 'cards';
  label: string;
  content: ReactNode;
  badge?: ReactNode;
}

export const getTabs = (
  clientInfo: Clients.ClientDetailInfo,
  loading: boolean,
): TabsData[] => {
  return [
    {
      key: 'info',
      label: 'Инфо',
      content: <InfoTabPanel clientInfo={clientInfo} loading={loading} />,
    },
    {
      key: 'contacts',
      label: 'Контакты',
      content: <ContactsTabPanel />,
    },
    {
      key: 'orders',
      label: 'Заказы',
      content: <OrdersTabPanel />,
      badge: (
        <Badge className='bg-support-success' variant='default'>
          {clientInfo.number_of_active_orders}
        </Badge>
      ),
    },
    {
      key: 'cards',
      label: 'Карточки',
      content: <CardsTabPanel />,
      badge: <Badge variant='default'> {clientInfo.number_of_cards}</Badge>,
    },
  ];
};
