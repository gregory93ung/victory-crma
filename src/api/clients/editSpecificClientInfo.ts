import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/clients/update'

export type EditSpecificClientInfoReq = Omit<
  Clients.ClientDetailInfo,
  'name' | 'manager' | 'number_of_active_orders' | 'number_of_cards'
>

export type EditSpecificClientInfoResp = Clients.Detail

export const editSpecificClientInfo = async ({
  body,
}: {
  body: EditSpecificClientInfoReq
}): Promise<EditSpecificClientInfoResp> => {
  return await api.patch(URL, body)
}
