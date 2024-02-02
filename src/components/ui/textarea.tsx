import * as React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  value?: string | null;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex flex-1 min-h-[60px] w-full rounded-md bg-field-01 px-3 py-1 text-sm placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 ring-border-strong-02 resize-none',
          className,
        )}
        ref={ref}
        value={value ?? ''}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
