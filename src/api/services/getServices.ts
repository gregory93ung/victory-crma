import { api } from '@/config/api.config'

const URL = '/api/v1/services/get_all'

export type Services = { id: number; name: string; platform: string; price: string }

type GetServicesResp = Services[]

export const getServices = async (): Promise<GetServicesResp> => {
  return await api.get(URL)
}
