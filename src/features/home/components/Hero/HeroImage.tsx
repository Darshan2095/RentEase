"use client";

import Image from "next/image";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative w-full max-w-xl lg:max-w-none mx-auto group">
      
      {/* Decorative Structural Accent Geometry (Back Drop Accent) */}
      <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-tr from-slate-200/40 via-slate-100/20 to-indigo-50/30 blur-xl pointer-events-none transition-all duration-500 group-hover:scale-[1.02]" />

      {/* Main Asset Container Core */}
      <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-[24px] overflow-hidden border border-slate-200/60 bg-slate-50 shadow-[0_8px_30px_rgb(15,23,42,0.03)] transition-all duration-300">
        
        {/* The Hero Visual Asset */}
        <Image
          src="/Hero.png"
          alt="Stunning premium modern living room furniture configurations"
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
        />
        
        {/* Editorial Shadow Vignette Overlay Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/0 to-slate-950/10 pointer-events-none" />

        {/* Dynamic Context Floating HUD Tag (Top Left) */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 text-slate-900 shadow-sm transition-transform duration-300 group-hover:translate-y-[-2px]">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold tracking-tight font-sans">
            Ready to Deploy
          </span>
        </div>

        {/* Premium Value Stat Card Element Overlay (Bottom Right) */}
        <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-64 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/40 shadow-xl flex items-start gap-3 transition-transform duration-300 group-hover:translate-y-[-4px]">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
            <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <span className="text-[12px] font-bold text-slate-900 tracking-tight">
                RentEase Verified Cover
              </span>
              <Sparkles className="h-3 w-3 text-amber-500 fill-amber-400" />
            </div>
            <p className="text-[10.5px] text-slate-400 font-medium leading-normal">
              Accidental structural damage waivers protect every lease contract term.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}