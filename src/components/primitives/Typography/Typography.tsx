import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }: TypographyProps) {
  return (
    <h2 className={`scroll-m-20 text-3xl font-semibold tracking-tight ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }: TypographyProps) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function P({ children, className = "" }: TypographyProps) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-4 ${className}`}>
      {children}
    </p>
  );
}

export function Muted({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

export function Lead({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-xl text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}
