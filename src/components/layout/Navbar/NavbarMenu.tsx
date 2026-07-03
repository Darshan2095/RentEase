"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navbar.data";

export default function NavbarMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[14px] font-medium tracking-tight relative py-1.5 transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 rounded-sm
              ${isActive 
                ? "text-[#2563EB]" 
                : "text-[#6B7280] hover:text-[#111827]"
              }
            `}
          >
            {item.label}
            
            {/* High-end sliding layout accent underneath active items */}
            {isActive ? (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full" />
            ) : (
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#2563EB]/60 rounded-full transition-all duration-200 ease-in-out group-hover:w-full group-hover:left-0 origin-center" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}