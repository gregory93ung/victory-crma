// import { getAllReviewsCard } from './getAllReviewsCard'
import { api } from '@/config/api.config'
import { useInfiniteQuery } from '@tanstack/react-query'
import { infiniteQuery } from '../fetcherHook/useQueryWrapper'
import { clients } from '../query.key'

const URL = '/api/v1/reviews/all/:card_id'

export type Yandex = {
  review_id: number
  review_text: string
  rating: number
  date_created: string
  user_id: number
  user_name: string
  official_answer_text: string
  official_answer_date: string
  deleted: boolean
  our_review: boolean
}

export type Gis = {
  review_id: number
  review_text: string
  rating: number
  date_created: string
  user_id: number
  user_name: string
  official_answer_text: string
  official_answer_date: string
  deleted: boolean
  our_review: boolean
  provider: string
  is_hidden: boolean
}

export type AllReviews = Yandex | Gis

export type GetAllReviewsCardResp = {
  reviews_count: number
  platform: 'YANDEX' | 'GIS' | 'FLAMP'
  reviews: AllReviews[]
}

type CardReviewsParams = { page: number }

// export const getAllReviewsCard = async ({
//   slug,
//   params,
// }: {
//   slug: string
//   params: CardReviewsParams
// }): Promise<GetAllReviewsCardResp> => {
//   return await api.get(URL, {
//     replaceUrl: { card_id: slug },
//     params: params,
//   })
// }

export const getAllReviewsCard = async ({ slug, pageParam }: { slug: string; pageParam: CardReviewsParams }) => {
  return await api.get(URL, {
    replaceUrl: { card_id: slug },
    params: {
      page: pageParam.page,
    },
  })
}

export const useReviews = (slug: string) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error, isError, isLoading } =
    useInfiniteQuery<GetAllReviewsCardResp>(
      ['getAllReviewsCard', slug],
      ({ pageParam = { page: 1 } }) => {
        return getAllReviewsCard({ slug, pageParam })
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          const currentPageCount = allPages.length
          const totalReviewsCount = lastPage.reviews_count || 0

          if (currentPageCount * 12 < totalReviewsCount) {
            const newPage = currentPageCount + 1
            return { page: newPage }
          } else {
            return null
          }
        },
      }
    )

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    isError,
    isLoading,
  }
}

// const { data } = infiniteQuery(clients.getAllReviewsCard, { slug: String(1), pageParam: { limit: 12, offset: 1 } })

//  const { loading, data: cardReviews = { reviews_count: 0, platform: 'YANDEX', reviews: [] } } = query(
//    clients.getAllReviewsCard,
//    {
//      slug: String(cardId),
//      params: { limit: 12, offset: 1 },
//    }
//  )

// const {} = useInfiniteQuery({
//   queryKey: ['getAllReviewsCard'],
//   queryFn: async ({ pageParam = 1 }) => {
//     const response = await getAllReviewsCard({ slug: 'your_slug', pageParam })
//     return response.data
//   },
// })

// import { useInfiniteQuery } from '@tanstack/react-query'
// import axios from 'axios'

// interface Users {
//   id: number
//   name: string
// }

// interface UserQuery {
//   pageSize: number
// }

// type ErrorResponse = Error
// type QueryKey = ['users', { cardId: number }]

// const useReviews = (cardId: number) => {
//   return useInfiniteQuery<GetAllReviewsCardResp, ErrorResponse, GetAllReviewsCardResp, QueryKey>({
//     queryKey: ['users', { cardId }],
//     queryFn: async ({ pageParam = 1, queryKey }) => {
//       const [, { cardId }] = queryKey
//       return axios
//         .get(`/api/v1/reviews/all/${cardId}`, {
//           params: {
//             _page: pageParam,
//             _limit: 4,
//           },
//         })
//         .then((res) => res.data)
//     },
//     getNextPageParam(lastPage) {
//       return lastPage.length > 0 ? allPages.length + 1 : undefined
//     },
//   })
// }

// const useReviews = (query: UserQuery) =>
//   useInfiniteQuery<Users[], Error>({
//     queryKey: ['users', query],
//     queryFn: ({ pageParam = 1 }) =>
//       axios
//         .get('/api/v1/reviews/all/:card_id', {
//           params: {
//             _page: pageParam,
//             _limit: 4,
//           },
//         })
//         .then((res) => res.data),

//     getNextPageParam(lastPage, allPages) {
//       return lastPage.length > 0 ? allPages.length + 1 : undefined
//     },
//   })

// const useReviews = (query: UserQuery) =>
//   useInfiniteQuery<Users[], Error>({
//     queryKey: ['users', query],
//     queryFn: ({ pageParam = 1 }) =>
//       axios
//         .get('/api/v1/reviews/all/:card_id', {
//           params: {
//             _page: pageParam,
//             _limit: 4,
//           },
//         })
//         .then((res) => res.data),

//     getNextPageParam(lastPage, allPages) {
//       return lastPage.length > 0 ? allPages.length + 1 : undefined
//     },
//   })

// const cardId = 4
// const { data, fetchNextPage, hasNextPage, isLoading } = useReviews(cardId)

// export default useReviews
