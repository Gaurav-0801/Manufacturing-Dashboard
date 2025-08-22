import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SupplierList } from "@/components/supplier-list"
import { SupplierStats } from "@/components/supplier-stats"
import { AddSupplierDialog } from "@/components/add-supplier-dialog"

export default function SuppliersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Supplier Management</h1>
              <p className="text-muted-foreground">Manage supplier relationships and performance</p>
            </div>
            <AddSupplierDialog />
          </div>

          <SupplierStats />
          <SupplierList />
        </main>
      </div>
    </div>
  )
}
