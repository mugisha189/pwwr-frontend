import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const AutoGrid = ({
  children,
  className,
  gap = '1rem',
  minMax = '250px',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  gap?: string;
  minMax?: string;
}) => {
  return (
    <div
      className={cn('auto-grid', className)}
      style={
        {
          gap,
          '--auto-grid-width': minMax,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
};

export { AutoGrid };
