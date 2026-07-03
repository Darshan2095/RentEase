import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC] text-[#111827] overflow-hidden antialiased">
      
      {/* 1. Structural Left Wing: Persistent Desktop Sidebar */}
      {/* Sidebar is hidden on mobile (handled by component internals now) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 border-r border-slate-100 bg-white">
        <DashboardSidebar />
      </aside>

      {/* 2. Structural Right Wing: Primary App Core Viewport */}
      <div className="flex flex-1 flex-col md:pl-64 min-w-0 relative w-full">
        
        {/* Fixed Header Layout */}
        <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-slate-100/80">
          <DashboardHeader />
        </header>

        {/* Dynamic Inner Scroll Canvas Frame */}
        {/* Added pb-20 to ensure content doesn't get hidden behind mobile bottom nav */}
        <main className="flex-1 overflow-y-auto focus:outline-none pb-20 md:pb-0">
          <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
            {children}
          </div>
        </main>

      </div>

      {/* Mobile Bottom Navigation - Sidebar mobile component */}
      <div className="md:hidden">
        <DashboardSidebar />
      </div>
    </div>
  );
}