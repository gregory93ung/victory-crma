import { Clients } from '@/types';

export const initialDateInfoTabPanel: Clients.ClientDetailInfo = {
  id: 0,
  name: '',
  manager: {
    id: 0,
    name: '',
    role: { id: 0, title: '' },
    departament: { id: 0, title: '' },
  },
  number_of_active_orders: 0,
  number_of_cards: 0,
  city: '',
  description: '',
  rating: 0,
  reviews_count: 0,
  branch_count: 0,
  comment: '',
};
