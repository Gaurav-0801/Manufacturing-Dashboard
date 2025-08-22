import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Items",
    value: "1,247",
    change: "+23 this month",
    icon: Package,
    color: "text-chart-1",
  },
  {
    title: "Low Stock Items",
    value: "18",
    change: "Requires attention",
    icon: AlertTriangle,
    color: "text-chart-3",
  },
  {
    title: "Total Value",
    value: "$1.2M",
    change: "+8.3% from last month",
    icon: DollarSign,
    color: "text-chart-2",
  },
  {
    title: "Turnover Rate",
    value: "4.2x",
    change: "Quarterly average",
    icon: TrendingUp,
    color: "text-chart-4",
  },
]

export function InventoryStats() {
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
