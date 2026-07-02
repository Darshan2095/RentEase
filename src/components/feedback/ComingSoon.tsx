import { Clock } from "lucide-react";

interface ComingSoonProps {
  feature?: string;
}

export default function ComingSoon({ feature = "This feature" }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <Clock className="h-12 w-12 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Coming Soon</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {feature} is under development and will be available shortly.
      </p>
    </div>
  );
}
