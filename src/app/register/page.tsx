"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/features/auth/validations/register.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, User, Mail, Phone, Lock, Sparkles, CheckCircle2 } from "lucide-react";

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

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Welcome aboard! Let's get you signed in.");
      router.push("/login");
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      {/* Absolute Header Navigation Anchor */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-[13px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors duration-200 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 z-20"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to marketplace</span>
      </Link>

      {/* Left Wing: Form Core Context Container */}
      <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-white border-r border-slate-100 py-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-7">
          
          {/* Header Typography Group */}
          <div className="space-y-1.5">
            <div className="h-10 w-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/20 mb-4">
              <span className="text-white font-bold text-lg select-none">R</span>
            </div>
            <h1 className="text-[26px] font-bold tracking-tight text-[#111827]">
              Create an account
            </h1>
            <p className="text-[14px] text-[#6B7280]">
              Unlock premium furniture & appliance monthly rentals instantly.
            </p>
          </div>

          {/* Form Processing Engine */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[13px] font-semibold text-[#111827]">Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]/60 pointer-events-none" />
                      <FormControl>
                        <Input 
                          placeholder="Darshan Babariya" 
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
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[13px] font-semibold text-[#111827]">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]/60 pointer-events-none" />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[13px] font-semibold text-[#111827]">Phone Number</FormLabel>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]/60 pointer-events-none" />
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+91 9876543210"
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
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[13px] font-semibold text-[#111827]">Password</FormLabel>
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

              {/* Terms of Service Disclaimer Segment */}
              <p className="text-[11px] leading-normal text-[#6B7280] pt-1">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-[#2563EB] hover:underline font-medium">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-[#2563EB] hover:underline font-medium">Privacy Policy</Link>.
              </p>

              {/* Main Submit Anchor Control */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-[#FFFFFF] font-medium shadow-md shadow-blue-500/10 active:scale-98 transition-all duration-200 mt-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Configuring credentials..." : "Create Account"}
              </Button>
            </form>
          </Form>

          {/* Footer Redirection Elements */}
          <div className="text-center text-[14px] text-[#6B7280]">
            Already have an account?&nbsp;
            <Link
              href="/login"
              className="text-[#2563EB] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Wing: Premium Dynamic Value Grid Banner Showcase */}
      <div className="hidden lg:col-span-7 lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        {/* Spatial background masking overlay geometric textures */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="relative flex items-center space-x-2">
          <span className="text-lg font-bold tracking-tight">Rent<span className="text-[#2563EB]">Ease</span></span>
        </div>

        {/* Dynamic Value Metrics List */}
        <div className="relative max-w-lg space-y-8 my-auto">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[12px] font-medium text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The Smart Way to Furnish</span>
            </div>
            <h2 className="text-[36px] font-bold leading-tight tracking-tight">
              Start your rental journey in minutes.
            </h2>
          </div>

          {/* Value Features Checklist */}
          <div className="space-y-4">
            {[
              { title: "Flexible Monthly Subscriptions", desc: "Choose your own terms, swap items whenever your style changes." },
              { title: "White-Glove Delivery & Assembly", desc: "Our professionals deliver, construct, and position your items flawlessly for free." },
              { title: "Zero Hassle Damage Cover", desc: "Everyday life happens. Our basic rental insurance covers natural wear and minor scratches." }
            ].map((feat, i) => (
              <div key={i} className="flex items-start space-x-3.5">
                <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h3 className="text-[15px] font-semibold text-slate-100">{feat.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-normal">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[12px] text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} RentEase Inc. Enterprise Grade Security Guardrails.
        </div>
      </div>
    </div>
  );
}