import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/cards/:client_id'

type Resp = Clients.ICard[]

export const getClientCards = async ({ slug }: { slug: string }): Promise<Resp> => {
  return await api.get(URL, {
    replaceUrl: { client_id: slug },
  })
}
