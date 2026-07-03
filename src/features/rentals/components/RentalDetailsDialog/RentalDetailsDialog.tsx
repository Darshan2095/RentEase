"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

import RentalStatusBadge from "../RentalStatusBadge/RentalStatusBadge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: any;
}

export default function RentalDetailsDialog({
  open,
  onOpenChange,
  rental,
}: Props) {
  const [now] = useState(() => Date.now());

  if (!rental) return null;

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(rental.endDate).getTime() - now) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">

        <DialogHeader>
          <DialogTitle>
            Rental Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* Header */}

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                {rental.product?.name}
              </h2>

              <p className="text-sm text-muted-foreground">
                Rental ID : {rental._id}
              </p>

            </div>

            <RentalStatusBadge
              status={rental.status}
            />

          </div>

          <Separator />

          {/* Customer */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Customer Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {rental.user?.fullName}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p>{rental.user?.email}</p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Phone
                </p>

                <p>{rental.user?.phone}</p>

              </div>

            </div>

          </div>

          <Separator />

          {/* Product */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Product
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-muted-foreground">
                  Product Name
                </p>

                <p>{rental.product?.name}</p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Quantity
                </p>

                <p>{rental.quantity}</p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Monthly Rent
                </p>

                <p>₹{rental.monthlyRent}</p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Security Deposit
                </p>

                <p>₹{rental.securityDeposit}</p>

              </div>

            </div>

          </div>

          <Separator />

          {/* Timeline */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Rental Timeline
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-muted-foreground">
                  Start Date
                </p>

                <p>
                  {new Date(
                    rental.startDate
                  ).toLocaleDateString()}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  End Date
                </p>

                <p>
                  {new Date(
                    rental.endDate
                  ).toLocaleDateString()}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Rental Tenure
                </p>

                <p>
                  {rental.rentalTenure} Month(s)
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Remaining
                </p>

                    <p>{remainingDays} Days</p>

              </div>

            </div>

          </div>

          <Separator />

          {/* Extension */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Extensions
            </h3>

            <p>
              {rental.extensionCount} Extension(s)
            </p>

          </div>

          <Separator />

          {/* Damage */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Damage Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <p className="text-sm text-muted-foreground">
                  Damage Status
                </p>

                <p>
                  {rental.damageStatus}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Damage Charges
                </p>

                <p>
                  ₹{rental.damageCharges}
                </p>

              </div>

            </div>

          </div>

          <Separator />

          {/* Maintenance */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Maintenance
            </h3>

            <p>
              {rental.maintenanceRequired
                ? "Maintenance Required"
                : "No Maintenance Required"}
            </p>

          </div>

          <Separator />

          {/* Notes */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Notes
            </h3>

            <p className="text-muted-foreground">
              {rental.notes || "No notes available."}
            </p>

          </div>

          {rental.actualReturnDate && (
            <>
              <Separator />

              <div>

                <h3 className="mb-3 text-lg font-semibold">
                  Returned On
                </h3>

                <p>
                  {new Date(
                    rental.actualReturnDate
                  ).toLocaleString()}
                </p>

              </div>
            </>
          )}

        </div>

      </DialogContent>
    </Dialog>
  );
}