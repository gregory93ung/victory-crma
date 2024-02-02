import React from 'react';

import { Link } from 'react-router-dom';
import { routes } from '@/config/routes';

import { ColumnDef } from '@tanstack/react-table';

import { Clients } from '@/types';

export const columns: ColumnDef<Clients.Client>[] = React.useMemo(
  () => [
    {
      accessorKey: 'title',
      header: () => <div className='w-[550px] text-left'>Клиент</div>,

      cell: ({ row }) => {
        return (
          <Link
            to={routes.clients.createPath(String(row.original.id))}
            target='_blank'
          >
            <div className='w-[550px] text-left'>{row.getValue('title')}</div>
          </Link>
        );
      },
    },
    {
      accessorKey: 'manager',
      header: () => <div className='w-[200px] text-left'>Менеджер</div>,
      cell: ({ row }) => (
        <div className='w-[200px] text-left'>{row.original.manager.name}</div>
      ),
    },
    {
      accessorKey: 'number_of_cards',
      header: () => <div className='text-center'>Карточек</div>,
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('number_of_cards')}</div>
      ),
    },
    {
      accessorKey: 'number_of_active_orders',
      header: () => <div className='text-center'>Заказов</div>,
      cell: ({ row }) => (
        <div className='text-center'>
          {row.getValue('number_of_active_orders')}
        </div>
      ),
    },
  ],
  [],
);
