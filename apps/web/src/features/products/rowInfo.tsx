import { Badge } from '@/components/ui/badge';

export const RowInfo = ({
  label,
  value,
  isStatus = false,
  variant,
}: {
  label: string;
  value: string;
  isStatus?: boolean;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
      <span className="text-sm font-medium text-gray-600 min-w-0 flex-shrink-0">{label}</span>
      <div className="text-sm text-gray-900 text-right ml-4">{isStatus ? <Badge variant={variant}>{value}</Badge> : value}</div>
    </div>
  );
};
