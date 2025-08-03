import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '../icons';
import { Button } from '../ui/button';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card className="py-0 gap-2">
      <CardHeader className="pt-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="bg-primary/10 w-7 h-7 text-primary" size="icon">
            {icon}
          </Button>
          <CardTitle className="text-sm font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-0 !py-3 items-center">
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="ghost" className=" rounded-full w-7 h-7 bg-accent p-0" size="icon">
          <Icons.ArrowUpRight className="size-3 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  );
}
