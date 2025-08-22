"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react"
import { useEffect, useState } from "react"

interface AnalyticsData {
  overallPerformance: number
  costSavings: number
  qualityScore: number
  deliveryPerformance: number
  totalSuppliers: number
  avgPerformanceScore: number
}

const statusConfig = {
  excellent: { color: "bg-chart-2 text-white", icon: Award },
  good: { color: "bg-chart-4 text-white", icon: Target },
  warning: { color: "bg-chart-3 text-white", icon: TrendingDown },
  "needs-attention": { color: "bg-destructive text-destructive-foreground", icon: TrendingDown },
}

export function AnalyticsOverview() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("/api/analytics/overview")
        const data = await response.json()
        setAnalyticsData(data)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
    // Refresh every 60 seconds
    const interval = setInterval(fetchAnalyticsData, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-muted rounded w-full mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analyticsData) return null

  const getStatus = (value: number, target: number) => {
    const percentage = (value / target) * 100
    if (percentage >= 95) return "excellent"
    if (percentage >= 85) return "good"
    if (percentage >= 70) return "warning"
    return "needs-attention"
  }

  const metrics = [
    {
      title: "Overall Performance",
      value: `${analyticsData.overallPerformance.toFixed(1)}%`,
      target: "90%",
      change: analyticsData.overallPerformance > 85 ? "+2.1%" : "-1.5%",
      trend: analyticsData.overallPerformance > 85 ? "up" : "down",
      status: getStatus(analyticsData.overallPerformance, 90),
      description: "Weighted average across all KPIs",
    },
    {
      title: "Cost Efficiency",
      value: `$${(analyticsData.costSavings / 1000).toFixed(0)}K`,
      target: "$300K",
      change: analyticsData.costSavings > 250000 ? "+12.5%" : "-5.2%",
      trend: analyticsData.costSavings > 250000 ? "up" : "down",
      status: getStatus(analyticsData.costSavings, 300000),
      description: "Total cost savings achieved",
    },
    {
      title: "Quality Score",
      value: `${analyticsData.qualityScore.toFixed(1)}/5`,
      target: "4.5/5",
      change: analyticsData.qualityScore >= 4.0 ? "+0.2" : "-0.1",
      trend: analyticsData.qualityScore >= 4.0 ? "up" : "down",
      status: getStatus(analyticsData.qualityScore, 4.5),
      description: "Average supplier quality rating",
    },
    {
      title: "Delivery Performance",
      value: `${analyticsData.deliveryPerformance.toFixed(1)}%`,
      target: "95%",
      change: analyticsData.deliveryPerformance >= 90 ? "+1.2%" : "-2.1%",
      trend: analyticsData.deliveryPerformance >= 90 ? "up" : "down",
      status: getStatus(analyticsData.deliveryPerformance, 95),
      description: "On-time delivery rate",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
        const statusStyle = statusConfig[metric.status as keyof typeof statusConfig]
        const StatusIcon = statusStyle.icon

        return (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <StatusIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
                <div className="text-xs text-muted-foreground">/ {metric.target}</div>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={statusStyle.color}>{metric.status.replace("-", " ")}</Badge>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    metric.trend === "up" ? "text-chart-2" : "text-chart-3"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {metric.change}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
