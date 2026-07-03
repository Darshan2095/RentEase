"use client";

import { Sparkles, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DashboardStats from "@/features/dashboard/components/DashboardStats/DashboardStats";
import RecentOrders from "@/features/dashboard/components/RecentOrders/RecentOrders";
import ActiveRentals from "@/features/dashboard/components/ActiveRentals/ActiveRentals";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Premium Dashboard Stage Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100/60 text-[12px] font-semibold text-[#2563EB]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Customer Command Center</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[#111827]">
            Welcome Back, Explorer
          </h1>
          <p className="text-[14px] text-[#6B7280]">
            Track your continuous rental agreements, asset distributions, and monthly payment pipelines.
          </p>
        </div>

        {/* Global Dashboard Shortcuts Matrix */}
        <div className="flex items-center space-x-3 shrink-0">
          <Button 
            asChild
            className="h-10 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-semibold shadow-md shadow-blue-500/10 active:scale-98 transition-all duration-200"
          >
            <Link href="/products" className="inline-flex items-center space-x-2">
              <PlusCircle className="h-4 w-4 stroke-[2]" />
              <span>Rent New Items</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Numerical Data Summary Metric Block */}
      <div className="relative w-full">
        <DashboardStats />
      </div>

      {/* Primary Split Sub-grid Infrastructure Blocks */}
      <div className="grid gap-8 grid-cols-1 xl:grid-cols-12 items-start">
        
        {/* Left Sub-wing: Operational Order Histories */}
        <div className="xl:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/40 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100/80 pb-3">
            <div>
              <h2 className="text-[16px] font-bold text-[#111827]">Recent Invoices & Orders</h2>
              <p className="text-[12px] text-[#6B7280]">Your immediate transactional requests</p>
            </div>
            <Link 
              href="/dashboard/orders" 
              className="inline-flex items-center space-x-1 text-[12px] font-semibold text-[#2563EB] hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <RecentOrders />
        </div>

        {/* Right Sub-wing: Active Live Material Rentals Deployment */}
        <div className="xl:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/40 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100/80 pb-3">
            <div>
              <h2 className="text-[16px] font-bold text-[#111827]">Active Asset Subscriptions</h2>
              <p className="text-[12px] text-[#6B7280]">Products currently deployed in your space</p>
            </div>
            <Link 
              href="/dashboard/rentals" 
              className="inline-flex items-center space-x-1 text-[12px] font-semibold text-[#2563EB] hover:underline"
            >
              <span>Manage Items</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ActiveRentals />
        </div>

      </div>

    </div>
  );
}