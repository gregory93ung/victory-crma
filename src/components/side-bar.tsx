import { ResizablePanel } from './ui/resizable';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { jwtDecode } from 'jwt-decode';

import { Logo } from './logo';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { LogoIcon } from './logo-icon';
import { Separator } from './ui/separator';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LocalStorageKeys,
  getLocalStorageItem,
  removeLocalStorageItem,
} from '@/utils/localStorage';
import { useTheme } from './theme-provider';

interface SideBarProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export const SideBar = ({
  defaultLayout = [200, 440],
  defaultCollapsed,
  navCollapsedSize,
}: SideBarProps) => {
  const saveCollapseToLocalStorage = (collapsed: boolean) => {
    localStorage.setItem(
      'react-resizable-panels:collapsed',
      JSON.stringify(collapsed),
    );
  };

  const logOut = () => {
    removeLocalStorageItem(LocalStorageKeys.USER);
    window.location.reload();
  };

  const { setTheme, theme } = useTheme();

  const getEffectiveTheme = () => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      return systemTheme;
    }
    return theme;
  };

  const activeTheme = getEffectiveTheme();

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const [dekodeInfoUser, setDekodeInfoUser] = useState<{ name: string }>({
    name: '',
  });
  const token = getLocalStorageItem('USER-TOKEN');

  useEffect(() => {
    setDekodeInfoUser(jwtDecode(String(token)));
  }, []);

  return (
    <ResizablePanel
      defaultSize={defaultLayout[0]}
      collapsedSize={navCollapsedSize}
      collapsible={true}
      minSize={12}
      maxSize={12}
      onCollapse={(collapsed) => {
        setIsCollapsed(collapsed);
        saveCollapseToLocalStorage(collapsed);
      }}
      className={cn(
        'max-w-[225px] flex flex-col items-center justify-start bg-layer-01 border-r border-border-subtitle-00',
        isCollapsed &&
          'max-w-[75px] min-w-[75px] transition-all duration-300 ease-in-out ',
      )}
    >
      <div
        className={cn(
          'flex h-[76px] min-h-[76px] items-center justify-center',
          isCollapsed ? 'h-[76px]' : 'px-2',
        )}
      >
        {isCollapsed && <LogoIcon />}
        {!isCollapsed && <Logo />}
      </div>
      <div
        className={cn(
          'w-full flex flex-col justify-between flex-1 p-5',
          isCollapsed ? 'items-center' : 'items-left',
        )}
      >
        {/* <TooltipProvider delayDuration={0}>
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Inbox',
                label: '128',
                icon: Inbox,
                variant: 'default',
              },
              {
                title: 'Drafts',
                label: '9',
                icon: File,
                variant: 'ghost',
              },
            ]}
          />
        </TooltipProvider> */}
        <div></div>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-full outline-none'>
            <div
              className={cn(
                'flex flex-row items-center justify-center p-2',
                !isCollapsed && 'w-full gap-x-3 hover:bg-muted rounded',
              )}
            >
              <Avatar className='border-2 border-border-subtitle-01 hover:border-muted	'>
                <AvatarImage src='https://github.com/shadcn.pngd' />
                <AvatarFallback>ГУ</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className=' w-full space-y-0 flex flex-col items-start '>
                  <p className='text-sm [&:not(:first-child)]:mt-6'>
                    {dekodeInfoUser.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>Админ</p>
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='right' align='end'>
            <DropdownMenuLabel>
              <div
                className={cn(
                  'flex flex-row items-center justify-center p-2 gap-3',
                )}
              >
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.pnfg' />
                  <AvatarFallback className='bg-layer-02'>ГУ</AvatarFallback>
                </Avatar>

                <div className=' w-full space-y-0 flex flex-col items-start'>
                  <p className='text-sm [&:not(:first-child)]:mt-6'>
                    {dekodeInfoUser.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>Админ</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Сменить тему</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => setTheme('light')}
                    className='flex flex-row justify-between'
                  >
                    light
                    {activeTheme === 'light' && <span>+</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme('dark')}
                    className='flex flex-row justify-between'
                  >
                    Dark
                    {activeTheme === 'dark' && <span>+</span>}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Добавить клиента</DropdownMenuItem>
            <DropdownMenuItem>Добавить исполнителя</DropdownMenuItem>
            <DropdownMenuItem onClick={logOut}>Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ResizablePanel>
  );
};
