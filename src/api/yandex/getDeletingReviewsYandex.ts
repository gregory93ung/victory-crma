import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/yandex/deleting/:order_id';

export type GetDeletingReviewsYandexResp = {
  reviews_count: number;
  service_id: number;
  reviews: Clients.YandexDeletingReview[];
};

type GetAllReviewsParams = { page: number };

export const getDeletingReviewsYandex = async ({
  slug,
  pageParam,
}: {
  slug: string;
  pageParam: GetAllReviewsParams;
}): Promise<GetDeletingReviewsYandexResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
    params: {
      page: pageParam.page,
    },
  });
};

// type GetAllReviewsParams = { page: number };

// export const getAllReviewsCardsYandex = async ({
//   slug,
//   pageParam,
// }: {
//   slug: string;
//   pageParam: GetAllReviewsParams;
// }) => {
//   return await api.get(URL, {
//     replaceUrl: { card_id: slug },
//   params: {
//     page: pageParam.page,
//   },
// });
// };
