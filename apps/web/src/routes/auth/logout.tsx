import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const Route = createFileRoute('/auth/logout')({
  component: RouteComponent,
  //   loader: async () => {
  //     Cookies.remove("token");
  //     return redirect({ to: "/auth/login" });
  //   },
});

function RouteComponent() {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove('token');
    router.navigate({ to: '/auth/login' });
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Logging out...</h1>
        <p className="text-sm text-gray-500">You will be redirected to the login page in a few seconds.</p>
      </div>
    </div>
  );
}
