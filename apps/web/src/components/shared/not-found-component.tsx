import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function NotFound({ className }: { className?: string }) {
  return (
    // <html lang={routing.defaultLocale} suppressHydrationWarning suppressContentEditableWarning>
    //   <body>
    <div className={cn('flex flex-col items-center justify-center min-h-screen bg-background px-4', className)}>
      <div className="text-center space-y-5">
        <Search className="w-20 h-20 text-muted-foreground mx-auto" />
        <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Oops! The page you&apos;re looking for doesn&lsquo;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:info@ohereza.rw">Contact support</a>
          </Button>
        </div>
      </div>
    </div>
    //   </body>
    // </html>
  );
}
