"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ShoppingCart, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "./navbar.data";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile sheet drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Mobile Toggle Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 -mr-2 rounded-xl text-[#111827] hover:bg-slate-50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 z-50 relative"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        {open ? <X className="h-6 w-6 stroke-[1.75]" /> : <Menu className="h-6 w-6 stroke-[1.75]" />}
      </button>

      {/* Backdrop Overlay Container */}
      {open && (
        <div 
          className="fixed inset-0 top-[73px] bg-slate-900/20 backdrop-blur-md z-40 transition-opacity duration-300 animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-Down Content Panel */}
      <div
        className={`fixed left-0 right-0 top-[73px] bg-[#FFFFFF] border-b border-slate-100 shadow-xl shadow-slate-200/50 z-50 px-6 pt-6 pb-8 transition-all duration-300 ease-out transform ${
          open 
            ? "translate-y-0 opacity-100 visibility-visible" 
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-1.5">
          <p className="text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase pb-2">
            Navigation
          </p>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between text-[15px] font-medium py-3 px-3 -mx-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-[#2563EB] bg-blue-50/60 font-semibold"
                    : "text-[#111827] hover:bg-slate-50"
                }`}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <ChevronRight className={`h-4 w-4 opacity-40 transition-transform ${isActive ? "text-[#2563EB] translate-x-0.5" : ""}`} />
              </Link>
            );
          })}
        </div>

        {/* Call to Actions Wrapper */}
        <div className="flex flex-col space-y-3 pt-6 mt-6 border-t border-slate-100">
          <Button 
            variant="outline" 
            asChild 
            className="w-full h-11 rounded-xl border-slate-200 text-[#111827] font-medium shadow-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Link href="/cart" onClick={() => setOpen(false)}>
              <ShoppingCart className="h-4 w-4" />
              Cart
            </Link>
          </Button>

          <Button 
            variant="outline" 
            asChild 
            className="w-full h-11 rounded-xl border-slate-200 text-[#111827] font-medium shadow-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Link href="/admin" onClick={() => setOpen(false)}>
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          </Button>

          <Button 
            variant="outline" 
            asChild 
            className="w-full h-11 rounded-xl border-slate-200 text-[#111827] font-medium shadow-sm hover:bg-slate-50 transition-all duration-200"
          >
            <Link href="/login" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          </Button>
          
          <Button 
            asChild 
            className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-[#FFFFFF] font-medium shadow-md shadow-blue-500/10 transition-all duration-200"
          >
            <Link href="/register" onClick={() => setOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}