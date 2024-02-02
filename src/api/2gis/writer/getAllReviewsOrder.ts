import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/2gis/writer/:order_id'

type GetAllReviewsOrderResp = Clients.GisWriterReview[]

export const getAllReviewsOrder = async ({ slug }: { slug: string }): Promise<GetAllReviewsOrderResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
  })
}
