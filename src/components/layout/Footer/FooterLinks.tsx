import Link from "next/link";
import { footerLinks } from "./footer.data";

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-6 lg:gap-x-12 w-full justify-between">
      {footerLinks.map((group) => (
        <div key={group.title} className="flex flex-col space-y-4">
          {/* Section Heading with Clean Hierarchy */}
          <h4 className="text-[12px] font-semibold tracking-wider text-[#111827] uppercase">
            {group.title}
          </h4>
          
          {/* List Layout with Consistent Spacing */}
          <ul className="flex flex-col space-y-3">
            {group.links.map((link) => (
              <li key={link.href} className="group/item">
                <Link
                  href={link.href}
                  className="text-[14px] text-[#6B7280] hover:text-[#2563EB] transition-all duration-200 ease-in-out flex items-center transform group-hover/item:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}