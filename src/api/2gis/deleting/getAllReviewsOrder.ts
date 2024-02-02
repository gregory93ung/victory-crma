import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/2gis/deleting/:order_id'

type GetAllReviewsOrderResp = Clients.GisDeletingingReview

export const getAllReviewsOrder = async ({ slug }: { slug: string }): Promise<GetAllReviewsOrderResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
  })
}
