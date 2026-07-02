"use client";

import DashboardStats from "@/features/dashboard/components/DashboardStats/DashboardStats";
import RecentOrders from "@/features/dashboard/components/RecentOrders/RecentOrders";
import ActiveRentals from "@/features/dashboard/components/ActiveRentals/ActiveRentals";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentOrders />

        <ActiveRentals />

      </div>

    </div>
  );
}