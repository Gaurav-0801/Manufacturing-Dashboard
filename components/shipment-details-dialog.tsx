"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MapPin, Package, DollarSign, Calendar, Weight } from "lucide-react"

interface ShipmentDetailsDialogProps {
  shipment: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  PENDING: { color: "bg-muted text-muted-foreground", label: "Pending" },
  IN_TRANSIT: { color: "bg-chart-4 text-white", label: "In Transit" },
  DELIVERED: { color: "bg-chart-2 text-white", label: "Delivered" },
  DELAYED: { color: "bg-chart-3 text-white", label: "Delayed" },
  CANCELLED: { color: "bg-destructive text-destructive-foreground", label: "Cancelled" },
  RETURNED: { color: "bg-secondary text-secondary-foreground", label: "Returned" },
}

export function ShipmentDetailsDialog({ shipment, open, onOpenChange }: ShipmentDetailsDialogProps) {
  if (!shipment) return null

  const config = statusConfig[shipment.status as keyof typeof statusConfig]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Shipment Details</span>
            <Badge className={config.color}>{config.label}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Tracking Number</div>
                  <div className="font-mono font-medium">{shipment.trackingNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Supplier</div>
                  <div className="font-medium">{shipment.supplier}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="flex items-center gap-3">
                  <Progress value={shipment.progress} className="flex-1" />
                  <span className="text-sm font-medium">{shipment.progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Route Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Origin</div>
                  <div className="font-medium">{shipment.origin}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Destination</div>
                  <div className="font-medium">{shipment.destination}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                      <div className="font-medium text-lg">${shipment.totalValue.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Weight className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Weight</div>
                      <div className="font-medium">{shipment.weight} lbs</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Expected Delivery</div>
                      <div className="font-medium">{new Date(shipment.expectedDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {shipment.actualDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-chart-2" />
                      <div>
                        <div className="text-sm text-muted-foreground">Actual Delivery</div>
                        <div className="font-medium text-chart-2">
                          {new Date(shipment.actualDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Items ({shipment.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shipment.items.map((item: any, index: number) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(item.quantity * item.unitPrice).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × ${item.unitPrice}
                        </div>
                      </div>
                    </div>
                    {index < shipment.items.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
