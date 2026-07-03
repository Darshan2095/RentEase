import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-[#FFFFFF] mt-auto relative overflow-hidden">
      {/* Subtle background ambient touch for a premium feel */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-100">
          
          {/* Brand Identity Block */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            <div className="flex items-center space-x-2">
              {/* Custom micro-logo icon for premium feel */}
              <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="text-white font-bold text-base tracking-tighter">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#111827]">
                Rent<span className="text-[#2563EB]">Ease</span>
              </span>
            </div>
            
            <p className="text-[14px] leading-relaxed text-[#6B7280] max-w-sm font-normal">
              Premium furniture and home appliance rentals tailored for modern living. 
              Experience the freedom of flexible monthly plans with free white-glove delivery, 
              expert assembly, and hassle-free returns.
            </p>
            
            {/* Added real business accent: Trust Indicator */}
            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-[#10B981] border border-emerald-100">
                <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live Customer Support
              </span>
            </div>
          </div>

          {/* Navigation Links and Sub-grids */}
          <div className="lg:col-span-8">
            <FooterLinks />
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}