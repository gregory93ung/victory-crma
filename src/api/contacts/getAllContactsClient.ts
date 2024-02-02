import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/contacts/:client_id'

type GetAllContactsClientResp = Clients.Contacts[]

export const getAllContactsClient = async ({ slug }: { slug: string }): Promise<GetAllContactsClientResp> => {
  return await api.get(URL, {
    replaceUrl: { client_id: slug },
  })
}
