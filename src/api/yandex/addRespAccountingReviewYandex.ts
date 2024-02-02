import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/yandex/accounting/';

export type addRespAccountingReviewYandexReq = {
  review_id: number;
  firm_url: string;
  service_id: number;
  answer_text: string | null;
};

type addRespAccountingReviewYandexResp = Clients.Detail;

export const addRespAccountingReviewYandex = async ({
  body,
}: {
  body: addRespAccountingReviewYandexReq;
}): Promise<addRespAccountingReviewYandexResp> => {
  return await api.put(URL, body);
};
