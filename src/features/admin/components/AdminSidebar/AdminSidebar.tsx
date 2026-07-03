"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarItems } from "./sidebar.data";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible on lg+) */}
      <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
        {/* Brand Section */}
        <div className="flex h-16 items-center px-6">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
              R
            </div>
            RentEase
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Exit Section */}
        <div className="border-t border-slate-100 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Storefront
          </Link>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM NAVIGATION (Visible on lg and smaller) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {sidebarItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-1 transition-colors",
                isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-indigo-600" : "text-slate-400")} />
              <span className="text-[9px] font-bold tracking-tight">{item.title}</span>
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-[9px] font-bold tracking-tight">Exit</span>
        </Link>
      </nav>
    </>
  );
}