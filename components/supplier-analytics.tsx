"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const supplierPerformance = [
  {
    name: "Global Components",
    score: 92.3,
    orders: 203,
    onTime: 96.1,
    quality: 4.6,
    savings: 89000,
    trend: "up",
  },
  {
    name: "SteelCorp Industries",
    score: 87.5,
    orders: 156,
    onTime: 91.0,
    quality: 4.2,
    savings: 125000,
    trend: "stable",
  },
  {
    name: "TechSupply Corp",
    score: 85.2,
    orders: 134,
    onTime: 93.3,
    quality: 4.1,
    savings: 67000,
    trend: "up",
  },
  {
    name: "Precision Parts",
    score: 78.9,
    orders: 98,
    onTime: 83.7,
    quality: 3.8,
    savings: 45000,
    trend: "down",
  },
]

const riskAnalysis = [
  { supplier: "Global Components", risk: 15, category: "Low Risk" },
  { supplier: "SteelCorp", risk: 25, category: "Low Risk" },
  { supplier: "TechSupply", risk: 35, category: "Medium Risk" },
  { supplier: "Precision Parts", risk: 65, category: "High Risk" },
]

export function SupplierAnalytics() {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-chart-2"
    if (score >= 80) return "text-chart-4"
    return "text-chart-3"
  }

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "up":
        return <Badge className="bg-chart-2 text-white">Improving</Badge>
      case "down":
        return <Badge className="bg-chart-3 text-white">Declining</Badge>
      default:
        return <Badge variant="outline">Stable</Badge>
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk <= 30) return "bg-chart-2"
    if (risk <= 50) return "bg-chart-4"
    return "bg-chart-3"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Supplier Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Rankings */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Performance Rankings</h4>
          {supplierPerformance.map((supplier, index) => (
            <div key={supplier.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-card-foreground">{supplier.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {supplier.orders} orders • {supplier.onTime}% on-time
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-lg font-bold ${getScoreColor(supplier.score)}`}>{supplier.score}%</div>
                  <div className="text-xs text-muted-foreground">${supplier.savings.toLocaleString()} saved</div>
                </div>
                {getTrendBadge(supplier.trend)}
              </div>
            </div>
          ))}
        </div>

        {/* Risk Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Risk Analysis</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={riskAnalysis} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" domain={[0, 100]} className="text-muted-foreground" />
              <YAxis dataKey="supplier" type="category" width={80} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => [`${value}%`, "Risk Score"]}
              />
              <Bar dataKey="risk" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
