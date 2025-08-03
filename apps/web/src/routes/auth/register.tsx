import PasswordInput from '@/components/core/inputs/PasswordInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
});

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const search = Route.useSearch() as Record<string, any>;
  const register = useRegister();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  function onSubmit(data: FormData) {
    register.mutate(data, {
      onSuccess: () => {
        const isSamePage = window.location.pathname === search.redirect;
        window.location.href = !isSamePage && search.redirect ? search.redirect : '/dashboard';
      },
    });
  }

  return (
    <div className="flex text-center flex-col max-w-md w-full space-y-6">
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-center">Register</h1>
        <p className="text-sm text-muted-foreground">Enter your details to create an account</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" disabled={register.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Enter your email" disabled={register.isPending} />
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
                  <PasswordInput placeholder="Enter your password" {...field} disabled={register.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="secondary" className="w-full mt-2" disabled={register.isPending}>
            {register.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
      <div className="text-sm text-center text-muted-foreground">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
