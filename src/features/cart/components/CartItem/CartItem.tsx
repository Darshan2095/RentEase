"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <Card className="group flex items-center gap-6 p-4 transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-100">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-center gap-1">
        <h3 className="font-semibold text-slate-900">{item.product.name}</h3>
        <p className="text-sm text-slate-500">Tenure: {item.rentalTenure} Months</p>
        <p className="font-medium text-blue-600">₹{item.monthlyRent.toLocaleString()} / mo</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-slate-600"
            onClick={onDecrease}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-slate-600"
            onClick={onIncrease}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}