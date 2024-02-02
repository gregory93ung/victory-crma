import { GisWriterReview } from './../../types/clients.types';
import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/writer/:order_id';

export type GetWriterReviewsGisResp = {
  service_id: number;
  reviews_count: number;
  reviews: Clients.GisWriterReview[];
};

type getWriterReviewsGisParams = { page: number };

export const getWriterReviewsGis = async ({
  slug,
  pageParam,
}: {
  slug: string;
  pageParam: getWriterReviewsGisParams;
}): Promise<GetWriterReviewsGisResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
    params: {
      page: pageParam.page,
    },
  });
};
