import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { InventoryStats } from "@/components/inventory-stats"
import { InventoryList } from "@/components/inventory-list"
import { AddInventoryDialog } from "@/components/add-inventory-dialog"

export default function InventoryPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
              <p className="text-muted-foreground">Monitor stock levels and manage inventory across all locations</p>
            </div>
            <AddInventoryDialog />
          </div>

          <InventoryStats />
          <InventoryList />
        </main>
      </div>
    </div>
  )
}
