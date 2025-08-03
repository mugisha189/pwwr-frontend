import PasswordInput from '@/components/core/inputs/PasswordInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-sm w-full mx-auto text-start flex flex-col justify-center h-full">
      <div className="flex justify-center items-center space-y-2 mt-4 mb-2">
        <img src="/logortb.jpg" alt="RTB Rwanda TVET Board" className="w-20 mb-2" />
        <h1 className="text-2xl font-bold tracking-tight text-center">
          PWWR<span className="text-primary">System</span>
        </h1>
      </div>
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground">Please create a strong password that you will easily remember.</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password*</Label>
          <PasswordInput id="password" placeholder="Create your password" />
          <p className="text-xs text-muted-foreground">Enter password containing capital Letter and max of 12 character</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm password*</Label>
          <PasswordInput id="confirm-password" placeholder="Re-enter new password" />
        </div>
        <Button type="submit" className="w-full">
          Reset credentials
        </Button>
      </form>
      <Button variant="link" asChild>
        <Link to="/auth/login" className="text-sm font-semibold mt-3 text-muted-foreground hover:underline">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to login
        </Link>
      </Button>
    </div>
  );
}
