"use client";

import { useState } from "react";
import { Eye, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { useRentals } from "../../hooks/useRentals";

import RentalStatusBadge from "../RentalStatusBadge/RentalStatusBadge";
import RentalDetailsDialog from "../RentalDetailsDialog/RentalDetailsDialog";
import ReturnRentalDialog from "../ReturnRentalDialog/ReturnRentalDialog";

interface Props {
  page: number;
  search: string;
  status: string;
  onPageChange: (page: number) => void;
}

export default function RentalTable({
  page,
  search,
  status,
  onPageChange,
}: Props) {
  const { data, isLoading } = useRentals({
    page,
    limit: 10,
    search,
    status: status === "all" ? "" : status,
  });

  const rentals = data?.data ?? [];
  const pagination = data?.pagination;

  const [selectedRental, setSelectedRental] =
    useState<any>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [returnOpen, setReturnOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading rentals...
      </div>
    );
  }

  return (
    <>

      <div className="rounded-lg border">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Product</TableHead>

              <TableHead>Customer</TableHead>

              <TableHead>Rent</TableHead>

              <TableHead>Tenure</TableHead>

              <TableHead>End Date</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {rentals.length === 0 && (
              <TableRow>

                <TableCell
                  colSpan={7}
                  className="py-10 text-center"
                >
                  No rentals found.
                </TableCell>

              </TableRow>
            )}

            {rentals.map((rental: any) => (

              <TableRow key={rental._id}>

                <TableCell>
                  {rental.product?.name}
                </TableCell>

                <TableCell>
                  {rental.user?.fullName}
                </TableCell>

                <TableCell>
                  ₹{rental.monthlyRent}
                </TableCell>

                <TableCell>
                  {rental.rentalTenure} Months
                </TableCell>

                <TableCell>
                  {new Date(
                    rental.endDate
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>

                  <RentalStatusBadge
                    status={rental.status}
                  />

                </TableCell>

                <TableCell>

                  <div className="flex justify-end gap-2">

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelectedRental(rental);
                        setDetailsOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelectedRental(rental);
                        setReturnOpen(true);
                      }}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>

                  </div>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {pagination?.page ?? 1} of{" "}
          {pagination?.totalPages ?? 1}
        </span>

        <Button
          variant="outline"
          disabled={
            page >=
            (pagination?.totalPages ?? 1)
          }
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
        </Button>

      </div>

      <RentalDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        rental={selectedRental}
      />

      <ReturnRentalDialog
        open={returnOpen}
        onOpenChange={setReturnOpen}
        rental={selectedRental}
      />

    </>
  );
}