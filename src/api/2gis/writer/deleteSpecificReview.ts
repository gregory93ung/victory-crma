import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/2gis/writer/delete/card_id'

type DeleteSpecificReviewResp = Clients.Detail

type Params = {
  review_id: number
}

export const deleteSpecificReview = async ({
  slug,
  params,
}: {
  slug: string
  params: Params
}): Promise<DeleteSpecificReviewResp> => {
  return await api.delete(URL, {
    replaceUrl: { card_id: slug },
    params: params,
  })
}
