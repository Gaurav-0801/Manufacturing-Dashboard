"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"

const performanceData = [
  { month: "Jul", onTime: 85, quality: 4.1, cost: 245000, performance: 82.5 },
  { month: "Aug", onTime: 88, quality: 4.3, cost: 238000, performance: 85.2 },
  { month: "Sep", onTime: 92, quality: 4.2, cost: 251000, performance: 87.8 },
  { month: "Oct", onTime: 87, quality: 4.4, cost: 259000, performance: 86.1 },
  { month: "Nov", onTime: 89, quality: 4.2, cost: 267000, performance: 87.9 },
  { month: "Dec", onTime: 91, quality: 4.5, cost: 259000, performance: 89.2 },
]

const quarterlyData = [
  { period: "Q1 2023", onTime: 83, quality: 3.9, cost: 720000, performance: 81.2 },
  { period: "Q2 2023", onTime: 86, quality: 4.1, cost: 734000, performance: 84.5 },
  { period: "Q3 2023", onTime: 89, quality: 4.3, cost: 754000, performance: 87.1 },
  { period: "Q4 2023", onTime: 89, quality: 4.4, cost: 785000, performance: 87.2 },
]

export function PerformanceTrends() {
  const [timeframe, setTimeframe] = useState("monthly")
  const data = timeframe === "monthly" ? performanceData : quarterlyData

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Performance Trends</CardTitle>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey={timeframe === "monthly" ? "month" : "period"} className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="performance"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              name="Overall Performance %"
              dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="onTime"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="On-Time Delivery %"
              dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="quality"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              name="Quality Score"
              dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
