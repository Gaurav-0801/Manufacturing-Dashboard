"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Package,
  Truck,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Bell,
  MoreHorizontal,
  Eye,
  Check,
  X,
} from "lucide-react"
import { AlertDetailsDialog } from "@/components/alert-details-dialog"

const alerts = [
  {
    id: "1",
    type: "LOW_STOCK",
    severity: "CRITICAL",
    title: "Critical Stock Alert",
    message: "Electronic Components (CMP-001) stock is critically low - only 5 units remaining",
    time: "2 minutes ago",
    isRead: false,
    isResolved: false,
    icon: Package,
    supplier: "Global Components Ltd",
    inventoryItem: "Electronic Components (CMP-001)",
    details: {
      currentStock: 5,
      minStock: 100,
      location: "Warehouse B-2",
      estimatedRunout: "2 days",
    },
  },
  {
    id: "2",
    type: "SHIPMENT_DELAY",
    severity: "HIGH",
    title: "Shipment Delayed",
    message: "Shipment SCM-2024-003 from Precision Parts Co is 3 days overdue",
    time: "15 minutes ago",
    isRead: false,
    isResolved: false,
    icon: Truck,
    supplier: "Precision Parts Co",
    shipment: "SCM-2024-003",
    details: {
      expectedDate: "2024-01-12",
      currentDate: "2024-01-15",
      daysOverdue: 3,
      value: "$15,000",
    },
  },
  {
    id: "3",
    type: "SUPPLIER_PERFORMANCE",
    severity: "MEDIUM",
    title: "Performance Decline",
    message: "Precision Parts Co performance score dropped to 78.9% - below 80% threshold",
    time: "1 hour ago",
    isRead: true,
    isResolved: false,
    icon: TrendingDown,
    supplier: "Precision Parts Co",
    details: {
      currentScore: 78.9,
      previousScore: 82.1,
      threshold: 80.0,
      onTimeRate: 83.7,
    },
  },
  {
    id: "4",
    type: "QUALITY_ISSUE",
    severity: "HIGH",
    title: "Quality Alert",
    message: "Quality rating for TechSupply Corp dropped below 4.0 - immediate review required",
    time: "2 hours ago",
    isRead: true,
    isResolved: false,
    icon: AlertTriangle,
    supplier: "TechSupply Corp",
    details: {
      currentRating: 3.8,
      previousRating: 4.2,
      threshold: 4.0,
      recentIssues: 3,
    },
  },
  {
    id: "5",
    type: "COST_VARIANCE",
    severity: "MEDIUM",
    title: "Cost Variance Detected",
    message: "Steel Beams unit cost increased by 15% from SteelCorp Industries",
    time: "4 hours ago",
    isRead: true,
    isResolved: true,
    icon: DollarSign,
    supplier: "SteelCorp Industries",
    inventoryItem: "Steel Beams (STL-001)",
    details: {
      oldCost: 850,
      newCost: 977.5,
      variance: 15,
      impact: "$19,125",
    },
  },
  {
    id: "6",
    type: "SYSTEM_NOTIFICATION",
    severity: "LOW",
    title: "System Update",
    message: "Monthly performance report has been generated and is ready for review",
    time: "6 hours ago",
    isRead: true,
    isResolved: true,
    icon: Bell,
    details: {
      reportType: "Monthly Performance",
      period: "December 2024",
      metrics: 15,
    },
  },
]

const severityConfig = {
  CRITICAL: { color: "bg-destructive text-destructive-foreground", textColor: "text-destructive" },
  HIGH: { color: "bg-chart-3 text-white", textColor: "text-chart-3" },
  MEDIUM: { color: "bg-chart-4 text-white", textColor: "text-chart-4" },
  LOW: { color: "bg-muted text-muted-foreground", textColor: "text-muted-foreground" },
}

export function AlertList() {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([])
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const handleSelectAlert = (alertId: string) => {
    setSelectedAlerts((prev) => (prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId]))
  }

  const handleSelectAll = () => {
    if (selectedAlerts.length === alerts.length) {
      setSelectedAlerts([])
    } else {
      setSelectedAlerts(alerts.map((alert) => alert.id))
    }
  }

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert)
    setIsDetailsDialogOpen(true)
  }

  const handleMarkAsRead = (alertIds: string[]) => {
    // Here you would typically call an API to mark alerts as read
    console.log("Marking as read:", alertIds)
  }

  const handleResolve = (alertIds: string[]) => {
    // Here you would typically call an API to resolve alerts
    console.log("Resolving alerts:", alertIds)
  }

  const getTimeColor = (time: string, isRead: boolean) => {
    if (isRead) return "text-muted-foreground"
    if (time.includes("minute")) return "text-chart-3"
    if (time.includes("hour")) return "text-chart-4"
    return "text-muted-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Alerts ({alerts.length})</CardTitle>
          <div className="flex items-center gap-2">
            {selectedAlerts.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(selectedAlerts)}>
                  Mark as Read ({selectedAlerts.length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleResolve(selectedAlerts)}>
                  Resolve ({selectedAlerts.length})
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedAlerts.length === alerts.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon
            const severityStyle = severityConfig[alert.severity as keyof typeof severityConfig]
            const isSelected = selectedAlerts.includes(alert.id)

            return (
              <div
                key={alert.id}
                className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                  isSelected ? "bg-accent/50 border-accent" : "border-border hover:bg-muted/50"
                } ${!alert.isRead ? "bg-accent/10" : ""}`}
              >
                <Checkbox checked={isSelected} onCheckedChange={() => handleSelectAlert(alert.id)} />

                <div className={`p-2 rounded-full ${alert.isResolved ? "bg-muted" : "bg-background border"}`}>
                  <Icon className={`h-4 w-4 ${alert.isResolved ? "text-muted-foreground" : severityStyle.textColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${!alert.isRead ? "font-semibold" : ""} text-card-foreground`}>
                      {alert.title}
                    </h4>
                    <Badge className={severityStyle.color}>{alert.severity}</Badge>
                    {!alert.isRead && <div className="w-2 h-2 bg-chart-3 rounded-full" />}
                    {alert.isResolved && <Badge variant="outline">Resolved</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className={getTimeColor(alert.time, alert.isRead)}>{alert.time}</span>
                    {alert.supplier && <span className="text-muted-foreground">Supplier: {alert.supplier}</span>}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(alert)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    {!alert.isRead && (
                      <DropdownMenuItem onClick={() => handleMarkAsRead([alert.id])}>
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Read
                      </DropdownMenuItem>
                    )}
                    {!alert.isResolved && (
                      <DropdownMenuItem onClick={() => handleResolve([alert.id])}>
                        <Check className="h-4 w-4 mr-2" />
                        Resolve
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive">
                      <X className="h-4 w-4 mr-2" />
                      Dismiss
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </div>
      </CardContent>

      <AlertDetailsDialog alert={selectedAlert} open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen} />
    </Card>
  )
}
