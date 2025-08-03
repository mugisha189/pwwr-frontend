import PasswordInput from '@/components/core/inputs/PasswordInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const search = Route.useSearch() as Record<string, any>;
  const [isPending, startTransition] = React.useTransition();
  const login = useLogin();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        await login.mutateAsync(data);
        const isSamePage = window.location.pathname === search.redirect;
        window.location.href = !isSamePage && search.redirect ? search.redirect : '/dashboard';
      } catch (err: any) {
        toast.error(err?.message || 'Login failed');
      }
    });
  }

  return (
    <div className="flex text-center flex-col max-w-md w-full space-y-6">
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-center">Login</h1>
        <p className="text-sm text-muted-foreground">Enter your email and password to login</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Enter your email" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center">
            <Link to="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" variant="secondary" className="w-full mt-2" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </form>
      </Form>
      <div className="text-sm text-center text-muted-foreground">
        Don’t have an account?{' '}
        <Link to="/auth/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
