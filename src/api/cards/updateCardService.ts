import { api } from '@/config/api.config'

const URL = '/api/v1/cards/update_service'

export type UpdateCardServiceReq = {
  id: number
  service_login: string | null
  service_password: string | null
  service_url: string | null
}

interface UpdateCardServiceResp {
  detail: string
}

export const updateCardService = async ({ body }: { body: UpdateCardServiceReq }): Promise<UpdateCardServiceResp> => {
  return await api.patch(URL, body)
}
