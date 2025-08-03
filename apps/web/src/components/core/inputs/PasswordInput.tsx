import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState, type ComponentPropsWithRef } from 'react';

const PasswordInput = (props: ComponentPropsWithRef<'input'>) => {
  const [showPassword, setShowPassword] = useState(false);
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        'flex w-full rounded-md pr-2 border border-input bg-transparent duration-200 ease-in shadow-sm focus-within:outline-none outline-none',
        'ring-ring/10 focus-within:border-primary dark:ring-ring/20 focus-within:ring-4 dark:aria-invalid:focus-within:ring-4 focus-within:outline-1 aria-invalid:focus-within:ring-[3px] aria-invalid:focus-within:outline-none',
      )}
    >
      <Input
        {...rest}
        className={cn(
          className,
          'border-none focus-visible:outline-none aria-invalid:focus-visible:ring-0 aria-invalid:focus-visible:outline- ar focus-visible:ring-0 shadow-none focus-visible:border-none rounded-r-none',
        )}
        type={showPassword ? 'text' : 'password'}
      />
      <button type="button" className=" text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <Eye className="w-5" /> : <EyeOff className="w-5" />}
      </button>
    </div>
  );
};

export default PasswordInput;
