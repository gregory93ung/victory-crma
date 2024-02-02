import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/writer/delete';

type DelGisWriterReviewResp = Clients.Detail;

type Params = {
  review_id: number;
};

export const delGisWriterReview = async ({
  params,
}: {
  params: Params;
}): Promise<DelGisWriterReviewResp> => {
  return await api.delete(URL, {
    params: params,
  });
};
