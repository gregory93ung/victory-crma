import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/clients/:client_id'

type GetSpecificClientResp = Clients.ClientDetailInfo

export const getSpecificClient = async ({ slug }: { slug: string }): Promise<GetSpecificClientResp> => {
  return await api.get(URL, {
    replaceUrl: { client_id: slug },
  })
}
