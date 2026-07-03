import { ReactNode } from "react";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Fixed width, border-r for clean separation */}
      <div className="hidden lg:block w-64 border-r border-slate-200 bg-white">
        <AdminSidebar />
      </div>

      {/* Main Content - Flex-1 ensures it fills the remaining space */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Optional: Add a Top Nav bar here for profile/search */}
        <div className="min-h-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <AdminSidebar />
      </div>
    </div>
  );
}