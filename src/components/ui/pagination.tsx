import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('flex justify-start', className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <PaginationItem>
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  </PaginationItem>
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn(
      'hover:bg-button-secondary gap-1 pl-2.5 cursor-default',
      disabled && 'hover:bg-base-transparent hover:text-none',
      className,
    )}
    {...props}
    onClick={(e) => {
      if (!disabled) {
        e.stopPropagation();
        props.onClick?.(e);
      }
    }}
  >
    <ChevronLeftIcon className='h-4 w-4 cursor-default' />
    <button disabled={disabled}>Назад</button>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn(
      'hover:bg-button-secondary gap-1 pl-2.5 cursor-default',
      disabled && 'hover:bg-base-transparent hover:text-none',
      className,
    )}
    {...props}
    onClick={(e) => {
      if (!disabled) {
        e.stopPropagation();
        props.onClick?.(e);
      }
    }}
  >
    <button disabled={disabled}>Вперед</button>
    <ChevronRightIcon className='h-4 w-4 cursor-default' />
  </PaginationLink>
);

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
