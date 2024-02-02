import { api } from '@/config/api.config'

const URL = '/api/v1/cards/get_by_id/:card_id'

export type GetCardDetailInfoResp = {
  id: number
  card_url: string
  platform: string
  comment: string | null
  firm_name: string | null
  firm_address: string | null
  service_login: string | null
  service_password: string | null
  service_url: string | null
  rating: string | null
}

export const getCardDetailInfo = async ({ slug }: { slug: string }): Promise<GetCardDetailInfoResp> => {
  return await api.get(URL, {
    replaceUrl: { card_id: slug },
  })
}
