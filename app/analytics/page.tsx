import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { PerformanceTrends } from "@/components/performance-trends"
import { SupplierAnalytics } from "@/components/supplier-analytics"
import { CostAnalysis } from "@/components/cost-analysis"
import { InventoryAnalytics } from "@/components/inventory-analytics"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
              <p className="text-muted-foreground">Comprehensive insights and trends for data-driven decisions</p>
            </div>
          </div>

          <AnalyticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceTrends />
            <CostAnalysis />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SupplierAnalytics />
            <InventoryAnalytics />
          </div>
        </main>
      </div>
    </div>
  )
}
