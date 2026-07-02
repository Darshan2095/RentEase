"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
}

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: Props) {
  if (!order) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">

        <DialogHeader>
          <DialogTitle>
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* Order Info */}

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <h3 className="mb-2 font-semibold">
                Order Information
              </h3>

              <div className="space-y-2 text-sm">

                <p>
                  <strong>Order ID:</strong>{" "}
                  #{order._id}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <Badge>
                    {order.orderStatus}
                  </Badge>
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentStatus}
                </p>

                <p>
                  <strong>Method:</strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>

            <div>

              <h3 className="mb-2 font-semibold">
                Customer
              </h3>

              <div className="space-y-2 text-sm">

                <p>
                  <strong>Name:</strong>{" "}
                  {order.user?.fullName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.user?.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.user?.phone}
                </p>

              </div>

            </div>

          </div>

          <Separator />

          {/* Address */}

          <div>

            <h3 className="mb-2 font-semibold">
              Delivery Address
            </h3>

            <div className="space-y-1 text-sm">

              <p>{order.address?.fullName}</p>

              <p>{order.address?.phone}</p>

              <p>{order.address?.address}</p>

              <p>
                {order.address?.city},{" "}
                {order.address?.state}
              </p>

              <p>{order.address?.pincode}</p>

            </div>

          </div>

          <Separator />

          {/* Products */}

          <div>

            <h3 className="mb-4 font-semibold">
              Ordered Products
            </h3>

            <div className="space-y-4">

              {order.items?.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >

                    <div>

                      <p className="font-medium">
                        {item.productName ||
                          item.product?.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Quantity : {item.quantity}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Tenure :{" "}
                        {item.rentalTenure} Month(s)
                      </p>

                    </div>

                    <div className="text-right">

                      <p>
                        ₹{item.monthlyRent}/month
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Deposit ₹
                        {item.securityDeposit}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          <Separator />

          {/* Bill Summary */}

          <div>

            <h3 className="mb-3 font-semibold">
              Payment Summary
            </h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">

                <span>Subtotal</span>

                <span>
                  ₹{order.subtotal}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Security Deposit
                </span>

                <span>
                  ₹{order.securityDeposit}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Delivery Charge
                </span>

                <span>
                  ₹
                  {order.deliveryCharge ??
                    0}
                </span>

              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">

                <span>Total</span>

                <span>
                  ₹{order.total}
                </span>

              </div>

            </div>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}