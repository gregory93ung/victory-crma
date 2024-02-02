import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/contacts/update'

export type EditSpecificContactReq = Clients.Contacts

export type EditSpecificContactContactResp = Clients.Detail

export const editSpecificContact = async ({
  body,
}: {
  body: EditSpecificContactReq
}): Promise<EditSpecificContactContactResp> => {
  return await api.patch(URL, body)
}
