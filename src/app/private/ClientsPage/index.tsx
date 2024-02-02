import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

const ClientsPage = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex h-[76px] items-center justify-between px-6 py-6'>
        <h2 className='scroll-m-20 text-lg font-semibold tracking-tight'>
          Таблица клиентов
        </h2>
        <Button variant='outline' size='icon'>
          <Plus className='h-[1.2rem] w-[1.2rem]' />
        </Button>
      </div>
      <Separator />
      <div className='flex flex-1 px-5 pb-5 overflow-hidden w-full h-full'>
        <DataTable />
      </div>
    </div>
  );
};

export default ClientsPage;
