import { Icons } from '@/components/icons';
import React from 'react';

export type Route = {
  title: string;
  url: string;
  icon?: React.ElementType;
  isActive?: boolean;
  badge?: React.ReactNode;
};

export type RouteGroup = {
  icon?: React.ElementType;
  title: string;
  isActive?: boolean;
} & (
    | {
      routes: Route[];
      route?: never;
    }
    | {
      route: Route;
      routes?: never;
    }
  );

export type UserRoute = {
  links: RouteGroup[];
  role: string;
};

const routes: RouteGroup[] = [
  {
    title: 'Dashboard',
    icon: Icons.LayoutGrid,
    route: {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Icons.LayoutGrid,
    },
  },
  {
    title: 'Products',
    icon: Icons.Package,
    routes: [
      {
        title: 'Product Management',
        url: '/dashboard/products',
        icon: Icons.PackageSearch,
      },
      {
        title: 'Categories',
        url: '/dashboard/categories',
        icon: Icons.List,
      },
    ],
  },
];

export default routes;
