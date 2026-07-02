import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  count: string;
  icon: LucideIcon;
  href: string;
}

export default function CategoryCard({ name, count, icon: Icon, href }: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-md">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="p-4 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground">{count}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
