import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/dashboard/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col py-8 bg-card rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-10">Settings</h1>
      {/* Appearance & Language */}
      <div className="mb-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold">Apperance</div>
              <div className="text-muted-foreground text-sm">Customize how PWWR System looks on your device</div>
            </div>
            <Select defaultValue="light">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Language</div>
            <div className="text-muted-foreground text-sm">Change the language used in the user interface.</div>
          </div>
          <Select defaultValue="en">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      {/* Security */}
      <div>
        <h2 className="text-xl font-semibold mb-8">Security</h2>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="font-semibold">Email Address</div>
            <div className="text-muted-foreground text-sm">mucunguzithierry@8.minaffet.gov.rw</div>
          </div>
          <Button variant="link" className="text-primary text-sm font-medium px-0">
            Change Email <span className="material-icons text-base align-middle ml-1">arrow_forward</span>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Passwrd</div>
            <div className="text-muted-foreground text-sm">Set a permanent password to login to your account.</div>
          </div>
          <Button variant="link" className="text-primary text-sm font-medium px-0">
            Change password <span className="material-icons text-base align-middle ml-1">arrow_forward</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
