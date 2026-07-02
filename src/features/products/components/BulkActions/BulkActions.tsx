"use client";

import { Button } from "@/components/ui/button";
import {
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Props {
  count: number;
  onDelete: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function BulkActions({
  count,
  onDelete,
  onActivate,
  onDeactivate,
}: Props) {
  if (!count) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">

      <p className="font-medium">
        {count} product(s) selected
      </p>

      <div className="flex gap-3">

        <Button
          variant="outline"
          onClick={onActivate}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Activate
        </Button>

        <Button
          variant="outline"
          onClick={onDeactivate}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Deactivate
        </Button>

        <Button
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>

      </div>

    </div>
  );
}