import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/deleting/';

export type addRespDeletingOldReviewGisReq = {
  review_id: number;
  firm_url: string;
  service_id: number;
  claim_tex: string | null;
};

type addRespDeletingOldReviewGisResp = Clients.Detail;

export const addRespDeletingOldReviewGis = async ({
  body,
}: {
  body: addRespDeletingOldReviewGisReq;
}): Promise<addRespDeletingOldReviewGisResp> => {
  return await api.put(URL, body);
};
