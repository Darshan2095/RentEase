import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center flex-wrap gap-y-2 py-3 text-[13px] font-medium tracking-tight text-[#6B7280]"
    >
      {/* Root Home Link */}
      <Link 
        href="/" 
        className="flex items-center justify-center p-1 -m-1 rounded-md text-[#6B7280] hover:text-[#111827] bg-transparent hover:bg-slate-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20"
        aria-label="Home"
      >
        <Home className="h-4 w-4 stroke-[1.75]" />
      </Link>

      {/* Dynamic Item Mapping */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {/* Minimalist Divider Graphic */}
            <ChevronRight className="h-3.5 w-3.5 mx-2 text-slate-300 stroke-[2] shrink-0 select-none" />
            
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#111827] py-0.5 px-1 -mx-1 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="text-[#111827] font-semibold truncate max-w-[160px] sm:max-w-[240px]"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}