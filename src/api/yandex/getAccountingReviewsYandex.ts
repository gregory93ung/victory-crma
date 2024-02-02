import { api } from '@/config/api.config';
import { Clients } from '@/types';
import { YandexAccountingReview } from '@/types/clients.types';

const URL = '/api/v1/yandex/accounting/:order_id';

export type GetAccountingReviewsYandexResp = {
  reviews_count: number;
  service_id: number;
  reviews: Clients.YandexAccountingReview[];
};

type GetAllReviewsParams = { page: number };

export const getAccountingReviewsYandex = async ({
  slug,
  pageParam,
}: {
  slug: string;
  pageParam: GetAllReviewsParams;
}): Promise<GetAccountingReviewsYandexResp> => {
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
