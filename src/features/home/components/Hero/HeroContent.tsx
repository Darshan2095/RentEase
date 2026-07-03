"use client";

import { Sparkles } from "lucide-react";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="flex flex-col justify-center space-y-8 max-w-2xl transition-all duration-300">
      
      {/* Editorial Structural Context Tag */}
      <div className="inline-flex items-center gap-2 bg-slate-100/80 border border-slate-200/60 px-3.5 py-1.5 rounded-full shadow-sm self-start">
        <Sparkles className="h-3.5 w-3.5 text-blue-600 fill-blue-100" />
        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-600">
          Flexible Asset Logistics Live
        </span>
      </div>

      {/* Typography Configuration Stack */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] font-sans">
          Rent Premium Furniture <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            &amp; Home Appliances.
          </span>
        </h1>
        
        <p className="text-[15.5px] md:text-[16.5px] text-slate-500 font-medium leading-relaxed max-w-xl">
          Elevate your workspace or living configurations instantly without the upfront capital friction of buying. Calibrate custom lease durations with white-glove setup included.
        </p>
      </div>

      {/* Internal Sub-Control Layers */}
      <div className="space-y-6 pt-2">
        <HeroButtons />
        
        {/* Subtle Horizontal Structural Split Line */}
        <div className="h-[1px] w-full bg-slate-100" />
        
        <HeroStats />
      </div>

    </div>
  );
}