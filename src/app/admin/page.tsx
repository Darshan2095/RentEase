"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Package, ClipboardList, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl p-8 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">
          Welcome back. Here is the latest activity across your rental platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Active Rentals" value="48" icon={ClipboardList} color="text-emerald-600" />
        <StatsCard title="Total Products" value="1,248" icon={Package} color="text-indigo-600" />
        <StatsCard title="Pending Orders" value="12" icon={ShoppingCart} color="text-blue-600" />
        <StatsCard title="Monthly Revenue" value="$42.5k" icon={TrendingUp} color="text-amber-600" />
      </div>

      {/* Placeholder for future activity chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-sm text-slate-500">Analytics and recent system logs will appear here.</p>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
      </CardContent>
    </Card>
  );
}