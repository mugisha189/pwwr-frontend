import ErrorComponent from '@/components/shared/error-component';
import NotFound from '@/components/shared/not-found-component';
import { AuthProvider } from '@/providers/AuthProvider';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const token = Cookies.get('accessToken');
    // console.log("token", token);
    const redirectPath = location.pathname === '/auth/login' ? '/' : location.pathname;
    if (!token) {
      throw redirect({
        to: '/auth/login',
        search: { redirect: redirectPath },
      });
    }
  },
  errorComponent: ({ error, reset }) => <ErrorComponent error={error} reset={reset} />,
  notFoundComponent: () => <NotFound />,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
