import { Card } from '@/components/ui/card';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

const slides = [
  {
    image: '/images/culinary.png',
    quote:
      'I was able to enroll, track my assessments, and get placement updates easily. It helped me stay on top of my training',
    author: 'Student',
    role: 'General overview',
  },
  {
    image: '/images/contruct-train.png',
    quote:
      'We used to rely on scattered data and manual follow-ups. Now, the system gives us one place to monitor performance and make smart decisions.',
    author: 'RTB Staff',
    role: 'General Overview',
  },
  {
    image: '/images/construct-2.png',
    quote:
      "The system has revolutionized how we manage student placements and track progress. It's an indispensable tool for modern vocational training.",
    author: 'Employer',
    role: 'Partner Company',
  },
];

function RouteComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel */}
      <div className="bg-[#1a1a1a] text-white p-10 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">PP</div>
          <span className="text-lg font-medium">PPWRify</span>
        </div>

        <div className="text-center mt-auto mb-auto space-y-6">
          <div className="flex justify-center">
            <svg
              className="w-14 h-14 text-purple-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-gray-400">Enter your credentials to access your account</p>
        </div>
      </div>

      {/* Right Panel with Outlet */}
      <div className="flex items-center justify-center p-6 md:p-20 bg-white">
        <Card className="w-full max-w-md p-8 shadow-none border-none">
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
