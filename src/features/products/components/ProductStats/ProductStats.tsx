"use client";

import { Card } from "@/components/ui/card";
import { Package, Star, CheckCircle, AlertTriangle } from "lucide-react";

import { useProductStats } from "../../hooks/useProductStats";

export default function ProductStats() {
  const { data, isLoading } = useProductStats();

  if (isLoading) return null;

  const stats = [
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: Package,
    },
    {
      title: "Active",
      value: data.activeProducts,
      icon: CheckCircle,
    },
    {
      title: "Featured",
      value: data.featuredProducts,
      icon: Star,
    },
    {
      title: "Low Stock",
      value: data.lowStockProducts,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="flex items-center justify-between p-6"
          >
            <div>
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {stat.value}
              </h2>
            </div>

            <Icon className="h-8 w-8 text-muted-foreground" />
          </Card>
        );
      })}
    </div>
  );
}