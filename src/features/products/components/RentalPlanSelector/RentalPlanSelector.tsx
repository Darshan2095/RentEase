"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  tenures: number[];
}

export default function RentalPlanSelector({
  tenures,
}: Props) {
  return (
    <ToggleGroup type="single">

      {tenures.map((month) => (
        <ToggleGroupItem
          key={month}
          value={month.toString()}
        >
          {month} Months
        </ToggleGroupItem>
      ))}

    </ToggleGroup>
  );
}