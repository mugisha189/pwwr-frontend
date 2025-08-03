import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/verify-account')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-sm w-full mx-auto text-center flex flex-col justify-center h-full">
      <div className="flex justify-center items-center space-y-2 mt-4 mb-2">
        <img src="/logortb.jpg" alt="RTB Rwanda TVET Board" className="w-20 mb-2" />
        <h1 className="text-2xl font-bold tracking-tight text-center">
          PWWR<span className="text-primary">SYSTEM</span>
        </h1>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Enter verification Code</h1>
        <p className="text-muted-foreground">
          We have sent a verification code to i...d@gmail.com Please enter the code to verify your account and continue.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <InputOTP maxLength={6}>
          <InputOTPGroup className="w-full justify-center">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full">Verify account</Button>
        <p className="text-sm">
          Didn't receive code? <button className="text-primary font-semibold hover:underline">Resend Code</button>
        </p>
      </div>
    </div>
  );
}
