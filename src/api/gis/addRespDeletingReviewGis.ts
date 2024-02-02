import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/deleting/';

export type addRespDeletingReviewGisReq = {
  review_id: number;
  firm_url: string;
  service_id: number;
  answer_text: string | null;
};

type addRespDeletingReviewGisResp = Clients.Detail;

export const addRespDeletingReviewGis = async ({
  body,
}: {
  body: addRespDeletingReviewGisReq;
}): Promise<addRespDeletingReviewGisResp> => {
  return await api.put(URL, body);
};
