import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { KPICards } from "@/components/kpi-cards"
import { PerformanceCharts } from "@/components/performance-charts"
import { RecentAlerts } from "@/components/recent-alerts"
import { ShipmentStatus } from "@/components/shipment-status"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid gap-6">
            <KPICards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceCharts />
              <ShipmentStatus />
            </div>
            <RecentAlerts />
          </div>
        </main>
      </div>
    </div>
  )
}
