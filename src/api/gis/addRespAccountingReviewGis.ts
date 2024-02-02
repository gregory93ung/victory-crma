import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/accounting/';

export type addRespAccountingReviewGisReq = {
  review_id: number;
  firm_url: string;
  service_id: number;
  answer_text: string | null;
};

type addRespAccountingReviewGisResp = Clients.Detail;

export const addRespAccountingReviewGis = async ({
  body,
}: {
  body: addRespAccountingReviewGisReq;
}): Promise<addRespAccountingReviewGisResp> => {
  return await api.put(URL, body);
};
