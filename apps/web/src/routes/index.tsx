import { Link, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
  beforeLoad: ({ location }) => {
    throw redirect({
      to: '/dashboard',
      // search: {
      //    redirect: location.href,
      // } as Record<string, string>,
    });
  },
  //  }
});

function IndexPage() {
  return (
    <div className="p-2 flex gap-2">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    </div>
  );
}
