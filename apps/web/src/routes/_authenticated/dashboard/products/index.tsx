import { DataTable } from '@/components/core/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { columns } from '@/features/products/columns';
import { studentTrainings } from '@/features/products/data';
import { createFileRoute } from '@tanstack/react-router';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_authenticated/dashboard/products/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-4">
      <Card className="border-0 shadow-none p-4">
        <CardHeader className="flex flex-row justify-between items-center pb-6 px-0">
          <h3 className="text-2xl font-medium">Training assigned</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search here...."
                name="query"
                className="w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="space-x-2">
              <Button size="lg" variant={'outline'}>
                <Filter className="h-5 w-5" />
                <span className="ml-2">Filter</span>
              </Button>
            </div>
          </div>
          <div className=" overflow-hidden">
            <DataTable columns={columns} data={studentTrainings} search={search} onSearchChange={setSearch} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
