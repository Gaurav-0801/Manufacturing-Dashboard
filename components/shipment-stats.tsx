import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Shipments",
    value: "156",
    change: "+12 this week",
    icon: Truck,
    color: "text-chart-1",
  },
  {
    title: "In Transit",
    value: "23",
    change: "Active deliveries",
    icon: Clock,
    color: "text-chart-4",
  },
  {
    title: "Delivered",
    value: "142",
    change: "91.2% success rate",
    icon: CheckCircle,
    color: "text-chart-2",
  },
  {
    title: "Delayed",
    value: "8",
    change: "5.1% of total",
    icon: AlertTriangle,
    color: "text-chart-3",
  },
]

export function ShipmentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
