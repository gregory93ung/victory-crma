import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value?: string | number | null | Date;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md bg-field-01 px-3 py-1 text-sm placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 ring-border-strong-02',
          className,
        )}
        ref={ref}
        value={value ?? ''}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
