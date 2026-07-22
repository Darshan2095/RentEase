"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Command, ChevronDown, Sparkles, Settings, LogOut, User, ArrowLeft, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/features/auth";

export default function DashboardHeader() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("Welcome");
  const [user, setUser] = useState<AuthUser | null>(null);

  // Dynamic situational greeting adjustments based on runtime context
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me", {
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          setUser(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      router.refresh();
      router.push("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "RE";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md sticky top-0 z-40 transition-all duration-200">

      {/* Left Workspace Identity Framework */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          asChild
          className="h-9 px-3.5 rounded-xl text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/40 hover:border-slate-200 transition-all flex items-center gap-2 shadow-sm"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Go to Marketplace</span>
            <span className="sm:hidden">Marketplace</span>
          </Link>
        </Button>

        <div className="hidden md:flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-slate-50/50 px-3 py-1.5 w-64 shadow-inner group focus-within:border-slate-300 focus-within:bg-white transition-all">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-slate-600 shrink-0" />
          <input
            type="text"
            placeholder="Search console..."
            className="w-full bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
          />
          <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 font-mono text-[9px] font-bold text-slate-400 shadow-sm">
            <Command className="h-2 w-2 stroke-[2.5]" />K
          </kbd>
        </div>
      </div>

      {/* Right Command Operations Cluster */}
      <div className="flex items-center gap-3.5">

        {/* Dynamic Context Notification System Node */}
        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="h-4.5 w-4.5 stroke-[2]" />
            {/* Live activity flashing indicator */}
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </Button>
        </div>

        {/* Vertical Separator Divider */}
        <div className="h-5 w-[1px] bg-slate-200/80" />

        {/* Profile Dropdown Component Menu Layer */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all focus:outline-none group">
              <div className="relative">
                <Avatar className="h-8 w-8 rounded-lg border border-slate-200 shadow-sm transition-transform group-hover:scale-[1.02]">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVntI8W66S4tpgqvs7Hap-E5_hdgwEzn_EtkT8HnIRwh6x-s4RwUMnwWA&s=10" alt="User Profile" />
                  <AvatarFallback className="bg-[#2563EB]/10 text-[#2563EB] text-[12px] font-bold rounded-lg">
                    {getInitials(user?.fullName)}
                  </AvatarFallback>
                </Avatar>
                {/* Active user presence badge */}
                <span className="absolute -bottom-0.5 -right-0.5 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors leading-tight">
                  {user?.fullName || "User"}
                </span>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 text-amber-500 fill-amber-400" /> Premium Member
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
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4 text-slate-400" />
                Profile Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-lg text-[13px] text-slate-600 font-medium py-2 focus:bg-slate-50 cursor-pointer">
              <Link href="/dashboard/orders">
                <ShoppingCart className="mr-2 h-4 w-4 text-slate-400" />
                My Orders
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-lg text-[13px] text-slate-600 font-medium py-2 focus:bg-slate-50 cursor-pointer">
              <Link href="/dashboard/rentals">
                <Package className="mr-2 h-4 w-4 text-slate-400" />
                Active Rentals
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="rounded-lg text-[13px] font-semibold text-rose-600 py-2 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4 text-rose-400" />
              Disconnect Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}