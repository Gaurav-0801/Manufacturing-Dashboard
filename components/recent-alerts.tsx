import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, TrendingDown, X } from "lucide-react"

const alerts = [
  {
    id: "1",
    type: "LOW_STOCK",
    severity: "HIGH",
    title: "Low Stock Alert",
    message: "Electronic Components (CMP-001) stock is below minimum threshold",
    time: "2 minutes ago",
    icon: Package,
  },
  {
    id: "2",
    type: "SHIPMENT_DELAY",
    severity: "MEDIUM",
    title: "Shipment Delayed",
    message: "Shipment SCM-2024-003 from Precision Parts Co is delayed",
    time: "15 minutes ago",
    icon: Truck,
  },
  {
    id: "3",
    type: "SUPPLIER_PERFORMANCE",
    severity: "LOW",
    title: "Performance Review",
    message: "Precision Parts Co performance score dropped below 80%",
    time: "1 hour ago",
    icon: TrendingDown,
  },
]

const severityConfig = {
  HIGH: "bg-destructive text-destructive-foreground",
  MEDIUM: "bg-secondary text-secondary-foreground",
  LOW: "bg-muted text-muted-foreground",
}

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon

            return (
              <div key={alert.id} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                <div className="p-2 rounded-full bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-card-foreground">{alert.title}</h4>
                    <Badge className={severityConfig[alert.severity as keyof typeof severityConfig]}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>

                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
