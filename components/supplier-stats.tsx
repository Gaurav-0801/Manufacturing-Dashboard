import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, DollarSign, Star } from "lucide-react"

const stats = [
  {
    title: "Total Suppliers",
    value: "47",
    change: "+3 this month",
    icon: Users,
    color: "text-chart-1",
  },
  {
    title: "Avg Performance",
    value: "86.2%",
    change: "+2.1% from last month",
    icon: TrendingUp,
    color: "text-chart-2",
  },
  {
    title: "Total Cost Savings",
    value: "$259K",
    change: "+$23K this month",
    icon: DollarSign,
    color: "text-chart-2",
  },
  {
    title: "Avg Quality Rating",
    value: "4.2/5",
    change: "+0.1 from last month",
    icon: Star,
    color: "text-chart-4",
  },
]

export function SupplierStats() {
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
