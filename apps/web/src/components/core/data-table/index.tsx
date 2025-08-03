import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import TablePagination from './pagination/table-pagination';
import TableSkeleton from './TableSkeleton';

export interface DataTableProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  onCellClick?: (row: TData) => void;
  showCheckbox?: boolean;
  noDataMessage?: React.ReactNode;
  showPagination?: boolean;
  onSearchChange?: OnChangeFn<string>;
  search?: string;
  loading?: boolean;
  numbering?: boolean;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  pagination?: PaginationState;
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  onCellClick,
  showCheckbox = false,
  className,
  noDataMessage,
  onSearchChange,
  search,
  showPagination = true,
  pagination: _pagination,
  onPaginationChange,
  loading,
  numbering = false,
  columnFilters,
  onColumnFiltersChange,
  pageCount,
  sorting,
  onSortingChange,
  ...rest
}: Readonly<DataTableProps<TData, TValue>>) {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>(_pagination ?? { pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: showPagination ? (onPaginationChange ?? setPagination) : undefined,
    onSortingChange: onSortingChange,
    onColumnFiltersChange: onColumnFiltersChange,
    onGlobalFilterChange: onSearchChange,
    ...(pageCount ? { pageCount } : {}),
    state: {
      pagination: showPagination ? (_pagination ?? pagination) : undefined,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: search,
    },
    manualPagination: !!onPaginationChange,
  });

  const numbersToShow = ['1', '3', '5', '10', '20', '50', '100', '200', '500', '1000', 'All'];
  const noData = !table.getRowModel().rows?.length || data.length === 0;

  if (loading) {
    return <TableSkeleton columns={columns.length} />;
  }

  return (
    <div className={cn('bg-card w-full ', className)} {...rest}>
      <div className="border-0 rounded-lg w-full flex flex-col overflow-hidden">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-300/20 bg-surface dark:border-gray-700/20">
                {showCheckbox && (
                  <TableHead className="text-black text-base py-3 dark:text-white">
                    <Checkbox
                      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                {numbering && (
                  <TableHead className="text-black text-base py-3 dark:text-white">
                    <span className="text-sm">#</span>
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-black capitalize py-3 text-base dark:text-white">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                // get index with pagination
                const index = row.index + 1 + table.getState().pagination.pageIndex * table.getState().pagination.pageSize;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => onCellClick && onCellClick(row.original)}
                    className="cursor-pointer text-gray-500 dark:text-gray-300 font-medium border-gray-300/20 dark:border-gray-700/20"
                  >
                    {showCheckbox && (
                      <TableCell className="text-black p-2 text-base dark:text-white">
                        <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={(value) => row.toggleSelected(!!value)}
                          aria-label="Select row"
                        />
                      </TableCell>
                    )}
                    {numbering && (
                      <TableCell className="text-black p-2 text-base dark:text-white">
                        <span className="text-sm">{onPaginationChange ? index : row.index + 1}.</span>
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="text-sm p-2 whitespace-pre-wrap" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (showCheckbox ? 1 : 0)} className="h-24 text-center">
                  {noDataMessage ?? 'No Data.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="w-full mt-6 flex gap-2 justify-between">
          <div className="w-full">
            <p>
              Showing Result ({table.getState().pagination.pageIndex + 1} out of {table.getPageCount()})
            </p>
          </div>
          <div className="w-fit">
            <TablePagination
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
              showPreviousNext
            />
          </div>
          {/* {!noData && (
                 <div className="flex items-center gap-2">
                    <div className="text-gray-500 text-sm">Show:</div>
                    <Select value={pagination.pageSize.toString()} onValueChange={(value) => table.setPageSize(Number(value))}>
                       <SelectTrigger className="font-light w-fit text-gray-500 bg-card focus:ring-primary">
                          <SelectValue placeholder="Show" />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectGroup>
                             {numbersToShow.map((number) => (
                                <SelectItem key={number} value={number}>
                                   {number}
                                </SelectItem>
                             ))}
                          </SelectGroup>
                       </SelectContent>
                    </Select>
                 </div>
              )} */}
        </div>
      )}
    </div>
  );
}
