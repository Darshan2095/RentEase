import { PublicLayout } from "@/components/layout/PublicLayout/PublicLayout";
import Hero from "@/features/home/components/Hero";
import Categories from "@/features/home/components/Categories";
import Container from "@/components/layout/Container";
import PageSection from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function HomePage() {
  const steps = [
    {
      title: "Choose Items",
      description: "Pick from our curated range of furniture and appliances.",
      icon: CheckCircle2,
    },
    {
      title: "Flexible Renting",
      description: "Select tenure from 3 to 12+ months that fits your need.",
      icon: RefreshCw,
    },
    {
      title: "Free Delivery & Setup",
      description: "We deliver and set up everything in your home at no extra cost.",
      icon: Truck,
    },
    {
      title: "Quality Guaranteed",
      description: "Every item goes through a rigorous quality check process.",
      icon: ShieldCheck,
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <Categories />

      {/* How it works */}
      <PageSection id="how-it-works" className="bg-muted/30">
        <Container className="space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">How RentEase Works</h2>
            <p className="text-muted-foreground">
              Renting furniture and appliances has never been easier. Simple process, transparent pricing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-3 bg-background p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </PageSection>

      {/* CTA Section */}
      <PageSection className="bg-primary text-primary-foreground">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Upgrade Your Living Space?
              </h2>
              <p className="text-primary-foreground/80">
                Explore our catalog today and design your space with premium items on low monthly rent.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/products" className="flex items-center gap-2">
                  Browse Catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </PageSection>
    </PublicLayout>
  );
}