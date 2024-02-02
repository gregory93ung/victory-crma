import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/cards/:client_id'

export type GetAllCardsClientResp = Clients.Card[]

export const getAllCardsClient = async ({ slug }: { slug: string }): Promise<GetAllCardsClientResp> => {
  return await api.get(URL, {
    replaceUrl: { client_id: slug },
  })
}
