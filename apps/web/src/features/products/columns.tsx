'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link, useRouter } from '@tanstack/react-router';
import { Eye, FileText, MoreVertical, StopCircle } from 'lucide-react';
import { StudentTraining } from './type';

export const columns: ColumnDef<StudentTraining>[] = [
  {
    accessorKey: 'industryName',
    header: 'Industry Name',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.industryName}</div>
        <div className="text-muted-foreground">{row.original.industryLocation}</div>
      </div>
    ),
  },
  {
    accessorKey: 'trade',
    header: 'Trade',
  },
  {
    accessorKey: 'classLevel',
    header: 'Class Level',
  },
  {
    accessorKey: 'startDate',
    header: 'Training timeline',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.startDate} - {row.original.endDate}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = {
        completed: 'default',
        inProgress: 'success',
        dropped: 'destructive',
      }[status] as 'default' | 'success' | 'destructive';

      const dotColor = {
        completed: 'bg-primary',
        inProgress: 'bg-chart-4',
        dropped: 'bg-destructive',
      }[status];

      return (
        <Badge variant={variant} className="flex items-center gap-2 px-4 py-1">
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div className="flex items-center gap-2">
          <Link to={'/dashboard/training/$trainingId'} params={{ trainingId: row.original.id }}>
            <Eye className="h-5 w-5" />
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <Button variant="ghost" size="sm">
                <FileText className="h-5 w-5" />
                Add complaint
              </Button>
              <Button variant="ghost" size="sm">
                <StopCircle className="h-5 w-5" />
                stop training
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
