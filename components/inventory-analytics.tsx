"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const inventoryTrends = [
  { month: "Jul", value: 1150000, turnover: 3.8, stockouts: 5 },
  { month: "Aug", value: 1180000, turnover: 4.1, stockouts: 3 },
  { month: "Sep", value: 1200000, turnover: 4.3, stockouts: 2 },
  { month: "Oct", value: 1220000, turnover: 4.2, stockouts: 4 },
  { month: "Nov", value: 1190000, turnover: 4.5, stockouts: 1 },
  { month: "Dec", value: 1200000, turnover: 4.2, stockouts: 2 },
]

const categoryAnalysis = [
  {
    category: "Raw Materials",
    items: 45,
    value: 650000,
    turnover: 3.2,
    lowStock: 3,
    status: "healthy",
  },
  {
    category: "Electronics",
    items: 28,
    value: 380000,
    turnover: 5.1,
    lowStock: 8,
    status: "attention",
  },
  {
    category: "Mechanical Parts",
    items: 67,
    value: 145000,
    turnover: 4.8,
    lowStock: 2,
    status: "healthy",
  },
  {
    category: "Tools & Equipment",
    items: 23,
    value: 25000,
    turnover: 2.1,
    lowStock: 1,
    status: "slow",
  },
]

const statusConfig = {
  healthy: { color: "bg-chart-2 text-white", label: "Healthy" },
  attention: { color: "bg-chart-3 text-white", label: "Needs Attention" },
  slow: { color: "bg-chart-4 text-white", label: "Slow Moving" },
}

export function InventoryAnalytics() {
  const getTurnoverColor = (turnover: number) => {
    if (turnover >= 4.5) return "text-chart-2"
    if (turnover >= 3.0) return "text-chart-4"
    return "text-chart-3"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Inventory Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inventory Value Trend */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Inventory Value Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={inventoryTrends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: any, name: string) => {
                  if (name === "value") return [`$${value.toLocaleString()}`, "Inventory Value"]
                  if (name === "turnover") return [`${value}x`, "Turnover Rate"]
                  return [value, name]
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Category Performance</h4>
          <div className="space-y-3">
            {categoryAnalysis.map((category) => {
              const statusStyle = statusConfig[category.status as keyof typeof statusConfig]

              return (
                <div key={category.category} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-card-foreground">{category.category}</div>
                    <Badge className={statusStyle.color}>{statusStyle.label}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Items</div>
                      <div className="font-medium">{category.items}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Value</div>
                      <div className="font-medium">${category.value.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Turnover</div>
                      <div className={`font-medium ${getTurnoverColor(category.turnover)}`}>{category.turnover}x</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Low Stock</div>
                      <div className={`font-medium ${category.lowStock > 5 ? "text-chart-3" : "text-card-foreground"}`}>
                        {category.lowStock} items
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
