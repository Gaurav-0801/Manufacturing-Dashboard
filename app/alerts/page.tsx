import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AlertStats } from "@/components/alert-stats"
import { AlertList } from "@/components/alert-list"
import { AlertFilters } from "@/components/alert-filters"

export default function AlertsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Alert Center</h1>
              <p className="text-muted-foreground">Monitor and manage all system alerts and notifications</p>
            </div>
          </div>

          <AlertStats />
          <AlertFilters />
          <AlertList />
        </main>
      </div>
    </div>
  )
}
