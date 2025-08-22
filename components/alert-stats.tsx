import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Critical Alerts",
    value: "3",
    change: "Immediate attention required",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "High Priority",
    value: "8",
    change: "Action needed soon",
    icon: AlertCircle,
    color: "text-chart-3",
  },
  {
    title: "Medium Priority",
    value: "15",
    change: "Monitor closely",
    icon: Info,
    color: "text-chart-4",
  },
  {
    title: "Resolved Today",
    value: "12",
    change: "Issues addressed",
    icon: CheckCircle,
    color: "text-chart-2",
  },
]

export function AlertStats() {
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
