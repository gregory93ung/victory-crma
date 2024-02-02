import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/yandex/deleting/';

export type addRespDeletingReviewYandexReq = {
  review_id: number;
  firm_url: string;
  service_id: number;
  claim_text: string | null;
};

type addRespDeletingReviewYandexResp = Clients.Detail;

export const addRespDeletingReviewYandex = async ({
  body,
}: {
  body: addRespDeletingReviewYandexReq;
}): Promise<addRespDeletingReviewYandexResp> => {
  return await api.put(URL, body);
};
