import { Clients } from '@/types';
import {
  Home,
  LucideIcon,
  Star,
  MessageCircleCode,
  GitBranch,
  UserRound,
  Briefcase,
} from 'lucide-react';
import { initialDateInfoTabPanel } from './initialData';

interface InfoData {
  title:
    | 'Клиент'
    | 'Город'
    | 'Сфера'
    | 'Рейтинг'
    | 'Количество отзывов'
    | 'Филиалы'
    | 'Менеджер';
  icon: LucideIcon;
  value: number | string | null;
}

export const getInfo = (
  info: Clients.ClientDetailInfo = initialDateInfoTabPanel,
): InfoData[] => {
  return [
    {
      title: 'Клиент',
      icon: UserRound,
      value: info.name,
    },
    {
      title: 'Город',
      icon: Home,
      value: info.city,
    },
    {
      title: 'Сфера',
      icon: Briefcase,
      value: info.description,
    },
    {
      title: 'Рейтинг',
      icon: Star,
      value: info.rating,
    },
    {
      title: 'Количество отзывов',
      icon: MessageCircleCode,
      value: info.branch_count,
    },
    {
      title: 'Филиалы',
      icon: GitBranch,
      value: info.reviews_count,
    },
    {
      title: 'Менеджер',
      icon: UserRound,
      value: info.manager.name,
    },
  ];
};
