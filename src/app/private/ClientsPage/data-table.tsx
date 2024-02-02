import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import { query } from '@/api/fetcherHook/useQueryWrapper';
import { clients } from '@/api/query.key';
import { Clients } from '@/types';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export function DataTable<TData, TValue>() {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 30,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const defaultData = React.useMemo(() => [], []);

  const { data: dataQuery } = query(
    clients.getAllClients,
    {
      pageParam: { page: fetchDataOptions.pageIndex + 1 },
    },
    {
      keepPreviousData: true,
    },
  );

  const pageCount = dataQuery?.clients_count
    ? Math.ceil(dataQuery.clients_count / fetchDataOptions.pageSize)
    : -1;

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const columns: ColumnDef<Clients.Client>[] = React.useMemo(
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

  const table = useReactTable({
    data: dataQuery?.clients ?? defaultData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    state: { pagination },
    pageCount,
  });

  return (
    <div className='flex flex-col items-start flex-1 w-full gap-5'>
      <div className='flex-1 w-full overflow-y-scroll border border-border-subtitle-01 rounded '>
        <table className='w-full'>
          <thead className='sticky top-0 bg-layer-01'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className='bg-layer-01 text-left p-2'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className='border-b border-border-subtitle-01 hover:bg-layer-hover-01 cursor-pointer'
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='p-2'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className='h-24 text-center'>
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='w-full flex items-center justify-between gap-2'>
        <div className='flex flex-row items-center gap-3'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='h-4 w-4' />
          </Button>
          {/* <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16 text-text-primary placeholder:text-text-primary bg-base-black-100'
          /> */}
        </div>
        <strong>
          {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
        </strong>
      </div>
    </div>
  );
}
