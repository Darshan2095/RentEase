"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { useUpdateOrderStatus } from "../../hooks/useUpdateOrderStatus";

export default function UpdateOrderStatusDialog({
  open,
  onOpenChange,
  order,
}: any) {
  const [status, setStatus] = useState(
    order?.orderStatus
  );

  const mutation =
    useUpdateOrderStatus();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Update Order Status
          </DialogTitle>

        </DialogHeader>

        <Select
          value={status}
          onValueChange={setStatus}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="PLACED">
              Placed
            </SelectItem>

            <SelectItem value="CONFIRMED">
              Confirmed
            </SelectItem>

            <SelectItem value="SHIPPED">
              Shipped
            </SelectItem>

            <SelectItem value="DELIVERED">
              Delivered
            </SelectItem>

            <SelectItem value="RETURNED">
              Returned
            </SelectItem>

            <SelectItem value="CANCELLED">
              Cancelled
            </SelectItem>

          </SelectContent>

        </Select>

        <Button
          className="w-full"
          onClick={() =>
            mutation.mutate(
              {
                id: order._id,
                status,
              },
              {
                onSuccess: () =>
                  onOpenChange(false),
              }
            )
          }
        >
          Update Status
        </Button>

      </DialogContent>
    </Dialog>
  );
}