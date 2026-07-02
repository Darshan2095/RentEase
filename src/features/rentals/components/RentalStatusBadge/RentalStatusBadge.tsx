"use client";

import { Badge } from "@/components/ui/badge";
import {
  Clock3,
  CheckCircle2,
  RefreshCcw,
  RotateCcw,
  Ban,
} from "lucide-react";

interface Props {
  status:
    | "UPCOMING"
    | "ACTIVE"
    | "EXTENDED"
    | "RETURN_REQUESTED"
    | "RETURNED"
    | "CANCELLED";
}

const STATUS_CONFIG = {
  UPCOMING: {
    label: "Upcoming",
    variant: "secondary" as const,
    icon: Clock3,
  },

  ACTIVE: {
    label: "Active",
    variant: "default" as const,
    icon: CheckCircle2,
  },

  EXTENDED: {
    label: "Extended",
    variant: "outline" as const,
    icon: RefreshCcw,
  },

  RETURN_REQUESTED: {
    label: "Return Requested",
    variant: "secondary" as const,
    icon: RotateCcw,
  },

  RETURNED: {
    label: "Returned",
    variant: "secondary" as const,
    icon: CheckCircle2,
  },

  CANCELLED: {
    label: "Cancelled",
    variant: "destructive" as const,
    icon: Ban,
  },
};

export default function RentalStatusBadge({
  status,
}: Props) {
  const config =
    STATUS_CONFIG[status] ??
    STATUS_CONFIG.UPCOMING;

  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className="flex w-fit items-center gap-1"
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}