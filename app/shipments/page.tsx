import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ShipmentStats } from "@/components/shipment-stats"
import { ShipmentList } from "@/components/shipment-list"
import { AddShipmentDialog } from "@/components/add-shipment-dialog"

export default function ShipmentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shipment Tracking</h1>
              <p className="text-muted-foreground">Monitor and manage all shipments in real-time</p>
            </div>
            <AddShipmentDialog />
          </div>

          <ShipmentStats />
          <ShipmentList />
        </main>
      </div>
    </div>
  )
}
