"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/features/auth/validations/login.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Welcome back to RentEase!");
      router.push("/dashboard");
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      {/* Back to Home Button - Anchored top-left */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors duration-200 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to marketplace</span>
      </Link>

      {/* Left Wing: Form Canvas Container */}
      <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-white border-r border-slate-100 relative z-10">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {/* Header Block with Clean Hierarchy */}
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/20 mb-4">
              <span className="text-white font-bold text-lg select-none">R</span>
            </div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#111827]">
              Welcome back
            </h1>
            <p className="text-[14px] text-[#6B7280]">
              Sign in to manage your active rentals and order status.
            </p>
          </div>

          {/* Form Context */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-[13px] font-semibold text-[#111827]">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]/60 pointer-events-none" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          className="h-11 pl-10 rounded-xl border-slate-200 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] text-[14px] transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-[12px] font-medium text-[#EF4444]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-[13px] font-semibold text-[#111827]">Password</FormLabel>
                      <Link 
                        href="/forgot-password" 
                        className="text-[12px] font-medium text-[#2563EB] hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]/60 pointer-events-none" />
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-11 pl-10 rounded-xl border-slate-200 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] text-[14px] transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-[12px] font-medium text-[#EF4444]" />
                  </FormItem>
                )}
              />

              {/* Submit Control Action */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-[#FFFFFF] font-medium shadow-md shadow-blue-500/10 active:scale-98 transition-all duration-200 mt-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Verifying details..." : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Footer Redirection Group */}
          <div className="text-center text-[14px] text-[#6B7280] pt-2">
            Don&apos;t have an account?&nbsp;
            <Link
              href="/register"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Wing: Immersive Marketing Side Graphic Banner (Hidden on Mobile viewports) */}
      <div className="hidden lg:col-span-7 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle geometric grid backdrop mesh texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
        
        <div className="relative flex items-center space-x-2">
          <span className="text-lg font-bold tracking-tight">Rent<span className="text-[#2563EB]">Ease</span></span>
        </div>

        <div className="relative max-w-md space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[12px] font-medium text-[#10B981]">
            <ShieldCheck className="h-3.5 w-3.5 stroke-[2]" />
            <span>Verified Premium Inventory</span>
          </div>
          <h2 className="text-[32px] font-bold leading-tight tracking-tight">
            Rent top-tier furniture without the commitment.
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            Join thousands of professionals changing how they define home. Free maintenance, upgrade setups anytime, with zero ownership overhead.
          </p>
        </div>

        <div className="relative text-[12px] text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} RentEase Inc. Secure Checkout Platform.
        </div>
      </div>
    </div>
  );
}