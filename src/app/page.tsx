"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, RefreshCw, Truck, ShieldCheck, Layers, Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout/PublicLayout";
import Hero from "@/features/home/components/Hero";
import Categories from "@/features/home/components/Categories";
import Container from "@/components/layout/Container";
import PageSection from "@/components/layout/PageSection";
import { toast } from "sonner";

export default function HomePage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API submission call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("Thank you! Your message has been sent to our RentEase concierge team.");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: "Curate Workspace",
      description: "Handpick from an architecturally vetted catalog of furniture and appliance tiers.",
      icon: Layers,
    },
    {
      title: "Calibrate Tenure",
      description: "Scale contract durations from 3 to 12+ months dynamically as needs shift.",
      icon: RefreshCw,
    },
    {
      title: "White-Glove Delivery",
      description: "Complimentary spatial deployment and asset assembly directly to your configuration.",
      icon: Truck,
    },
    {
      title: "Certified Shield Check",
      description: "Every deployment unit undergoes rigorous mechanical and cosmetic diagnostic sweeps.",
      icon: ShieldCheck,
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section Element Block */}
      <Hero />

      {/* Categories Grid Element Block */}
      <Categories />

      {/* Bespoke Process Infrastructure Layout */}
      <PageSection id="how-it-works" className="bg-slate-50/50 border-y border-slate-100 py-20">
        <Container className="space-y-16">
          
          {/* Section Typography Stack */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl mx-auto border-b border-slate-200/60 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 uppercase">
                Operational Framework
              </span>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl">
                How RentEase Works
              </h2>
            </div>
            <p className="text-[14.5px] text-slate-500 font-medium max-w-md leading-relaxed">
              Premium space transformation optimized via transparent rental parameters, structured coverage layouts, and zero hidden capital constraints.
            </p>
          </div>

          {/* Sequential Process Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Geometric Index Watermark */}
                  <span className="absolute top-4 right-5 text-4xl font-mono font-black text-slate-50 select-none group-hover:text-slate-100 transition-colors">
                    0{idx + 1}
                  </span>

                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all shadow-sm/5">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-[15.5px] text-slate-900 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[12.5px] text-slate-400 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </PageSection>

      {/* Contact Us Section */}
      <PageSection id="contact" className="py-20 bg-white">
        <Container className="space-y-16">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl mx-auto border-b border-slate-100 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 uppercase">
                Get In Touch
              </span>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl">
                Contact Our Concierge
              </h2>
            </div>
            <p className="text-[14.5px] text-slate-500 font-medium max-w-md leading-relaxed">
              Have questions about subscriptions, active lease transfers, or customized layouts? Our team is available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
            
            {/* Info Cards Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-8 flex-grow">
                <div className="space-y-2">
                  <h3 className="text-[18px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Corporate HQ
                  </h3>
                  <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
                    Direct communications channels for support and enterprise solutions.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone Item */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-slate-200/60 rounded-2xl text-slate-700 shadow-sm/5 shrink-0">
                      <Phone className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">Call support</h4>
                      <p className="text-[14px] font-semibold text-slate-800 mt-0.5">+1 (800) RENT-EASE</p>
                    </div>
                  </div>

                  {/* Email Item */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-slate-200/60 rounded-2xl text-slate-700 shadow-sm/5 shrink-0">
                      <Mail className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">Write to us</h4>
                      <p className="text-[14px] font-semibold text-slate-800 mt-0.5">support@rentease.com</p>
                    </div>
                  </div>

                  {/* Location Item */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-slate-200/60 rounded-2xl text-slate-700 shadow-sm/5 shrink-0">
                      <MapPin className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">Visit office</h4>
                      <p className="text-[13.5px] font-semibold text-slate-800 mt-0.5">
                        Suite 400, 100 Innovation Way<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>

                  {/* Hours Item */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-slate-200/60 rounded-2xl text-slate-700 shadow-sm/5 shrink-0">
                      <Clock className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">Working hours</h4>
                      <p className="text-[13.5px] font-semibold text-slate-800 mt-0.5">
                        Mon – Fri: 9:00 AM – 6:00 PM PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <form onSubmit={handleContactSubmit} className="space-y-5 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10 transition-all text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10 transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-bold text-slate-700">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Rental agreement inquiry"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10 transition-all text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12.5px] font-bold text-slate-700">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Type details of your request here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/10 transition-all resize-none text-slate-800"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/10 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Sending message..." : "Send Message"}</span>
                </Button>
              </form>
            </div>

          </div>
        </Container>
      </PageSection>

      {/* High-End Monochromatic Call-To-Action Framework */}
      <PageSection className="py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Fine Architectural Ambient Grid Line */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <Container className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 lg:p-12 backdrop-blur-sm shadow-2xl">
            
            <div className="space-y-3.5 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-amber-400 text-[11px] font-bold font-mono tracking-wide uppercase mx-auto lg:mx-0">
                <Sparkles className="h-3 w-3 fill-amber-400" /> Instant Approvals Live
              </div>
              
              <div className="space-y-2.5">
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl leading-tight text-white">
                  Ready to upgrade <br className="hidden sm:inline" />your living space?
                </h2>
                <p className="text-[14px] text-slate-400 font-medium leading-relaxed">
                  Unlock access to architectural-grade household assets instantly. Maximize liquid asset capital reserves with flexible lease durations.
                </p>
              </div>
            </div>

            {/* Premium Button Container Node */}
            <div className="shrink-0 group">
              <Button 
                asChild 
                size="lg" 
                className="h-12 px-6 rounded-xl text-[13px] font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98] flex items-center gap-2 group/btn"
              >
                <Link href="/products">
                  <span>Explore Premium Catalog</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>

          </div>
        </Container>
      </PageSection>
    </PublicLayout>
  );
}