"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  User, 
  MapPin, 
  Package, 
  Receipt, 
  Calendar, 
  CreditCard,
  Truck
} from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
}

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: Props) {
  if (!order) return null;

  // Helper function to map order statuses to unified premium colors
  const getStatusVariant = (status: string) => {
    const normalize = status?.toLowerCase() || "";
    if (normalize.includes("deliv") || normalize.includes("success") || normalize.includes("paid")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }
    if (normalize.includes("pend") || normalize.includes("process")) {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }
    if (normalize.includes("cancel") || normalize.includes("fail")) {
      return "bg-rose-50 text-rose-700 border-rose-100";
    }
    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl rounded-2xl border-slate-100 p-6 sm:p-8 space-y-6 scrollbar-thin">
        
        <DialogHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2 text-[#2563EB]">
            <FileText className="h-5 w-5" />
            <DialogTitle className="text-[20px] font-bold text-[#111827]">
              Order Specification Summary
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Metadata Section Block Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Order Primary Details Panel */}
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 space-y-3">
              <h3 className="text-[14px] font-bold text-[#111827] flex items-center space-x-2">
                <Receipt className="h-4 w-4 text-slate-400" />
                <span>Order Metadata</span>
              </h3>
              
              <div className="space-y-2 text-[13px] text-[#6B7280]">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order ID</span>
                  <span className="font-mono text-[#111827] font-semibold">#{order._id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order Status</span>
                  <Badge variant="outline" className={`rounded-md px-2 py-0.5 font-medium ${getStatusVariant(order.orderStatus)}`}>
                    {order.orderStatus}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Status</span>
                  <Badge variant="outline" className={`rounded-md px-2 py-0.5 font-medium ${getStatusVariant(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Route</span>
                  <span className="text-[#111827] font-medium inline-flex items-center space-x-1">
                    <CreditCard className="h-3 w-3 text-slate-400 mr-1" />
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Placed Date</span>
                  <span className="text-[#111827] font-medium inline-flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-slate-400 mr-1" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information Panel */}
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 space-y-3">
              <h3 className="text-[14px] font-bold text-[#111827] flex items-center space-x-2">
                <User className="h-4 w-4 text-slate-400" />
                <span>Customer Coordinates</span>
              </h3>
              
              <div className="space-y-2.5 text-[13px] text-[#6B7280]">
                <div>
                  <span className="block text-[11px] uppercase font-semibold tracking-wider text-slate-400">Full Name</span>
                  <span className="text-[#111827] font-medium text-[14px]">{order.user?.fullName}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-semibold tracking-wider text-slate-400">Email Reference</span>
                  <span className="text-[#111827] font-medium">{order.user?.email}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-semibold tracking-wider text-slate-400">Phone Connection</span>
                  <span className="text-[#111827] font-medium font-mono">{order.user?.phone}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Delivery Logistics Location block */}
          <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-2.5">
            <h3 className="text-[14px] font-bold text-[#111827] flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>White-Glove Delivery Address</span>
            </h3>
            <div className="text-[13px] text-[#6B7280] leading-relaxed pl-6 space-y-0.5">
              <p className="font-semibold text-[#111827]">{order.address?.fullName} <span className="text-[12px] text-slate-400 font-mono font-normal">({order.address?.phone})</span></p>
              <p>{order.address?.address}</p>
              <p>{order.address?.city}, {order.address?.state} — <span className="font-mono font-medium text-slate-700">{order.address?.pincode}</span></p>
            </div>
          </div>

          {/* Itemized Asset Catalog Row Manifest */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-bold text-[#111827] flex items-center space-x-2">
              <Package className="h-4 w-4 text-slate-400" />
              <span>Manifest Subscriptions</span>
            </h3>
            
            <div className="space-y-3">
              {order.items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-100 p-4 bg-white hover:bg-slate-50/50 transition-colors duration-150 gap-3"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-[14px] text-[#111827]">
                      {item.productName || item.product?.name}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#6B7280]">
                      <span>Quantity: <strong className="text-[#111827] font-semibold">{item.quantity}</strong></span>
                      <span className="inline-flex items-center bg-blue-50/60 px-1.5 py-0.5 rounded text-[#2563EB] font-medium">
                        Tenure: {item.rentalTenure} Mos.
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-150/60">
                    <p className="font-bold text-[14px] text-[#111827]">
                      ₹{item.monthlyRent?.toLocaleString()}<span className="text-[12px] text-slate-400 font-normal">/mo</span>
                    </p>
                    <p className="text-[12px] text-slate-400">
                      Refundable Deposit: <span className="font-mono font-medium text-slate-600">₹{item.securityDeposit?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary Metrics Computation Sheet */}
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100/80 space-y-2.5">
            <h3 className="text-[13px] font-bold text-[#111827] uppercase tracking-wider flex items-center space-x-2">
              <Truck className="h-3.5 w-3.5 text-slate-400" />
              <span>Financial Ledger Balance</span>
            </h3>
            
            <div className="space-y-2 text-[13px] text-[#6B7280]">
              <div className="flex justify-between">
                <span>First Month Rental Subtotal</span>
                <span className="font-medium text-[#111827]">₹{order.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Refundable Guarantees (Deposit)</span>
                <span className="font-medium text-[#111827]">₹{order.securityDeposit?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Dispatched Logistics</span>
                <span className="font-medium text-[#111827]">
                  {order.deliveryCharge === 0 || !order.deliveryCharge ? (
                    <span className="text-emerald-600 font-semibold uppercase text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">FREE</span>
                  ) : (
                    `₹${order.deliveryCharge?.toLocaleString()}`
                  )}
                </span>
              </div>
              
              <Separator className="my-2 bg-slate-200/60" />
              
              <div className="flex justify-between text-[16px] font-bold text-[#111827]">
                <span>Total Immediate Payment</span>
                <span className="text-[#2563EB]">₹{order.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}