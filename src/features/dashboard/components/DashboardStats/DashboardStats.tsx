"use client";

import { Card } from "@/components/ui/card";

const stats = [
  {
    title: "Active Rentals",
    value: 4,
  },
  {
    title: "Orders",
    value: 12,
  },
  {
    title: "Wishlist",
    value: 7,
  },
  {
    title: "Monthly Spend",
    value: "₹8,499",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="p-6"
        >
          <p className="text-sm text-muted-foreground">
            {stat.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {stat.value}
          </h2>
        </Card>
      ))}

    </div>
  );
}