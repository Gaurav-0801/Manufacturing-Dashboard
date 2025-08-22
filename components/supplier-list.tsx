"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditSupplierDialog } from "@/components/edit-supplier-dialog"

const suppliers = [
  {
    id: "1",
    name: "SteelCorp Industries",
    email: "orders@steelcorp.com",
    phone: "+1-555-0101",
    performanceScore: 87.5,
    totalOrders: 156,
    onTimeDeliveries: 142,
    qualityRating: 4.2,
    costSavings: 125000,
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Global Components Ltd",
    email: "supply@globalcomp.com",
    phone: "+1-555-0202",
    performanceScore: 92.3,
    totalOrders: 203,
    onTimeDeliveries: 195,
    qualityRating: 4.6,
    costSavings: 89000,
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Precision Parts Co",
    email: "info@precisionparts.com",
    phone: "+1-555-0303",
    performanceScore: 78.9,
    totalOrders: 98,
    onTimeDeliveries: 82,
    qualityRating: 3.8,
    costSavings: 45000,
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "TechSupply Corp",
    email: "contact@techsupply.com",
    phone: "+1-555-0404",
    performanceScore: 85.2,
    totalOrders: 134,
    onTimeDeliveries: 125,
    qualityRating: 4.1,
    costSavings: 67000,
    status: "ACTIVE",
  },
]

const statusConfig = {
  ACTIVE: { color: "bg-chart-2 text-white", label: "Active" },
  INACTIVE: { color: "bg-muted text-muted-foreground", label: "Inactive" },
  SUSPENDED: { color: "bg-destructive text-destructive-foreground", label: "Suspended" },
}

export function SupplierList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-chart-2"
    if (score >= 80) return "text-chart-4"
    return "text-chart-3"
  }

  const handleEdit = (supplier: any) => {
    setSelectedSupplier(supplier)
    setIsEditDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Suppliers</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
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
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Cost Savings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => {
              const config = statusConfig[supplier.status as keyof typeof statusConfig]
              const onTimeRate = ((supplier.onTimeDeliveries / supplier.totalOrders) * 100).toFixed(1)

              return (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className={`font-medium ${getPerformanceColor(supplier.performanceScore)}`}>
                        {supplier.performanceScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">{onTimeRate}% on-time</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-card-foreground">{supplier.totalOrders}</div>
                    <div className="text-xs text-muted-foreground">total orders</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-card-foreground">{supplier.qualityRating}</span>
                      <span className="text-muted-foreground">/5</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-chart-2">${supplier.costSavings.toLocaleString()}</div>
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(supplier)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Supplier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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

      <EditSupplierDialog supplier={selectedSupplier} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </Card>
  )
}
