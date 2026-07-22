import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Rentals",
    href: "/admin/rentals",
    icon: ClipboardList,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  }
];