import { ElementType, ReactNode } from "react";

export type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "caption"
  | "label";

export type TypographyWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold";

export type TypographyColor =
  | "default"
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "warning"
  | "danger";

export type TypographyAlign =
  | "left"
  | "center"
  | "right";

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  as?: ElementType;
  weight?: TypographyWeight;
  color?: TypographyColor;
  align?: TypographyAlign;
  className?: string;
}