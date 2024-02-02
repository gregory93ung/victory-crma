import { api } from '@/config/api.config'

const URL = '/api/v1/gis_writer/:order_id'

export type GetGisWriterReviewsResp = {
  id: number
  review_text: string
  date: string
  date_done: string | null
  found: boolean
  deleted: boolean
  account: { id: number; name: string; username: string; password: string } | null
  sex: 'male' | 'female'
}

export const getGisWriterReviews = async ({ slug }: { slug: string }): Promise<GetGisWriterReviewsResp[]> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
  })
}
