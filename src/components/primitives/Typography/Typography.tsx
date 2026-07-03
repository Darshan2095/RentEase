import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

/**
 * Hero Headings (Landing Page Master Text)
 * Target Range: 48px on mobile to 60px+ on desktop grids
 */
export function H1({ children, className = "" }: TypographyProps) {
  return (
    <h1 
      className={`text-[36px] sm:text-[48px] lg:text-[60px] font-bold tracking-tight text-[#111827] leading-[1.1] md:leading-[1.15] select-none ${className}`}
    >
      {children}
    </h1>
  );
}

/**
 * Section Headings (Page Features & Grid Splits)
 * Target Range: 28px on mobile to 36px on desktop frames
 */
export function H2({ children, className = "" }: TypographyProps) {
  return (
    <h2 
      className={`text-[24px] sm:text-[28px] lg:text-[34px] font-bold tracking-tight text-[#111827] leading-tight ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * Card / Container Titles
 * Target Range: 18px to 22px crisp weight
 */
export function H3({ children, className = "" }: TypographyProps) {
  return (
    <h3 
      className={`text-[18px] sm:text-[20px] lg:text-[22px] font-semibold tracking-tight text-[#111827] leading-snug ${className}`}
    >
      {children}
    </h3>
  );
}

/**
 * Standard Body Copy 
 * Target Range: Clean 14px to 16px readable canvas text
 */
export function P({ children, className = "" }: TypographyProps) {
  return (
    <p 
      className={`text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed text-[#6B7280] font-normal ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Lead Paragraphs (Intro copy underneath main headings)
 * Target Range: Premium 18px text sizing
 */
export function Lead({ children, className = "" }: TypographyProps) {
  return (
    <p 
      className={`text-[16px] sm:text-[18px] leading-relaxed text-[#6B7280]/90 font-normal tracking-wide ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Small / Muted Secondary Copy
 * Target Range: Clear 12px to 13px system metrics
 */
export function Muted({ children, className = "" }: TypographyProps) {
  return (
    <p 
      className={`text-[12px] sm:text-[13px] leading-normal text-[#6B7280] font-normal ${className}`}
    >
      {children}
    </p>
  );
}