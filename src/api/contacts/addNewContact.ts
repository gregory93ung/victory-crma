import { api } from '@/config/api.config';
import { Clients } from '@/types';

const URL = '/api/v1/contacts/add';

export type AddNewContactReq = Clients.ContactAdd;

type AddNewContactResp = Clients.Detail;

export const addNewContact = async ({
  body,
}: {
  body: AddNewContactReq;
}): Promise<AddNewContactResp> => {
  return await api.put(URL, body);
};
