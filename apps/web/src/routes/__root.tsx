import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Providers from '@/providers';

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <TanStackRouterDevtools />
    </Providers>
  ),
});
