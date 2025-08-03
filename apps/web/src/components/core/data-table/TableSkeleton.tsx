import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export default function TableSkeleton({ columns = 4, rows = 5 }: Readonly<TableSkeletonProps>) {
  const generateSkeletonRow = (cellCount: number) => {
    return Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ));
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>{generateSkeletonRow(columns)}</TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>{generateSkeletonRow(columns)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
