import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const LoadingFallback = ({ message = 'Loading...', className }: { message?: string; className?: string }) => {
  return (
    <div className={cn('flex flex-1 h-screen w-full justify-center items-center', className)}>
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LoadingFallback;
