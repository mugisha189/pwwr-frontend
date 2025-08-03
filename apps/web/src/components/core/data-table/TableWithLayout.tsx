import React, { Suspense, useMemo } from 'react';
import { RefreshCcw } from 'lucide-react';
import { type DataTableProps } from '.';
import TableSkeleton from './TableSkeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ColumnFiltersState, OnChangeFn, SortingState } from '@tanstack/react-table';

const DataTable = React.lazy(() =>
  import('@/components/core/data-table').then((module) => ({
    default: module.DataTable,
  })),
);

interface TableWithLayoutProps<TData, TValue> extends Omit<DataTableProps<TData, TValue>, 'data' | 'title'> {
  tableData: TData[] | null | undefined;
  loading?: boolean;
  refetch?: () => void;
  title?: React.ReactNode;
  headerShown?: boolean;
  isValidating?: boolean;
  headerRight?: React.ReactNode;
  headerClassName?: string;
  description?: React.ReactNode;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

const TableWithLayout = <TData, TValue>(props: TableWithLayoutProps<TData, TValue>) => {
  const {
    columns,
    loading,
    tableData,
    refetch,
    title,
    headerShown = true,
    isValidating,
    headerRight,
    headerClassName,
    description,
    columnFilters,
    onColumnFiltersChange,
    sorting,
    onSortingChange,
    ...rest
  } = props;
  const [lastData, setLastData] = React.useState<TData[]>([]);

  const data = useMemo(() => {
    const returnLast = isValidating && !Array.isArray(tableData);
    if (returnLast)
      return lastData?.sort((a: any, b: any) => {
        if (a.createdAt && b.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
    if (tableData) setLastData(tableData);
    return (
      tableData?.sort((a: any, b: any) => {
        if (a.createdAt && b.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      }) || []
    );
  }, [tableData, isValidating, lastData]);

  const DataTableWithTypes = DataTable as React.ComponentType<DataTableProps<TData, TValue>>;

  return (
    <div className="flex bg-card rounded-lg flex-col w-full p-3 gap-y-4">
      {headerShown && (
        <div className={cn('flex w-full justify-between sm:flex-row flex-col gap-2', headerClassName)}>
          <div className="flex flex-col">
            <h1 className="xl:text-2xl text-xl font-bold">{title}</h1>
            {description && <p className="text-sm">{description}</p>}
          </div>
          <div className="flex sm:items-center gap-2 sm:flex-row flex-col">
            {refetch && (
              <Button onClick={refetch} variant="outline" className="px-2">
                <RefreshCcw className={cn(`w-4 h-4 ${headerRight ? '' : 'mr-2'}`, (loading || isValidating) && 'animate-spin')} />
                {!headerRight && 'Refresh'}
              </Button>
            )}
            {headerRight}
          </div>
        </div>
      )}
      {/* {loading && <TableSkeleton columns={columns.length} />} */}
      {tableData && (
        <Suspense fallback={<TableSkeleton columns={columns.length} />}>
          <DataTableWithTypes
            columns={columns}
            data={data}
            columnFilters={columnFilters}
            onColumnFiltersChange={onColumnFiltersChange}
            sorting={sorting}
            loading={loading}
            onSortingChange={onSortingChange}
            {...rest}
          />
        </Suspense>
      )}
    </div>
  );
};

export default TableWithLayout;
