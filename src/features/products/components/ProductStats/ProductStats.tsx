"use client";

import { Card } from "@/components/ui/card";
import { Package, Star, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductStats } from "../../hooks/useProductStats";

export default function ProductStats() {
  const { data, isLoading } = useProductStats();

  if (isLoading) return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="h-32 bg-slate-100" />
      ))}
    </div>
  );

  const stats = [
    { title: "Total Inventory", value: data.totalProducts, icon: Package, color: "text-blue-600" },
    { title: "Active Rentals", value: data.activeProducts, icon: CheckCircle, color: "text-emerald-600" },
    { title: "Featured Assets", value: data.featuredProducts, icon: Star, color: "text-amber-500" },
    { title: "Needs Attention", value: data.lowStockProducts, icon: AlertTriangle, color: "text-rose-600" },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="group relative overflow-hidden p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.title}
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                  {stat.value}
                </h2>
              </div>
              <div className={cn("rounded-xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100", stat.color)}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
            
            {/* Visual Indicator for "Needs Attention" */}
            {stat.title === "Needs Attention" && stat.value > 0 && (
              <div className="mt-4 flex items-center gap-1 text-xs text-rose-600 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>Restock recommended</span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}