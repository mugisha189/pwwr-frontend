import { AutoGrid } from '@/components/core/grid';
import StatCard from '@/components/core/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ArrowRight, BookCopy, BookMarked, CheckCircle, Clock, FileWarning, GraduationCap, XCircle } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export const Route = createLazyFileRoute('/_authenticated/dashboard/')({
  component: Dashboard,
});

const performanceData = [
  { name: 'Completed', value: 65, color: '#3b82f6', icon: CheckCircle },
  { name: 'Pending', value: 15, color: '#facc15', icon: Clock },
  { name: 'Absent', value: 1, color: '#ef4444', icon: XCircle },
  { name: 'Unreported', value: 12, color: '#9ca3af', icon: FileWarning },
];

const activities = [
  {
    id: 1,
    description: 'Chop, dice, julienne, brunoise different vegetables.',
  },
  { id: 2, description: 'Clean and portion meat or fish.' },
  { id: 3, description: "Measure ingredients for the day's recipes." },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <AutoGrid className="gap-6 w-full lg:!auto-grid-lg xl:!auto-grid-md">
        <StatCard
          title="Attended Trainings"
          value={10}
          description="Current training end in june"
          icon={<BookCopy className="size-4" />}
        />
        <StatCard
          title="Approved Logbooks"
          value={10}
          description="Total Approved Logbooks"
          icon={<BookMarked className="size-4" />}
        />
        <StatCard
          title="Complaints"
          value={10}
          description="Will be completed in June"
          icon={<FileWarning className="size-4" />}
        />
        <StatCard title="Courses" value={10} description="Total course enrolled in" icon={<BookCopy className="size-4" />} />
      </AutoGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Training Performance analytics</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {performanceData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="p-2 rounded-full mr-4" style={{ backgroundColor: `${item.color}20` }}>
                    <item.icon className="w-5 h-5" color={item.color} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Comment added</p>
                  </div>
                  <p className="font-bold text-lg">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="relative h-70">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={110}
                    outerRadius={140}
                    dataKey="value"
                    paddingAngle={5}
                    cornerRadius={8}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">120 days</p>
                <p className="text-muted-foreground">Remaining days for training to end</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>To day's Activities</CardTitle>
            <p className="text-sm text-muted-foreground">Week 2</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground font-semibold">#{index + 1}</span>
                    <p>{activity.description}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current industrial Training</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold text-lg">Sina Gerard Nyirangarama</h3>
            <p className="text-muted-foreground">Kigali - Ruhengeri Rd, ruhengeri</p>
            <div className="mt-4 pt-4 border-t">
              <p className="text-muted-foreground">Training Time frame</p>
              <p className="font-semibold">12 May 2025 - 27 July 2024</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current class Enrolled</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className="p-4 bg-blue-100 rounded-lg">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">Level 2</p>
              <p className="text-muted-foreground">Culinary Art</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">2024 - 2025</p>
              <p className="text-muted-foreground">Academic Year</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
