import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, CheckCircle, AlertCircle } from "lucide-react"

const shipments = [
  {
    id: "SCM-2024-001",
    supplier: "SteelCorp Industries",
    status: "IN_TRANSIT",
    expected: "Jan 15, 2024",
    value: "$45,000",
    progress: 75,
  },
  {
    id: "SCM-2024-002",
    supplier: "Global Components Ltd",
    status: "DELIVERED",
    expected: "Jan 10, 2024",
    value: "$28,000",
    progress: 100,
  },
  {
    id: "SCM-2024-003",
    supplier: "Precision Parts Co",
    status: "DELAYED",
    expected: "Jan 12, 2024",
    value: "$15,000",
    progress: 45,
  },
  {
    id: "SCM-2024-004",
    supplier: "TechSupply Corp",
    status: "PENDING",
    expected: "Jan 18, 2024",
    value: "$32,000",
    progress: 0,
  },
]

const statusConfig = {
  IN_TRANSIT: { icon: Truck, color: "bg-chart-4 text-white", label: "In Transit" },
  DELIVERED: { icon: CheckCircle, color: "bg-chart-2 text-white", label: "Delivered" },
  DELAYED: { icon: AlertCircle, color: "bg-chart-3 text-white", label: "Delayed" },
  PENDING: { icon: Clock, color: "bg-muted text-muted-foreground", label: "Pending" },
}

export function ShipmentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Shipments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shipments.map((shipment) => {
            const config = statusConfig[shipment.status as keyof typeof statusConfig]
            const Icon = config.icon

            return (
              <div key={shipment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${config.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-card-foreground">{shipment.id}</div>
                    <div className="text-sm text-muted-foreground">{shipment.supplier}</div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {config.label}
                  </Badge>
                  <div className="text-sm text-muted-foreground">Expected: {shipment.expected}</div>
                  <div className="font-medium text-card-foreground">{shipment.value}</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
