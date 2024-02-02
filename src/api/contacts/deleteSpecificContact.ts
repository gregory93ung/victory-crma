import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/contacts/delete';

type DeleteSpecificContactResp = Clients.Detail;

type Params = {
  contact_id: number;
};

export const deleteSpecificContact = async ({
  params,
}: {
  params: Params;
}): Promise<DeleteSpecificContactResp> => {
  return await api.delete(URL, {
    params: params,
  });
};
