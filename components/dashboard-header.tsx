import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-card-foreground">Manufacturing Dashboard</h2>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            Live Data
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search suppliers, shipments..." className="pl-10 w-80" />
          </div>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline" size="sm" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
