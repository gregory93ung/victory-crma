import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/2gis/accounting/'

export type AddTaskBotWriteRespReviewReq = {
  review_id: string
  firm_url: string
  service_id: number
  answer_text: string | null
}

type AddTaskBotWriteRespReviewResp = Clients.Detail

export const addTaskBotWriteRespReview = async ({
  body,
}: {
  body: AddTaskBotWriteRespReviewReq
}): Promise<AddTaskBotWriteRespReviewResp> => {
  return await api.put(URL, body)
}
