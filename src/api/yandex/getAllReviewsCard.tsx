import { api } from '@/config/api.config';
import { Clients } from '@/types';
// import { useInfiniteQuery } from '@tanstack/react-query';

const URL = '/api/v1/yandex/all/:card_id';

export type GetAllReviewsResp = {
  reviews_count: number;
  platform: Clients.platform;
  reviews: Clients.YandexReview[];
};

type GetAllReviewsParams = { page: number };

export const getAllReviewsCardsYandex = async ({
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

// export const useYandexReviews = (slug: string) => {
//   const {
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     data,
//     error,
//     isError,
//     isLoading,
//   } = useInfiniteQuery<GetAllReviewsResp>(
//     ['getAllReviewsCardsYandex', slug],
//     ({ pageParam = { page: 1 } }) => {
//       return getAllReviewsCardsYandex({ slug, pageParam });
//     },
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         const currentPageCount = allPages.length;
//         const totalReviewsCount = lastPage.reviews_count || 0;

//         if (currentPageCount * 12 < totalReviewsCount) {
//           const newPage = currentPageCount + 1;
//           return { page: newPage };
//         } else {
//           return null;
//         }
//       },
//     },
//   );

//   return {
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     data,
//     error,
//     isError,
//     isLoading,
//   };
// };
