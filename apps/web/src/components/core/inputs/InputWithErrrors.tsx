import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React, { useMemo, type ReactNode } from 'react';
import PasswordInput from './PasswordInput';

export interface ElWithErrorsProps extends React.ComponentPropsWithoutRef<'input'> {
  errors: undefined | null | Record<string, string[] | undefined | null>;
  label: ReactNode;
  labelClassName?: string;
}

export const ElWithErrors = ({
  errors,
  name,
  className,
  label,
  children,
  labelClassName,
  ...props
}: Omit<ElWithErrorsProps, 'children'> & {
  children: (props: React.ComponentPropsWithoutRef<'input'>) => ReactNode;
}) => {
  const currentErrors = errors && name && name in errors ? errors[name] : null;
  const id = name ? `input-${name}` : undefined;
  // className="flex w-full rounded-md pr-2 border border-input bg-transparent duration-200 ease-in shadow-sm focus-within:outline-none outline-none focus-within:ring-1 focus-within:ring-primary"
  const child = useMemo(() => {
    return children({
      ...props,
      name,
      className: cn(
        'flex w-full rounded-md pr-2 border border-input bg-transparent duration-200 ease-in shadow-sm focus-visible:outline-none outline-none focus-visible:ring-1 focus-visible:ring-primary',
        className,
        currentErrors?.length && 'border-destructive',
      ),
      'aria-invalid': !!currentErrors?.length,
      'aria-errormessage': id,
    });
  }, [children, className, currentErrors?.length, id, name, props]);

  return (
    <Label htmlFor={id} className=" gap-y-1 flex flex-col text-slate-900 dark:text-white focus:text-primary">
      <span className={cn(' font-normal text-inherit', labelClassName)}>{label}</span>
      {child}
      <span id={id} aria-live="assertive">
        {currentErrors?.map((error) => (
          <span key={error} className="ml-1 text-xs leading-none text-destructive">
            {error}
          </span>
        ))}
      </span>
    </Label>
  );
};

export const InputWithErrors = (props: ElWithErrorsProps) => {
  return <ElWithErrors {...props}>{(innerProps) => <Input {...innerProps} />}</ElWithErrors>;
};

export const PasswordInputWithErrors = (props: ElWithErrorsProps) => {
  return <ElWithErrors {...props}>{(innerProps) => <PasswordInput {...innerProps} />}</ElWithErrors>;
};
