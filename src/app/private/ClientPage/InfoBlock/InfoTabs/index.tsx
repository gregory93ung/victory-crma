import { useMemo } from 'react';
import { getTabs } from '../utils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clients } from '@/types';

interface InfoTabsProps {
  clientInfo: Clients.ClientDetailInfo;
  loading: boolean;
}

export const InfoTabs = ({ clientInfo, loading }: InfoTabsProps) => {
  const infoTabsData = useMemo(() => {
    return getTabs(clientInfo, loading);
  }, [clientInfo, loading]);

  return (
    <div className='w-full flex flex-col flex-1'>
      <Tabs defaultValue='info' className='w-full flex flex-col flex-1'>
        <TabsList className='justify-between'>
          {infoTabsData.map(({ label, badge, key }, index) => (
            <TabsTrigger key={index} className='flex-1' value={key}>
              {label}
              {badge && badge}
            </TabsTrigger>
          ))}
        </TabsList>
        {infoTabsData.map(({ key, content }, index) => (
          <TabsContent key={index} value={key}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
