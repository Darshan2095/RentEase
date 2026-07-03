"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import RentalPlanSelector from "../RentalPlanSelector/RentalPlanSelector";

interface Props {
  product: any;
}

export default function ProductInfo({ product }: Props) {
  const categoryName = product.category?.name || product.category || "General";

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Meta & Header */}
      <div className="space-y-2">
        <Badge variant="secondary" className="uppercase tracking-widest text-xs font-semibold">
          {categoryName}
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{product.name}</h1>
        <p className="text-slate-600 leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      {/* 2. Clear Economics */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-6 border border-slate-100">
        <div>
          <p className="text-sm text-slate-500">Monthly Rent</p>
          <div className="text-3xl font-bold text-slate-900">
            ₹{product.monthlyRent}
            <span className="text-base font-normal text-slate-500">/mo</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500">Security Deposit</p>
          <div className="text-xl font-semibold text-slate-700 mt-1">₹{product.securityDeposit}</div>
        </div>
      </div>

      {/* 3. Action Area */}
      <div className="space-y-4">
        <RentalPlanSelector tenures={product.rentalTenure} />
        <AddToCartButton product={product} />
      </div>

      {/* 4. Trust Signals (Crucial for Rental Platforms) */}
      <div className="grid grid-cols-3 gap-2 py-4">
        <TrustItem icon={<ShieldCheck />} label="Verified Asset" />
        <TrustItem icon={<Truck />} label="Free Delivery" />
        <TrustItem icon={<RotateCcw />} label="Easy Returns" />
      </div>
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center text-slate-500">
      <div className="text-slate-400">{icon}</div>
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}