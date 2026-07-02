"use client";

import { useState } from "react";
import {
  Eye,
  Pencil,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { useOrders } from "../../hooks/useOrders";

import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";
import OrderDetailsDialog from "../OrderDetailsDialog/OrderDetailsDialog";
import UpdateOrderStatusDialog from "../UpdateOrderStatusDialog/UpdateOrderStatusDialog";


interface Props {
  page: number;
  search: string;
  status: string;
  onPageChange: (page: number) => void;
}

export default function OrderTable({
  page,
  search,
  status,
  onPageChange,
}: Props) {
  const { data, isLoading } = useOrders({
    page,
    limit: 10,
    search,
    status,
  });

  const orders = data?.data ?? [];
  const pagination = data?.pagination;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [statusOpen, setStatusOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Order ID</TableHead>

              <TableHead>Customer</TableHead>

              <TableHead>Products</TableHead>

              <TableHead>Total</TableHead>

              <TableHead>Payment</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Created</TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {orders.length === 0 && (
              <TableRow>

                <TableCell
                  colSpan={8}
                  className="py-8 text-center"
                >
                  No orders found.
                </TableCell>

              </TableRow>
            )}

            {orders.map((order: any) => (
              <TableRow key={order._id}>

                <TableCell>
                  #{order._id.slice(-6)}
                </TableCell>

                <TableCell>

                  <div>
                    <p className="font-medium">
                      {order.user?.fullName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {order.user?.email}
                    </p>

                  </div>

                </TableCell>

                <TableCell>
                  {order.items.length} Item(s)
                </TableCell>

                <TableCell>
                  ₹{order.total}
                </TableCell>

                <TableCell>
                  {order.paymentStatus}
                </TableCell>

                <TableCell>

                  <OrderStatusBadge
                    status={order.orderStatus}
                  />

                </TableCell>

                <TableCell>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>

                  <div className="flex justify-end gap-2">

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setDetailsOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setStatusOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
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

      <OrderDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        order={selectedOrder}
      />

      <UpdateOrderStatusDialog
        open={statusOpen}
        onOpenChange={setStatusOpen}
        order={selectedOrder}
      />
    </>
  );
}