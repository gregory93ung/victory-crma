import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/accounting/:order_id';

export type GetAccountingReviewsGisResp = {
  reviews_count: number;
  service_id: number;
  reviews: Clients.GisAccountingReview[];
};

type GetAccountingReviewsGisParams = { page: number };

export const getAccountingReviewsGis = async ({
  slug,
  pageParam,
}: {
  slug: string;
  pageParam: GetAccountingReviewsGisParams;
}): Promise<GetAccountingReviewsGisResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
    params: {
      page: pageParam.page,
    },
  });
};
