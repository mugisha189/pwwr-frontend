import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, Search } from "lucide-react";

interface StateDisplayProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const StateDisplay = ({
  icon: Icon = Search,
  title,
  description,
  className,
}: StateDisplayProps) => {
  return (
    <Card className={cn("flex items-center justify-center p-10", className)}>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="bg-gray-100 p-3 rounded-full">
          <Icon className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground max-w-md">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
