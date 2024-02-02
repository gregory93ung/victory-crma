import React, { useRef, useState, useEffect } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from './ui/skeleton';
import { query } from '@/api/fetcherHook/useQueryWrapper';

type ReviewListProps<T> = {
  queryKey: string;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export function ReviewList<T>({ queryKey, renderItem }: ReviewListProps<T>) {
  // const { loading, data: reviewsList = [], isError } = query();

  // if (loading) return <Skeleton />;
  // if (isError) return <div>Error fetching data</div>;

  return (
    <div className='flex-1 flex flex-col'>
      {/* <div className='p-5 flex-1 flex flex-col gap-4 basis-0 overflow-y-scroll'>
        {reviewsList.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
              <p>Отзывов нет</p>
              <p className='text-text-secondary hover:text-text-primary cursor-pointer'>
                Загрузить
              </p>
            </div>
          </div>
        )}
        {reviewsList.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
        ))}
      </div>
      {reviewsList.length !== 0 && (
        <div className='h-[64px] flex flex-row items-center justify-between px-5 py-3 border-t border-border-subtitle-02'>
          <Pagination className='justify-start'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => {}} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => {}} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className='font-normal text-text-secondary'>
            Вы на <span className='font-normal text-text-primary'>1</span>{' '}
            странице из <span className='font-normal text-text-primary'>1</span>
          </p>
        </div>
      )} */}
    </div>
  );
}
