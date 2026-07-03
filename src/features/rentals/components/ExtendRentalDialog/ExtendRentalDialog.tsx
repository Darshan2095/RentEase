"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2, CalendarClock } from "lucide-react";

import { useExtendRental } from "../../hooks/useExtendRental";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: any;
}

export default function ExtendRentalDialog({
  open,
  onOpenChange,
  rental,
}: Props) {
  const mutation = useExtendRental();

  const [months, setMonths] = useState("1");

  if (!rental) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setMonths("1");
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    mutation.mutate(
      {
        id: rental._id,
        months: Number(months),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  const currentEndDate = new Date(rental.endDate);

  const newEndDate = new Date(currentEndDate);
  newEndDate.setMonth(
    newEndDate.getMonth() + Number(months)
  );

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <DialogTitle>
            Extend Rental
          </DialogTitle>

          <DialogDescription>
            Extend the rental period for this
            product.
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-6">

          <div className="rounded-lg border p-4">

            <h3 className="font-semibold">
              {rental.product?.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {rental.user?.fullName}
            </p>

          </div>

          <div className="space-y-2">

            <Label>
              Extend By
            </Label>

            <Select
              value={months}
              onValueChange={setMonths}
            >
              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="1">
                  1 Month
                </SelectItem>

                <SelectItem value="3">
                  3 Months
                </SelectItem>

                <SelectItem value="6">
                  6 Months
                </SelectItem>

                <SelectItem value="12">
                  12 Months
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div className="rounded-lg bg-muted p-4 space-y-3">

            <div className="flex items-center gap-2">

              <CalendarClock className="h-5 w-5" />

              <span className="font-medium">
                Rental Summary
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span>Current End Date</span>

              <span>
                {currentEndDate.toLocaleDateString()}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span>New End Date</span>

              <span>
                {newEndDate.toLocaleDateString()}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span>Monthly Rent</span>

              <span>
                ₹{rental.monthlyRent}
              </span>

            </div>

            <div className="flex justify-between font-semibold">

              <span>Extra Rent</span>

              <span>
                ₹
                {Number(months) *
                  rental.monthlyRent}
              </span>

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={mutation.isPending}
            onClick={handleSubmit}
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Extend Rental
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}