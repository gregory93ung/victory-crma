import InfoItem from './InfoItem';
import { useMemo } from 'react';
import { getInfo } from './utils';
import { InfoComment } from './InfoComment';
import { Clients } from '@/types';
import { EditClientInfoModal } from '@/components/modals/edit-client-info-modal';
interface InfoTabPanelProps {
  clientInfo: Clients.ClientDetailInfo;
  loading: boolean;
}

export const InfoTabPanel = ({ clientInfo, loading }: InfoTabPanelProps) => {
  const infoData = useMemo(() => {
    return getInfo(clientInfo);
  }, [clientInfo]);

  return (
    <div className='h-full flex flex-col p-5 gap-3'>
      <div className='flex flex-row gap-2'>
        <p className='font-normal'>Общая информация о клиенте</p>
      </div>
      <div className='w-full flex-1 flex flex-col justify-between border border-border-subtitle-01 rounded gap-5'>
        <div className='p-4 flex flex-col gap-3'>
          {infoData.map(({ title, icon, value }, index) => (
            <InfoItem
              key={index}
              title={title}
              icon={icon}
              value={value}
              isLoading={loading}
            />
          ))}
          <InfoComment value={clientInfo.comment} isLoading={loading} />
        </div>

        <div className='w-full h-[64px] flex items-center justify-center px-4 border-t border-border-subtitle-01'>
          <EditClientInfoModal info={clientInfo}>
            Редактировать
          </EditClientInfoModal>
        </div>
      </div>
    </div>
  );
};
