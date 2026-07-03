import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link 
      href="/" 
      className="flex items-center space-x-2.5 group/logo focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 rounded-md"
    >
      {/* Custom Geometric Brand Mark */}
      <div className="h-9 w-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/10 border border-blue-600/10 transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:shadow-blue-500/20">
        <span className="text-[#FFFFFF] font-bold text-lg tracking-tighter select-none">
          R
        </span>
      </div>
      
      {/* Typographic Logo Mark */}
      <span className="text-xl font-bold tracking-tight text-[#111827] transition-colors duration-200">
        Rent<span className="text-[#2563EB] transition-colors duration-200">Ease</span>
      </span>
    </Link>
  );
}