import { TabsProvider } from '@/hooks/useTabs';

import { InfoBlock } from './InfoBlock';
import { WorkingBlock } from './WorkingBlock';

const ClientPage = () => {
  return (
    <TabsProvider>
      <div className='w-full h-full flex'>
        <InfoBlock />
        <WorkingBlock />
      </div>
    </TabsProvider>
  );
};

export default ClientPage;
