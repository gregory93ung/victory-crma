import { useTabs } from '@/hooks/useTabs';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { X } from 'lucide-react';
import { ChatTabPanel } from './ChatTabPanel';
import { OrderTabPanel } from './OrderTabPanel';
import { CardTabPanel } from './CardTabPanel';

export const WorkingBlock = () => {
  const { tabs, activeTabIndex, setActiveTab, removeTab } = useTabs();

  const onTabChange = (keyTab: any) => {
    setActiveTab(keyTab);
  };

  const handleRemoveTab = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    keyTabToRemove: string,
  ) => {
    e.stopPropagation();
    removeTab(keyTabToRemove);
  };
  return (
    <div className='w-full h-full p-5 pl-3 flex flex-col flex-1 min-w-0'>
      <Tabs
        defaultValue={activeTabIndex}
        value={activeTabIndex}
        className='min-w-0 flex flex-col flex-1'
      >
        <TabsList className='justify-start overflow-x-scroll hide-scrollbar'>
          {tabs.map((tab, index) => (
            <TabsTrigger
              data-scroll={tab.keyTab}
              key={index}
              value={tab.keyTab}
              onClick={() => onTabChange(tab.keyTab)}
            >
              {tab.heading}
              {tab.type !== 'chat' && (
                <X
                  className='w-5 h-5 p-1 bg-layer-02 rounded-full hover:bg-layer-accent-02 '
                  onClick={(e) => handleRemoveTab(e, tab.keyTab)}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab, index) => {
          switch (tab.type) {
            case 'card':
              return (
                <TabsContent key={index} value={tab.keyTab}>
                  <CardTabPanel key={index} cardId={tab.id} />
                </TabsContent>
              );
            case 'order':
              return (
                <TabsContent key={index} value={tab.keyTab}>
                  <OrderTabPanel key={index} orderId={tab.id} />
                </TabsContent>
              );
            default:
              return (
                <TabsContent key={index} value={tab.keyTab}>
                  <ChatTabPanel key={index} />
                </TabsContent>
              );
          }
        })}
      </Tabs>
    </div>
  );
};
