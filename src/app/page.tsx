"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, RefreshCw, Truck, ShieldCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout/PublicLayout";
import Hero from "@/features/home/components/Hero";
import Categories from "@/features/home/components/Categories";
import Container from "@/components/layout/Container";
import PageSection from "@/components/layout/PageSection";

export default function HomePage() {
  const steps = [
    {
      title: "Curate Workspace",
      description: "Handpick from an architecturally vetted catalog of furniture and appliance tiers.",
      icon: Layers,
    },
    {
      title: "Calibrate Tenure",
      description: "Scale contract durations from 3 to 12+ months dynamically as needs shift.",
      icon: RefreshCw,
    },
    {
      title: "White-Glove Delivery",
      description: "Complimentary spatial deployment and asset assembly directly to your configuration.",
      icon: Truck,
    },
    {
      title: "Certified Shield Check",
      description: "Every deployment unit undergoes rigorous mechanical and cosmetic diagnostic sweeps.",
      icon: ShieldCheck,
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section Element Block */}
      <Hero />

      {/* Categories Grid Element Block */}
      <Categories />

      {/* Bespoke Process Infrastructure Layout */}
      <PageSection id="how-it-works" className="bg-slate-50/50 border-y border-slate-100 py-20">
        <Container className="space-y-16">
          
          {/* Section Typography Stack */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl mx-auto border-b border-slate-200/60 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 uppercase">
                Operational Framework
              </span>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl">
                How RentEase Works
              </h2>
            </div>
            <p className="text-[14.5px] text-slate-500 font-medium max-w-md leading-relaxed">
              Premium space transformation optimized via transparent rental parameters, structured coverage layouts, and zero hidden capital constraints.
            </p>
          </div>

          {/* Sequential Process Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Geometric Index Watermark */}
                  <span className="absolute top-4 right-5 text-4xl font-mono font-black text-slate-50 select-none group-hover:text-slate-100 transition-colors">
                    0{idx + 1}
                  </span>

                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all shadow-sm/5">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-[15.5px] text-slate-900 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[12.5px] text-slate-400 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </PageSection>

      {/* High-End Monochromatic Call-To-Action Framework */}
      <PageSection className="py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Fine Architectural Ambient Grid Line */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <Container className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 lg:p-12 backdrop-blur-sm shadow-2xl">
            
            <div className="space-y-3.5 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-amber-400 text-[11px] font-bold font-mono tracking-wide uppercase mx-auto lg:mx-0">
                <Sparkles className="h-3 w-3 fill-amber-400" /> Instant Approvals Live
              </div>
              
              <div className="space-y-2.5">
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl leading-tight text-white">
                  Ready to upgrade <br className="hidden sm:inline" />your living space?
                </h2>
                <p className="text-[14px] text-slate-400 font-medium leading-relaxed">
                  Unlock access to architectural-grade household assets instantly. Maximize liquid asset capital reserves with flexible lease durations.
                </p>
              </div>
            </div>

            {/* Premium Button Container Node */}
            <div className="shrink-0 group">
              <Button 
                asChild 
                size="lg" 
                className="h-12 px-6 rounded-xl text-[13px] font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98] flex items-center gap-2 group/btn"
              >
                <Link href="/products">
                  <span>Explore Premium Catalog</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>

          </div>
        </Container>
      </PageSection>
    </PublicLayout>
  );
}