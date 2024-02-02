import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/deleting/:order_id';

export type GetDeletingReviewsGisResp = {
  reviews_count: number;
  service_id: number;
  reviews: Clients.GisDeletingReview[];
};

type GetAllReviewsParams = { page: number };

export const getDeletingReviewsGis = async ({
  slug,
  pageParam,
}: {
  slug: string;
  pageParam: GetAllReviewsParams;
}): Promise<GetDeletingReviewsGisResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
    params: {
      page: pageParam.page,
    },
  });
};
