import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavbarActions() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Button variant="ghost" asChild>
        <Link href="/login">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Get Started</Link>
      </Button>
    </div>
  );
}
