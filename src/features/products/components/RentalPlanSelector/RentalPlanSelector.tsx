"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  tenures: number[];
  onValueChange?: (value: string) => void;
}

export default function RentalPlanSelector({ tenures, onValueChange }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700">
        Select Rental Tenure
      </label>
      
      <ToggleGroup 
        type="single" 
        onValueChange={onValueChange}
        className="grid grid-cols-3 gap-3"
      >
        {tenures.sort((a, b) => a - b).map((month) => (
          <ToggleGroupItem
            key={month}
            value={month.toString()}
            className="flex h-auto flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-slate-300 data-[state=on]:border-blue-600 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-700"
          >
            <span className="text-lg font-bold">{month}</span>
            <span className="text-xs font-medium uppercase text-slate-500">Months</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}