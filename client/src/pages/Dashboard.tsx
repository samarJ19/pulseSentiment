import { LogoutButton } from "@/components/logout-button";
import { DashboardContent } from "@/components/dashboard";

export default function AdminDashboard() {
  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="font-semibold text-lg">Admin Dashboard</div>
            <LogoutButton />
          </div>
          <div className="px-6 py-6">
            <DashboardContent />
          </div>
        </div>
      </div>
    </div>
  );
}