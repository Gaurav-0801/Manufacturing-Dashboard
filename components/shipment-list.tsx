"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MoreHorizontal, Edit, Eye, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditShipmentDialog } from "@/components/edit-shipment-dialog"
import { ShipmentDetailsDialog } from "@/components/shipment-details-dialog"
import { Progress } from "@/components/ui/progress"

const shipments = [
  {
    id: "1",
    trackingNumber: "SCM-2024-001",
    supplier: "SteelCorp Industries",
    status: "IN_TRANSIT",
    expectedDate: "2024-01-15",
    actualDate: null,
    origin: "Detroit, MI",
    destination: "Manufacturing Plant A",
    totalValue: 45000,
    weight: 2500.5,
    progress: 75,
    items: [
      { sku: "STL-001", name: "Steel Beams", quantity: 50, unitPrice: 850 },
      { sku: "STL-002", name: "Steel Plates", quantity: 25, unitPrice: 320 },
    ],
  },
  {
    id: "2",
    trackingNumber: "SCM-2024-002",
    supplier: "Global Components Ltd",
    status: "DELIVERED",
    expectedDate: "2024-01-10",
    actualDate: "2024-01-09",
    origin: "Chicago, IL",
    destination: "Manufacturing Plant B",
    totalValue: 28000,
    weight: 1200.0,
    progress: 100,
    items: [{ sku: "CMP-001", name: "Electronic Components", quantity: 100, unitPrice: 280 }],
  },
  {
    id: "3",
    trackingNumber: "SCM-2024-003",
    supplier: "Precision Parts Co",
    status: "DELAYED",
    expectedDate: "2024-01-12",
    actualDate: null,
    origin: "Cleveland, OH",
    destination: "Manufacturing Plant C",
    totalValue: 15000,
    weight: 800.0,
    progress: 45,
    items: [{ sku: "PRC-001", name: "Precision Gears", quantity: 200, unitPrice: 75 }],
  },
  {
    id: "4",
    trackingNumber: "SCM-2024-004",
    supplier: "TechSupply Corp",
    status: "PENDING",
    expectedDate: "2024-01-18",
    actualDate: null,
    origin: "Austin, TX",
    destination: "Manufacturing Plant D",
    totalValue: 32000,
    weight: 1500.0,
    progress: 0,
    items: [{ sku: "TCH-001", name: "Circuit Boards", quantity: 150, unitPrice: 213 }],
  },
]

const statusConfig = {
  PENDING: { color: "bg-muted text-muted-foreground", label: "Pending" },
  IN_TRANSIT: { color: "bg-chart-4 text-white", label: "In Transit" },
  DELIVERED: { color: "bg-chart-2 text-white", label: "Delivered" },
  DELAYED: { color: "bg-chart-3 text-white", label: "Delayed" },
  CANCELLED: { color: "bg-destructive text-destructive-foreground", label: "Cancelled" },
  RETURNED: { color: "bg-secondary text-secondary-foreground", label: "Returned" },
}

export function ShipmentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleEdit = (shipment: any) => {
    setSelectedShipment(shipment)
    setIsEditDialogOpen(true)
  }

  const handleViewDetails = (shipment: any) => {
    setSelectedShipment(shipment)
    setIsDetailsDialogOpen(true)
  }

  const getProgressColor = (status: string, progress: number) => {
    if (status === "DELIVERED") return "bg-chart-2"
    if (status === "DELAYED") return "bg-chart-3"
    if (status === "IN_TRANSIT") return "bg-chart-4"
    return "bg-muted"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Shipments</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shipments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="DELAYED">Delayed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => {
              const config = statusConfig[shipment.status as keyof typeof statusConfig]
              const isOverdue = new Date(shipment.expectedDate) < new Date() && shipment.status !== "DELIVERED"

              return (
                <TableRow key={shipment.id}>
                  <TableCell>
                    <div className="font-mono font-medium text-card-foreground">{shipment.trackingNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-card-foreground">{shipment.supplier}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-card-foreground">{shipment.origin}</div>
                      <div className="text-xs text-muted-foreground">→ {shipment.destination}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{shipment.progress}%</span>
                      </div>
                      <Progress
                        value={shipment.progress}
                        className={`h-2 ${getProgressColor(shipment.status, shipment.progress)}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-card-foreground">${shipment.totalValue.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{shipment.weight} lbs</div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-sm ${isOverdue ? "text-chart-3 font-medium" : "text-card-foreground"}`}>
                      {new Date(shipment.expectedDate).toLocaleDateString()}
                    </div>
                    {shipment.actualDate && (
                      <div className="text-xs text-chart-2">
                        Delivered: {new Date(shipment.actualDate).toLocaleDateString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={config.color}>{config.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(shipment)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(shipment)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Location
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>

      <EditShipmentDialog shipment={selectedShipment} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      <ShipmentDetailsDialog
        shipment={selectedShipment}
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
      />
    </Card>
  )
}
