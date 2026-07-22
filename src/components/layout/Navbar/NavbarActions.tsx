"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LayoutDashboard, LogOut, Shield, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AuthUser } from "@/features/auth";

export default function NavbarActions() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/me", {
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return "RE";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
    router.refresh();
    router.push("/");
  };

  return (
    <div className="hidden md:flex items-center space-x-3.5">


      {!isCheckingAuth && (isAuthenticated ? (
        <>



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


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all focus:outline-none group cursor-pointer">
                <div className="relative">
                  <Avatar className="h-8 w-8 rounded-lg border border-slate-200 shadow-sm transition-transform group-hover:scale-[1.02]">
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVntI8W66S4tpgqvs7Hap-E5_hdgwEzn_EtkT8HnIRwh6x-s4RwUMnwWA&s=10" alt="User Profile" />
                    <AvatarFallback className="bg-[#2563EB]/10 text-[#2563EB] text-[12px] font-bold rounded-lg">
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors leading-tight">
                    {user?.fullName || "User"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Active Account
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 shadow-lg border-slate-100 mt-1">
              <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 font-mono uppercase">
                Account Workspace
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-50" />

              <DropdownMenuItem asChild className="rounded-lg text-[13px] text-slate-600 font-medium py-2 focus:bg-slate-50 cursor-pointer">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4 text-slate-400" />
                  Dashboard
                </Link>
              </DropdownMenuItem>


              <DropdownMenuItem asChild className="rounded-lg text-[13px] text-slate-600 font-medium py-2 focus:bg-slate-50 cursor-pointer">
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4 text-slate-400" />
                  Admin Panel
                </Link>
              </DropdownMenuItem>


              <DropdownMenuSeparator className="bg-slate-50" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-lg text-[13px] font-semibold text-rose-600 py-2 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4 text-rose-400" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
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
        </>
      ))}
    </div>
  );
}