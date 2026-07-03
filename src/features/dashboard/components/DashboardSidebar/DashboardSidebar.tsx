"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Package,
  Heart,
  User,
  Settings,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    name: "Rentals",
    href: "/dashboard/rentals",
    icon: Package,
  },
  {
    name: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible on md+) */}
      <aside className="hidden md:flex w-64 border-r border-slate-100 bg-slate-50/50 p-5 flex-col justify-between h-screen sticky top-0 left-0">
        <div className="space-y-7">
          <div className="flex items-center px-2">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm font-black tracking-tighter group-hover:bg-blue-600 transition-colors">RE</div>
              <span className="text-lg font-black text-slate-950 tracking-tight">Rent<span className="text-slate-500 font-medium">Ease</span></span>
            </Link>
          </div>

          <nav className="space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn("group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-all relative", isActive ? "bg-white text-slate-900 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70")}>
                  {isActive && <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-blue-600 rounded-r-full" />}
                  <Icon size={17} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* CTA Frame for Desktop Only */}
        <div className="rounded-2xl bg-white border border-slate-200/60 p-4 shadow-sm/5">
          <p className="text-[11.5px] text-slate-400 font-medium mb-2">Premium Shield Cover</p>
          <Link href="/dashboard/premium" className="text-[11.5px] font-bold text-blue-600 flex items-center">Learn more <ArrowUpRight className="h-3 w-3 ml-1"/></Link>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM NAVIGATION (Visible on md and smaller) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex justify-around items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {links.slice(0, 5).map((item) => { // Showing first 5 items to keep it clean
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-blue-600" : "text-slate-400"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}