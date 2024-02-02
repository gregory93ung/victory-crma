import { api } from '@/config/api.config';
import { Clients } from '@/types';
import { number } from 'zod';

const URL = '/api/v1/orders/update';

export type EditSpecificOrderReq = {
  id: number;
  count: number;
  period_start: string;
  period_end: string;
};

export type EditSpecificOrderReqResp = Clients.Detail;

export const editSpecificOrder = async ({
  body,
}: {
  body: EditSpecificOrderReq;
}): Promise<EditSpecificOrderReqResp> => {
  return await api.patch(URL, body);
};
