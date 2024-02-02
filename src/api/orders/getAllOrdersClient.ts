import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/orders/:client_id'

type GetAllOrdersClientResp = Clients.ClientOrder[]

export const getAllOrdersClient = async ({ slug }: { slug: string }): Promise<GetAllOrdersClientResp> => {
  return await api.get(URL, {
    replaceUrl: { client_id: slug },
  })
}
