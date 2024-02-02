import { api } from '@/config/api.config'

const URL = '/api/v1/gis_writer/:order_id'

export type GetAccountingDeletingReviewsResp = {
  review_id: string
  review_text: string
  rating: number
  provider: '2gis' | 'yandex'
  is_hidden: false
  date_created: string
  date_edited: null
  user_id: string
  user_name: string
  official_answer_text: null
  official_answer_date: null
  deleted: false
  our_review: true
  old: false
}

export const getAccountingDeletingReviews = async ({
  slug,
}: {
  slug: string
}): Promise<GetAccountingDeletingReviewsResp[]> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
  })
}
