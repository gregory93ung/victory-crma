import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/clients/get_all';

export type GetAllClientsResp = {
  clients_count: number;
  clients: Clients.Client[];
};

type GetAllReviewsParams = { page: number };

export const getAllClients = async ({
  pageParam,
}: {
  pageParam: GetAllReviewsParams;
}): Promise<GetAllClientsResp> => {
  return await api.get(URL, {
    params: {
      page: pageParam.page,
    },
  });
};
