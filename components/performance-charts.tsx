"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const performanceData = [
  { month: "Jan", onTime: 85, quality: 4.1, cost: 245000 },
  { month: "Feb", onTime: 88, quality: 4.3, cost: 238000 },
  { month: "Mar", onTime: 92, quality: 4.2, cost: 251000 },
  { month: "Apr", onTime: 87, quality: 4.4, cost: 259000 },
  { month: "May", onTime: 89, quality: 4.2, cost: 267000 },
  { month: "Jun", onTime: 91, quality: 4.5, cost: 259000 },
]

const supplierPerformance = [
  { name: "SteelCorp", score: 87.5, orders: 156 },
  { name: "GlobalComp", score: 92.3, orders: 203 },
  { name: "PrecisionParts", score: 78.9, orders: 98 },
  { name: "TechSupply", score: 85.2, orders: 134 },
  { name: "MetalWorks", score: 90.1, orders: 167 },
]

export function PerformanceCharts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="onTime"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                name="On-Time Delivery %"
              />
              <Line
                type="monotone"
                dataKey="quality"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                name="Quality Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Supplier Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplierPerformance}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
