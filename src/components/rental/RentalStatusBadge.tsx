import { Badge } from "@/components/ui/badge";

type RentalStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "overdue";

interface RentalStatusBadgeProps {
  status: RentalStatus;
}

const statusConfig: Record<RentalStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending", variant: "secondary" },
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  overdue: { label: "Overdue", variant: "destructive" },
};

export default function RentalStatusBadge({ status }: RentalStatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, variant: "secondary" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
