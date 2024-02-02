import { Clients } from '@/types'
import { api } from '@/config/api.config'

const URL = '/api/v1/orders/get_by_id/:order_id'

export type GetOrderDetailInfoResp = Clients.IClientOrder

export const getOrderDetailInfo = async ({ slug }: { slug: string }): Promise<GetOrderDetailInfoResp> => {
  return await api.get(URL, {
    replaceUrl: { order_id: slug },
  })
}
