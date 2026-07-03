"use client";

import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      
      {/* Primary Action: High Contrast, Weighted Feel */}
      <Button 
        asChild 
        size="lg" 
        className="h-12 px-6 rounded-xl bg-slate-900 text-[13.5px] font-bold text-white hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-900/10 group"
      >
        <Link href="/products" className="flex items-center gap-2">
          Browse Catalog
          <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>

      {/* Secondary Action: Sophisticated, Minimalist Border */}
      <Button 
        asChild 
        size="lg" 
        variant="ghost" 
        className="h-12 px-5 rounded-xl text-[13.5px] font-bold text-slate-600 hover:bg-slate-100/80 transition-all"
      >
        <Link href="/#how-it-works" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          System Overview
        </Link>
      </Button>
      
    </div>
  );
}