import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createLazyFileRoute } from '@tanstack/react-router';
import { AlertCircle, BookOpen, CheckCircle, FileText } from 'lucide-react';
import React from 'react';

const notifications = [
  {
    type: 'placement',
    title: 'New Placement',
    subtitle: 'Sina Gerard Nyirangarama ltd',
    time: '2 hours ago',
    tab: 'All',
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    type: 'logbook-success',
    title: 'Logbook submission successful',
    subtitle: 'Submission done successfully',
    time: '4 days ago',
    tab: 'Logbook',
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
  {
    type: 'certificate',
    title: 'Certificate Approved',
    subtitle: 'Submission done successfully',
    time: '1 week ago',
    tab: 'Certificates & Report',
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
  },
  {
    type: 'complaint',
    title: 'Complaint',
    subtitle: 'Complaint sent successful',
    time: '8 days ago',
    tab: 'Complaints',
    icon: <AlertCircle className="w-6 h-6 text-primary" />,
  },
  {
    type: 'logbook-fail',
    title: 'Logbook submission failed',
    subtitle: 'Submission Failed',
    time: '2 months ago',
    tab: 'Logbook',
    icon: <FileText className="w-6 h-6 text-destructive" />,
  },
];

const tabList = [
  { key: 'All', label: 'All' },
  { key: 'Logbook', label: 'Logbook' },
  { key: 'Certificates & Report', label: 'Certificates & Report' },
  { key: 'Complaints', label: 'Complaints' },
];

export const Route = createLazyFileRoute('/_authenticated/dashboard/notifications')({
  component: RouteComponent,
});

function RouteComponent() {
  const [tab, setTab] = React.useState('All');
  const filtered = tab === 'All' ? notifications : notifications.filter((n) => n.tab === tab);
  return (
    <div className="flex flex-col py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          {tabList.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabList.map((t) => (
          <TabsContent key={t.key} value={t.key}>
            <div className="space-y-4">
              {filtered.map((n, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 bg-muted rounded-lg px-6 py-4 ${n.type === 'logbook-fail' ? 'border-l-4 border-destructive bg-red-50' : ''}`}
                >
                  <div>{n.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">{n.title}</div>
                    <div className="text-sm text-muted-foreground">{n.subtitle}</div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap mr-4">{n.time}</div>
                  <a href="#" className="text-primary font-medium text-sm flex items-center gap-1 hover:underline">
                    View <span className="material-icons text-base">arrow_forward</span>
                  </a>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
