import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button asChild size="lg">
        <Link href="/products">Browse Products</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link href="/#how-it-works">Learn More</Link>
      </Button>
    </div>
  );
}
