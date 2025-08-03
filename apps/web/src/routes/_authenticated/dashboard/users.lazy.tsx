import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import TableWithLayout from '@/components/core/data-table/TableWithLayout';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export const Route = createLazyFileRoute('/_authenticated/dashboard/users')({
  component: UsersPage,
});

const userGrowthData = [
  { name: 'Jan', 'Number of Users': 400 },
  { name: 'Feb', 'Number of Users': 450 },
  { name: 'Mar', 'Number of Users': 500 },
  { name: 'Apr', 'Number of Users': 480 },
  { name: 'May', 'Number of Users': 600 },
  { name: 'Jun', 'Number of Users': 550 },
  { name: 'Jul', 'Number of Users': 700 },
  { name: 'Aug', 'Number of Users': 680 },
  { name: 'Sep', 'Number of Users': 750 },
  { name: 'Oct', 'Number of Users': 800 },
  { name: 'Nov', 'Number of Users': 850 },
  { name: 'Dec', 'Number of Users': 900 },
];

const userDivisionData = [
  { name: 'Citizen Users', value: 70, color: '#3B82F6' },
  { name: 'Admin Users', value: 30, color: '#1E40AF' },
];

const mockUsersData = [
  {
    fullName: 'Ana Silva',
    email: 'ana.silva@gov.mz',
    phoneNumber: '+258 84 123 4567',
    role: 'Admin',
    status: 'Active',
    manage: true,
  },
  {
    fullName: 'Ana Silva',
    email: 'ana.silva@gov.mz',
    phoneNumber: '+258 84 123 4567',
    role: 'Admin',
    status: 'Active',
    manage: false,
  },
  {
    fullName: 'Ana Silva',
    email: 'ana.silva@gov.mz',
    phoneNumber: '+258 84 123 4567',
    role: 'Admin',
    status: 'Active',
    manage: true,
  },
];

type UserRow = (typeof mockUsersData)[number];

const usersColumns: ColumnDef<UserRow>[] = [
  { accessorKey: 'fullName', header: 'Full Names' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <Badge variant="default" className="bg-green-100 text-green-700 border-green-200 gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-green-700"></span> Active
      </Badge>
    ),
  },
  {
    accessorKey: 'manage',
    header: 'Manage',
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return (
        <div className="flex items-center gap-2">
          <span>Off</span>
          <Switch checked={isActive} />
          <span>On</span>
        </div>
      );
    },
  },
];

function FilterByRole() {
  return (
    <Button variant="outline" className="gap-2">
      Filter By Role <ChevronDown className="w-4 h-4" />
    </Button>
  );
}

function FilterByStatus() {
  return (
    <Button variant="outline" className="gap-2">
      Filter by Status <ChevronDown className="w-4 h-4" />
    </Button>
  );
}

function UsersPage() {
  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header and Add User Button */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
            <p className="text-gray-600 mt-1">This is the sub-text(description of the page)</p>
          </div>
          <Button className="bg-blue-600 text-white">Add User</Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex items-center justify-between">
          <Input placeholder="Search for Users" className="max-w-sm" />
          <div className="flex gap-2">
            <FilterByRole />
            <FilterByStatus />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Growth Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis
                      label={{
                        value: 'Number of Users',
                        angle: -90,
                        position: 'insideLeft',
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Number of Users" stroke="#3B82F6" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* System Users Division Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Users Division</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userDivisionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userDivisionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <TableWithLayout columns={usersColumns} tableData={mockUsersData} showPagination title={null} headerShown={false} />
      </div>
    </div>
  );
}

export default UsersPage;
