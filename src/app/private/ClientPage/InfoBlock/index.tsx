import { InfoTabs } from './InfoTabs';
import { useParams } from 'react-router-dom';
import { initialDateInfoTabPanel } from './InfoTabs/InfoTabPanel/initialData';
import { query } from '@/api/fetcherHook/useQueryWrapper';
import { clients } from '@/api/query.key';

export const InfoBlock = () => {
  const { client_id } = useParams();

  const {
    data: clientInfo = initialDateInfoTabPanel,
    refetch: refetchClientInfo,
    loading,
  } = query(
    clients.getSpecificClient,
    { slug: client_id as string },
    { enabled: Boolean(client_id) },
  );

  return (
    <div className='w-[466px] min-w-[466px] max-w-[466px] h-full flex flex-col p-5 pr-2'>
      <InfoTabs clientInfo={clientInfo} loading={loading} />
    </div>
  );
};
