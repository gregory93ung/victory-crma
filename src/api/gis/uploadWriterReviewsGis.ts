import { api } from '@/config/api.config';
import { getLocalStorageItem } from '@/utils/localStorage';

const URL = '/api/v1/2gis/writer/upload/:order_id';

export type uploadWriterReviewsGisReq = { slug: number; file: File };

type uploadWriterReviewsGisResp = {
  detail: string;
};

export const uploadWriterReviewsGis = async ({
  slug,
  file,
}: uploadWriterReviewsGisReq): Promise<uploadWriterReviewsGisResp> => {
  return await api.post(
    URL,
    { file: file },
    {
      replaceUrl: { order_id: slug },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
