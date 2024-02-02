import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getLocalStorageItem } from '@/utils/localStorage';
import { jwtDecode } from 'jwt-decode';
import { UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ChatTabPanel = () => {
  const [dekodeInfoUser, setDekodeInfoUser] = useState<{ name: string }>({
    name: '',
  });
  const token = getLocalStorageItem('USER-TOKEN');

  useEffect(() => {
    setDekodeInfoUser(jwtDecode(String(token)));
  }, []);

  return (
    <div className='w-full h-full p-5 rounded-b'>
      <div className='w-full h-full flex rounded border border-border-subtitle-01'>
        <div className='flex-1 flex flex-col'>
          <div className='p-5 flex-1 flex flex-col items-center justify-center gap-4 basis-0 overflow-y-scroll'>
            <span className='text-text-secondary'>Здесь пока ничего нет</span>
            <span className='text-text-placeholder'>
              Планируется Чат написание
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
