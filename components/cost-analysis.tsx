"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useState } from "react"

const costBreakdown = [
  { category: "Raw Materials", amount: 450000, percentage: 52 },
  { category: "Electronics", amount: 280000, percentage: 32 },
  { category: "Mechanical Parts", amount: 95000, percentage: 11 },
  { category: "Tools & Equipment", amount: 35000, percentage: 4 },
  { category: "Consumables", amount: 8000, percentage: 1 },
]

const costTrends = [
  { month: "Jul", materials: 420000, electronics: 260000, mechanical: 88000, savings: 22000 },
  { month: "Aug", materials: 435000, electronics: 270000, mechanical: 92000, savings: 28000 },
  { month: "Sep", materials: 445000, electronics: 275000, mechanical: 94000, savings: 31000 },
  { month: "Oct", materials: 450000, electronics: 280000, mechanical: 95000, savings: 35000 },
  { month: "Nov", materials: 448000, electronics: 278000, mechanical: 93000, savings: 38000 },
  { month: "Dec", materials: 450000, electronics: 280000, mechanical: 95000, savings: 42000 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function CostAnalysis() {
  const [view, setView] = useState("breakdown")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Cost Analysis</CardTitle>
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakdown">Breakdown</SelectItem>
            <SelectItem value="trends">Trends</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {view === "breakdown" ? (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {costBreakdown.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm text-card-foreground">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${item.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costTrends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
              />
              <Bar dataKey="materials" fill="hsl(var(--chart-1))" name="Raw Materials" />
              <Bar dataKey="electronics" fill="hsl(var(--chart-2))" name="Electronics" />
              <Bar dataKey="mechanical" fill="hsl(var(--chart-3))" name="Mechanical" />
              <Bar dataKey="savings" fill="hsl(var(--chart-4))" name="Cost Savings" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
