import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <DashboardSidebar />

      <div className="flex flex-1 flex-col">

        <DashboardHeader />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}