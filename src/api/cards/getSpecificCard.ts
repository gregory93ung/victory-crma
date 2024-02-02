import { api } from '@/config/api.config'
import { Clients } from '@/types'

const URL = '/api/v1/cards/get_by_id/:card_id'

export type GetSpecificCardResp = Clients.Card

export const getSpecificCard = async ({ slug }: { slug: string }): Promise<GetSpecificCardResp> => {
  return await api.get(URL, {
    replaceUrl: { card_id: slug },
  })
}
