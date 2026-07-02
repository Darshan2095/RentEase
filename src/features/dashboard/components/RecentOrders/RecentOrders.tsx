"use client";

import { Card } from "@/components/ui/card";

export default function RecentOrders() {
  const orders = [
    {
      id: "#1001",
      total: "₹2,499",
      status: "Placed",
    },
    {
      id: "#1002",
      total: "₹1,999",
      status: "Delivered",
    },
  ];

  return (
    <Card className="p-6">

      <h2 className="mb-4 text-xl font-semibold">
        Recent Orders
      </h2>

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <span>{order.id}</span>

            <span>{order.total}</span>

            <span>{order.status}</span>
          </div>
        ))}

      </div>

    </Card>
  );
}