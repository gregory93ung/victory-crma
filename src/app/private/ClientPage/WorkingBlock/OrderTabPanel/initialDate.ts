import { Clients } from '@/types'

export const initialDateOrderDetailInfo: Clients.ClientOrder = {
  id: 0,
  card: {
    id: 0,
    card_url: '',
    platform: 'YANDEX',
    comment: '',
    firm_name: '',
    firm_address: '',
    service_login: '',
    service_password: '',
    service_url: '',
    rating: '',
  },
  service: { id: 0, name: '', platform: 'YANDEX', price: '' },
  count: 0,
  period_start: '',
  period_end: '',
  implementer: { id: 0, role: { id: 0, title: '' }, departament: { id: 0, title: '' }, name: '' },
  status: '',
  price: 0,
}
