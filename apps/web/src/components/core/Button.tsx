import React, { ComponentProps } from 'react';
import { Button as RadixButton } from '../ui/button';
import { Loader2Icon } from 'lucide-react';

interface ButtonProps extends ComponentProps<typeof RadixButton> {
  loading?: boolean;
  loaderProps?: React.ComponentProps<typeof Loader2Icon>;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, loading, loaderProps, ...rest } = props;
  return (
    <RadixButton {...rest}>
      {loading ? <Loader2Icon size={20} className=" animate-spin" {...loaderProps} /> : children}
    </RadixButton>
  );
};

export default Button;
