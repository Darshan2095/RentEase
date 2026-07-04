import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LayoutDashboard } from "lucide-react";

export default function NavbarActions() {
  return (
    <div className="hidden md:flex items-center space-x-3.5">
      {/* Cart Button */}
      <Button 
        variant="ghost" 
        asChild
        className="h-10 px-4 rounded-xl text-[14px] font-medium text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 active:scale-98 transition-all duration-200 flex items-center gap-2"
      >
        <Link href="/cart">
          <ShoppingCart className="h-4 w-4" />
          Cart
        </Link>
      </Button>

      {/* Admin Dashboard Button */}
      <Button 
        variant="ghost" 
        asChild
        className="h-10 px-4 rounded-xl text-[14px] font-medium text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 active:scale-98 transition-all duration-200 flex items-center gap-2"
      >
        <Link href="/admin">
          <LayoutDashboard className="h-4 w-4" />
          Admin
        </Link>
      </Button>

      {/* Refined Secondary Action */}
      <Button 
        variant="ghost" 
        asChild
        className="h-10 px-4 rounded-xl text-[14px] font-medium text-[#6B7280] hover:text-[#111827] hover:bg-slate-50 active:scale-98 transition-all duration-200"
      >
        <Link href="/login">Sign In</Link>
      </Button>

      {/* High-End Primary CTA */}
      <Button 
        asChild
        className="h-10 px-5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-[#FFFFFF] text-[14px] font-medium shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 transition-all duration-200"
      >
        <Link href="/register">Get Started</Link>
      </Button>
    </div>
  );
}