import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/2gis/writer/update'

export type EditSpecificReviewReq = Omit<Clients.GisWriterReview, 'date_done' | 'found' | 'deleted' | 'account'>

export type EditSpecificReviewResp = Clients.Detail

export const editSpecificReview = async ({
  body,
}: {
  body: EditSpecificReviewReq
}): Promise<EditSpecificReviewResp> => {
  return await api.patch(URL, body)
}
