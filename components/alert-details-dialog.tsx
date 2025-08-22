"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, TrendingDown, AlertTriangle, DollarSign, Bell, Clock, User } from "lucide-react"

interface AlertDetailsDialogProps {
  alert: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const severityConfig = {
  CRITICAL: { color: "bg-destructive text-destructive-foreground", textColor: "text-destructive" },
  HIGH: { color: "bg-chart-3 text-white", textColor: "text-chart-3" },
  MEDIUM: { color: "bg-chart-4 text-white", textColor: "text-chart-4" },
  LOW: { color: "bg-muted text-muted-foreground", textColor: "text-muted-foreground" },
}

const typeConfig = {
  LOW_STOCK: { icon: Package, label: "Low Stock Alert" },
  SHIPMENT_DELAY: { icon: Truck, label: "Shipment Delay" },
  SUPPLIER_PERFORMANCE: { icon: TrendingDown, label: "Supplier Performance" },
  QUALITY_ISSUE: { icon: AlertTriangle, label: "Quality Issue" },
  COST_VARIANCE: { icon: DollarSign, label: "Cost Variance" },
  SYSTEM_NOTIFICATION: { icon: Bell, label: "System Notification" },
}

export function AlertDetailsDialog({ alert, open, onOpenChange }: AlertDetailsDialogProps) {
  if (!alert) return null

  const severityStyle = severityConfig[alert.severity as keyof typeof severityConfig]
  const typeInfo = typeConfig[alert.type as keyof typeof typeConfig]
  const Icon = typeInfo.icon

  const renderDetails = () => {
    switch (alert.type) {
      case "LOW_STOCK":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Stock</div>
                <div className="text-2xl font-bold text-destructive">{alert.details.currentStock}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Minimum Required</div>
                <div className="text-2xl font-bold text-card-foreground">{alert.details.minStock}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{alert.details.location}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Estimated Runout</div>
                <div className="font-medium text-destructive">{alert.details.estimatedRunout}</div>
              </div>
            </div>
          </div>
        )

      case "SHIPMENT_DELAY":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Expected Date</div>
                <div className="font-medium">{alert.details.expectedDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Days Overdue</div>
                <div className="text-2xl font-bold text-destructive">{alert.details.daysOverdue}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Shipment Value</div>
              <div className="text-xl font-bold text-card-foreground">{alert.details.value}</div>
            </div>
          </div>
        )

      case "SUPPLIER_PERFORMANCE":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Score</div>
                <div className="text-2xl font-bold text-chart-3">{alert.details.currentScore}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Previous Score</div>
                <div className="font-medium">{alert.details.previousScore}%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Threshold</div>
                <div className="font-medium">{alert.details.threshold}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
                <div className="font-medium">{alert.details.onTimeRate}%</div>
              </div>
            </div>
          </div>
        )

      case "QUALITY_ISSUE":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Rating</div>
                <div className="text-2xl font-bold text-chart-3">{alert.details.currentRating}/5</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Previous Rating</div>
                <div className="font-medium">{alert.details.previousRating}/5</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Threshold</div>
                <div className="font-medium">{alert.details.threshold}/5</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Recent Issues</div>
                <div className="font-medium text-destructive">{alert.details.recentIssues}</div>
              </div>
            </div>
          </div>
        )

      case "COST_VARIANCE":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Old Cost</div>
                <div className="font-medium">${alert.details.oldCost}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">New Cost</div>
                <div className="font-medium">${alert.details.newCost}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Variance</div>
                <div className="text-2xl font-bold text-chart-3">+{alert.details.variance}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Financial Impact</div>
                <div className="font-medium text-destructive">{alert.details.impact}</div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <Icon className="h-12 w-12 mx-auto mb-4" />
            <p>Additional details for this alert type are not available.</p>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${severityStyle.textColor}`} />
            <span>{alert.title}</span>
            <Badge className={severityStyle.color}>{alert.severity}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alert Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="font-medium">{typeInfo.label}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="font-medium">{alert.time}</div>
                  </div>
                </div>
              </div>

              {alert.supplier && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Supplier</div>
                    <div className="font-medium">{alert.supplier}</div>
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <div className="text-sm text-muted-foreground mb-2">Message</div>
                <p className="text-card-foreground">{alert.message}</p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent>{renderDetails()}</CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {!alert.isRead && <Button variant="outline">Mark as Read</Button>}
            {!alert.isResolved && <Button>Resolve Alert</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
