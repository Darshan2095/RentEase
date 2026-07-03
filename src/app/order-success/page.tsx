"use client";

import Link from "next/link";
import { CheckCircle2, Calendar, ShieldCheck, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  // Mock tracking token or timestamp for present high-fidelity display layout
  const executionYear = new Date().getFullYear();

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-10 text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Animated Success Identity Ring */}
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="h-10 w-10 stroke-[1.5]" />
        </div>

        {/* Core Typography Layout Headers */}
        <div className="space-y-2">
          <h1 className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[#111827]">
            Order Placed Successfully!
          </h1>
          <p className="text-[15px] text-[#6B7280] max-w-md mx-auto leading-relaxed">
            Thank you for renting with RentEase. Your delivery logistics are being compiled, and a verification receipt has been sent to your email.
          </p>
        </div>

        {/* High-Fidelity Transaction Data Card */}
        <div className="bg-[#F8FAFC] rounded-xl border border-slate-100 p-4 sm:p-5 text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
              <Calendar className="h-4 w-4 text-[#2563EB]" />
            </div>
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Estimated Delivery</span>
              <span className="text-[14px] font-medium text-[#111827]">Within 48–72 Hours</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Coverage Package</span>
              <span className="text-[14px] font-medium text-[#111827]">RentEase Basic Protection</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Fulfillment Progress Tracker */}
        <div className="space-y-4 pt-2">
          <h3 className="text-left text-[13px] font-bold uppercase tracking-wider text-slate-400">Next Fulfillment Steps</h3>
          <div className="relative border-l-2 border-slate-100 text-left pl-5 space-y-5 ml-2">
            {[
              { title: "Verification Checks", desc: "Our operations desk approves your contract credentials.", active: true },
              { title: "White-Glove Dispatched", desc: "Delivery teams load verified assets onto local fleet trucks.", active: false },
              { title: "In-Home Installation", desc: "Items are built and correctly positioned exactly where you want them.", active: false }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`absolute -left-[27px] top-0.5 h-3 w-3 rounded-full border-2 bg-white transition-colors duration-300 ${step.active ? "border-[#2563EB] ring-4 ring-blue-50" : "border-slate-200"}`} />
                <h4 className={`text-[14px] font-semibold ${step.active ? "text-[#111827]" : "text-slate-500"}`}>{step.title}</h4>
                <p className="text-[12px] text-[#6B7280] leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Premium Twin Action Controls Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button 
            asChild
            variant="outline"
            className="w-full sm:w-auto h-11 px-5 rounded-xl border-slate-200 hover:bg-slate-50 text-[#111827] text-[14px] font-medium active:scale-98 transition-all duration-200"
          >
            <Link href="/" className="inline-flex items-center space-x-2">
              <Home className="h-4 w-4 text-slate-400" />
              <span>Continue Shopping</span>
            </Link>
          </Button>

          <Button 
            asChild
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-[14px] font-medium shadow-md shadow-blue-500/10 active:scale-98 transition-all duration-200"
          >
            <Link href="/dashboard/orders" className="inline-flex items-center space-x-2">
              <span>Track Orders Portal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}