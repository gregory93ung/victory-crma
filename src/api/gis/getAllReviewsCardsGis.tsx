import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/2gis/all/:card_id';

export type GetAllReviewsResp = {
  reviews_count: number;
  platform: Clients.platform;
  reviews: Clients.TwoGisReview[];
};

type GetAllReviewsParams = { page: number };

export const getAllReviewsCardsGis = async ({
  slug,
  pageParam,
}: {
  slug: string;
  pageParam: GetAllReviewsParams;
}) => {
  return await api.get(URL, {
    replaceUrl: { card_id: slug },
    params: {
      page: pageParam.page,
    },
  });
};
