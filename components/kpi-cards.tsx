"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, Truck, Users, AlertCircle, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface KPIData {
  totalCostSavings: number
  onTimeDeliveryRate: number
  inventoryValue: number
  activeSuppliers: number
  totalShipments: number
  onTimeDeliveries: number
  setupRequired?: boolean
  error?: string
  message?: string
}

export function KPICards() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [setupRequired, setSetupRequired] = useState(false)

  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        setError(null)
        console.log("[v0] Fetching KPI data...")

        const response = await fetch("/api/kpis")
        console.log("[v0] Response status:", response.status)
        console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const textResponse = await response.text()
          console.error("[v0] Non-JSON response received:", textResponse.substring(0, 200))
          throw new Error(`Server returned ${response.status}: ${textResponse.substring(0, 100)}`)
        }

        const data = await response.json()
        console.log("[v0] KPI response:", data)

        if (data.setupRequired || data.error === "Database not initialized") {
          setSetupRequired(true)
          setKpiData({
            totalCostSavings: 0,
            onTimeDeliveryRate: 0,
            inventoryValue: 0,
            activeSuppliers: 0,
            totalShipments: 0,
            onTimeDeliveries: 0,
          })
          return
        }

        if (data.error && !data.setupRequired) {
          console.warn("[v0] API returned error but continuing with default values:", data.error)
        }

        setKpiData({
          totalCostSavings: data.totalCostSavings || 0,
          onTimeDeliveryRate: data.onTimeDeliveryRate || 0,
          inventoryValue: data.inventoryValue || 0,
          activeSuppliers: data.activeSuppliers || 0,
          totalShipments: data.totalShipments || 0,
          onTimeDeliveries: data.onTimeDeliveries || 0,
        })
        setSetupRequired(false)
      } catch (error) {
        console.error("[v0] Error fetching KPI data:", error)
        if (error instanceof Error && error.message.includes("Failed to execute 'json'")) {
          setError("Server returned invalid response. Please check if the database is properly set up.")
        } else {
          setError(error instanceof Error ? error.message : "Failed to load KPI data")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchKPIData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchKPIData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (setupRequired) {
    return (
      <Alert className="mb-6 border-warning bg-warning/10">
        <Database className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <strong>Database Setup Required</strong>
            <br />
            The manufacturing database needs to be initialized with sample data to display KPIs and enable full
            functionality.
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="ml-4">
            Refresh
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

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
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Unable to load KPI data: {error}</AlertDescription>
      </Alert>
    )
  }

  if (!kpiData) return null

  const kpis = [
    {
      title: "Total Cost Savings",
      value: `$${kpiData.totalCostSavings.toLocaleString()}`,
      target: "$300,000",
      change: kpiData.totalCostSavings > 250000 ? "+12.5%" : "-5.2%",
      trend: kpiData.totalCostSavings > 250000 ? "up" : "down",
      icon: DollarSign,
      color: "text-chart-2",
    },
    {
      title: "On-Time Delivery",
      value: `${kpiData.onTimeDeliveryRate.toFixed(1)}%`,
      target: "95.0%",
      change: kpiData.onTimeDeliveryRate >= 90 ? "+2.1%" : "-2.1%",
      trend: kpiData.onTimeDeliveryRate >= 90 ? "up" : "down",
      icon: Truck,
      color: "text-chart-3",
    },
    {
      title: "Inventory Value",
      value: `$${(kpiData.inventoryValue / 1000000).toFixed(1)}M`,
      target: "$1.5M",
      change: kpiData.inventoryValue > 1200000 ? "+8.3%" : "-3.1%",
      trend: kpiData.inventoryValue > 1200000 ? "up" : "down",
      icon: Package,
      color: "text-chart-1",
    },
    {
      title: "Active Suppliers",
      value: kpiData.activeSuppliers.toString(),
      target: "50",
      change: kpiData.activeSuppliers >= 45 ? `+${kpiData.activeSuppliers - 44}` : `${kpiData.activeSuppliers - 47}`,
      trend: kpiData.activeSuppliers >= 45 ? "up" : "down",
      icon: Users,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={kpi.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <Icon className={`h-5 w-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-card-foreground">{kpi.value}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Target: {kpi.target}</div>
                  <Badge variant={kpi.trend === "up" ? "default" : "destructive"} className="gap-1">
                    <TrendIcon className="h-3 w-3" />
                    {kpi.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
