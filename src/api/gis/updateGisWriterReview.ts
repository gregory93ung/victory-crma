import { api } from '@/config/api.config';

const URL = '/api/v1/2gis/writer/update';

export type UpdateGisWriterReviewReq = {
  id: number;
  review_text: string;
  date: string;
  sex: 'male' | 'female';
};

interface UpdateGisWriterReviewResp {
  detail: string;
}

export const updateGisWriterReview = async ({
  body,
}: {
  body: UpdateGisWriterReviewReq;
}): Promise<UpdateGisWriterReviewResp> => {
  return await api.patch(URL, body);
};
