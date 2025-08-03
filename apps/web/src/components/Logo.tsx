import { cn } from '@/lib/utils';
import Image from './core/Image';

const Logo = ({
  className,
  iconClassName,
  textClassName,
}: {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}) => {
  return (
    <div className={cn('flex items-center gap-2 text-lg', className)}>
      <div className="p-1 rounded-lg bg-black">
        <Image src="/logo.svg" alt="logo" width={30} height={30} className={iconClassName} />
      </div>
      <h1 className={cn(' font-bold font-lato flex flex-col', textClassName)}>Moz-Land</h1>
    </div>
  );
};

export default Logo;
