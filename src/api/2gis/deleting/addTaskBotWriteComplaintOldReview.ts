import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/2gis/deleting_old/'

export type AddTaskBotWriteComplaintOldReviewReq = {
  review_id: string
  firm_url: string
  service_id: number
  claim_text: string | null
}

type AddTaskBotWriteComplaintOldReviewResp = Clients.Detail

export const addTaskBotWriteComplaintOldReview = async ({
  body,
}: {
  body: AddTaskBotWriteComplaintOldReviewReq
}): Promise<AddTaskBotWriteComplaintOldReviewResp> => {
  return await api.put(URL, body)
}
