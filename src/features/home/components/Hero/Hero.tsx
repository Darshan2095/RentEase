"use client";

import Container from "@/components/layout/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-white">
      
      {/* Premium Atmospheric Ambient Glow Layers */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/4 translate-y-1/4" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content side remains focused and tight */}
          <HeroContent />
          
          {/* Image side allows for visual breathing room */}
          <HeroImage />
          
        </div>
      </Container>
      
      {/* Lower Border Anchor for Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-100" />
    </section>
  );
}