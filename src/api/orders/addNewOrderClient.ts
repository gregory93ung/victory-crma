import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/orders/add';

export type AddNewOrderClientReq = Omit<
  Clients.ClientOrder,
  'id' | 'card' | 'implementer' | 'status' | 'service'
> & {
  client_id: string;
  card_url: string;
  service: number;
};

interface AddNewOrderClientResp {
  detail: string;
}

export const addNewOrderClient = async ({
  body,
}: {
  body: AddNewOrderClientReq;
}): Promise<AddNewOrderClientResp> => {
  return await api.put(URL, body);
};
