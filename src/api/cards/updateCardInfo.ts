import { api } from '@/config/api.config';

const URL = '/api/v1/cards/update';

export type UpdateCardInfoReq = {
  id: number;
  comment: string | null;
  service_login: string | null;
  service_password: string | null;
  service_url: string | null;
};

interface UpdateCardInfoResp {
  detail: string;
}

export const updateCardInfo = async ({
  body,
}: {
  body: UpdateCardInfoReq;
}): Promise<UpdateCardInfoResp> => {
  return await api.patch(URL, body);
};
