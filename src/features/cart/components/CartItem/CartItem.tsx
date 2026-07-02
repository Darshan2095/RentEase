"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <Card className="flex items-center gap-4 p-4">

      <div className="relative h-28 w-28 overflow-hidden rounded-lg">

        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
        />

      </div>

      <div className="flex-1 space-y-2">

        <h3 className="text-lg font-semibold">
          {item.product.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {item.rentalTenure} Months
        </p>

        <p className="font-semibold">
          ₹{item.monthlyRent}/month
        </p>

      </div>

      <div className="flex items-center gap-2">

        <Button
          size="icon"
          variant="outline"
          onClick={onDecrease}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span>{item.quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={onIncrease}
        >
          <Plus className="h-4 w-4" />
        </Button>

      </div>

      <Button
        size="icon"
        variant="destructive"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

    </Card>
  );
}