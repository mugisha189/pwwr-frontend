# PWWR system

PWWR system

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web`: react [vite](https://vitejs.dev) ts app
- `@repo/ui`: a stub component library shared by `web` application
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Core Stack

This project uses a modern, modular stack for building scalable web applications:

- **Routing:** [TanStack Router](https://tanstack.com/router/latest/docs/overview) for type-safe, file-based routing and layouts.
- **State Management:** [Jotai](https://jotai.org/) for simple, atomic global state management.
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) for efficient data fetching, caching, and server state synchronization. Use `useQuery`, `useMutation`, or the custom [`useGet`](apps/web/src/hooks/useGet.ts) hook for API calls.
- **Tables:** Custom, reusable DataTable component in [`src/components/core/data-table/`](apps/web/src/components/core/data-table/) for advanced table features (pagination, filtering, etc.).
- **UI:** [shadcn/ui](https://ui.shadcn.com/) component library and [Tailwind CSS](https://tailwindcss.com/) for rapid, consistent UI development. Only shadcn/ui is allowed for high-level components; use Tailwind utility classes for styling.

These tools are chosen for their flexibility, type safety, and strong community support, enabling fast development and easy maintenance.

## Project Structure

```plaintext
pwwr/
├── apps/
│   ├── mobile/         # React Native (Expo) mobile app
│   └── web/            # Main web app (React + Vite)
├── packages/
│   ├── eslint-config/  # Shared ESLint config
│   ├── typescript-config/ # Shared TS configs
│   └── ui/             # Shared UI components
├── package.json
└── ...
```

### apps/web Structure

```plaintext
apps/web/
├── public/             # Static assets (images, favicon, etc.)
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── core/       # Core high-level UI elements (buttons, inputs, etc.)
│   │   ├── shared/     # Shared layout or error components
│   │   ├── sidebar/    # Sidebar navigation components
│   │   └── ui/         # Primitive UI components (accordion, badge, etc.)
│   ├── features/       # Feature-specific modules (e.g., users)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities, types, API logic
│   │   ├── types/      # TypeScript types/interfaces
│   │   ├── utils/      # Utility functions
│   │   ├── services/   # Service modules for API calls, business logic, or external integrations (optional)
│   ├── providers/      # React context providers (Auth, Query, etc.)
│   ├── routes/         # App routes (file-based routing)
│   │   ├── __root.tsx                # Root layout: wraps the app with Providers and Devtools
│   │   ├── index.tsx                 # Redirects '/' to '/dashboard' we may change it later
│   │   ├── _authenticated.tsx        # Auth-protected layout, checks for token, provides AuthProvider
│   │   ├── _authenticated/
│   │   │   └── dashboard/
│   │   │       ├── index.lazy.tsx    # Dashboard main page (analytics, stats, etc.)
│   │   │       ├── route.tsx         # Dashboard layout: sidebar, header, and nested content
│   │   │       └── ........          # Other routes that will be needed using Tanstack ROuter
│   │   └── auth/
│   │       ├── forgot-password.tsx   # Forgot password page
│   │       ├── login.tsx             # Login page
│   │       ├── logout.tsx            # Logout logic
│   │       ├── route.tsx             # Auth layout (if any)
│   │       └── verify-account.tsx    # Account verification page
│   ├── store/          # State management (atoms, etc.)
│   ├── styles.css      # Global styles
│   └── main.tsx        # App entry point
├── package.json
└── ...
```

#### Routing & Layout Details

- **\_\_root.tsx**: Root of the app. Wraps everything in global Providers and includes TanStack Router Devtools. Uses `<Outlet />` to render child routes.
- **index.tsx**: Redirects the root path `/` to `/dashboard` using TanStack Router's `redirect`.
- **\_authenticated.tsx**: Protects all routes under `/_authenticated` by checking for a `token` cookie. If not authenticated, redirects to `/auth/login`. Wraps children in `<AuthProvider>`. Handles error and not-found states with shared components.
- **\_authenticated/dashboard/route.tsx**: Provides the main dashboard layout: wraps content in `<SidebarProvider>`, renders the sidebar (`<AppSidebar />`), header (`<DashboardHeader />`), and a content area for nested routes. Uses `<Suspense>` and a skeleton loader for async content. All dashboard pages (analytics, users, profile) are rendered inside this layout via `<Outlet />`.
- **\_authenticated/dashboard/index.lazy.tsx**: The main dashboard analytics/overview page.
- **\_authenticated/dashboard/users.lazy.tsx**: The users management page.
- **\_authenticated/dashboard/profile.lazy.tsx**: The user profile page.
- **auth/**: Contains all authentication-related routes (login, logout, forgot password, verify account). Each file is a page or logic for a specific auth flow.

### Notes

- **Add new features** under `src/features/`.
- **Reusable components** go in `src/components/core/` or `src/components/ui/`.
- **Utilities and types** belong in `src/lib/`.
- **Routes** are organized in `src/routes/` using file-based routing.
- **UI Library** that is allowed is only `shadcnui` if you need a high-level component that's not there try to search like in [Awesome Shadcnui](https://shadcn.batchtool.com/components) or communicate before doing so.
- **Jotai** is only global state manager cause it is not complex as we don't really need to store complex data globally in the app
- **Tanstack Query** is used for data fetching, caching, and synchronizing server state in the app. Use it for all API data that needs to be fetched, cached, or updated. Prefer using [Tanstack Query hooks](https://tanstack.com/query/latest/docs/framework/react/overview) (`useQuery`, `useMutation`, etc.) for all server communication instead of manual fetch or axios calls. Keep query logic in `src/lib/services/` or inside feature folders as appropriate or even use `useGet` hook for simplicity for GET calls (check `src/hooks/useGet.ts`)

## Styling Guidance

- **Theme colors and a few design tokens** (such as primary color, background, border radius) are defined in @styles.css. These are rarely changed and serve as the foundation for the app's look and feel.
- **Most styling should use Tailwind CSS classnames** for layout, spacing, typography, and visual styles. Use utility classes for rapid, consistent UI development.
- **Only reference CSS variables from styles.css** when you need to use or override a theme color or design token (e.g., for custom backgrounds or borders).
- **Do not hardcode colors or spacing** in components; use Tailwind classes or, if necessary, the variables from @styles.css.
- **Changing theme colors in styles.css is not common** and should be done with care, as it affects the entire app.
- Example usage in a component:
  ```jsx
  <div className="bg-primary text-background rounded-lg p-4">
    ...
  </div>
  // or, if you must use a CSS variable:
  <div style={{ color: 'var(--primary)' }} />
  ```
