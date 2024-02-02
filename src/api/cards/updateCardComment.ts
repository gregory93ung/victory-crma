import { api } from '@/config/api.config'

const URL = '/api/v1/cards/update_comment'

export type UpdateCardCommentReq = { id: number; comment: string | null }

interface UpdateCardCommentResp {
  detail: string
}

export const updateCardComment = async ({ body }: { body: UpdateCardCommentReq }): Promise<UpdateCardCommentResp> => {
  return await api.patch(URL, body)
}
