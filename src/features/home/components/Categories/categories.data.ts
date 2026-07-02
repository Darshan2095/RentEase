import { Sofa, Bed, Table, Tv, Flame } from "lucide-react";

export const categoriesData = [
  {
    name: "Living Room",
    count: "120+ Items",
    icon: Sofa,
    href: "/products?category=Sofas",
  },
  {
    name: "Bedroom",
    count: "80+ Items",
    icon: Bed,
    href: "/products?category=Beds",
  },
  {
    name: "Study & Office",
    count: "45+ Items",
    icon: Table,
    href: "/products?category=Tables",
  },
  {
    name: "Appliances",
    count: "60+ Items",
    icon: Tv,
    href: "/products?category=Appliances",
  },
  {
    name: "Trending",
    count: "30+ Items",
    icon: Flame,
    href: "/products?isFeatured=true",
  },
];
