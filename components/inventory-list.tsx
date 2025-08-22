"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MoreHorizontal, Edit, Plus, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditInventoryDialog } from "@/components/edit-inventory-dialog"
import { StockAdjustmentDialog } from "@/components/stock-adjustment-dialog"
import { Progress } from "@/components/ui/progress"

const inventoryItems = [
  {
    id: "1",
    sku: "STL-001",
    name: "Steel Beams",
    description: "High-grade structural steel beams",
    category: "Raw Materials",
    supplier: "SteelCorp Industries",
    currentStock: 150,
    minStockLevel: 50,
    maxStockLevel: 500,
    unitCost: 850.0,
    totalValue: 127500.0,
    location: "Warehouse A-1",
    lastRestocked: "2024-01-10",
  },
  {
    id: "2",
    sku: "CMP-001",
    name: "Electronic Components",
    description: "Microprocessors and circuit boards",
    category: "Electronics",
    supplier: "Global Components Ltd",
    currentStock: 25,
    minStockLevel: 100,
    maxStockLevel: 1000,
    unitCost: 280.0,
    totalValue: 7000.0,
    location: "Warehouse B-2",
    lastRestocked: "2024-01-08",
  },
  {
    id: "3",
    sku: "PRC-001",
    name: "Precision Gears",
    description: "High-precision mechanical gears",
    category: "Mechanical Parts",
    supplier: "Precision Parts Co",
    currentStock: 300,
    minStockLevel: 200,
    maxStockLevel: 800,
    unitCost: 75.0,
    totalValue: 22500.0,
    location: "Warehouse C-3",
    lastRestocked: "2024-01-12",
  },
  {
    id: "4",
    sku: "TCH-001",
    name: "Circuit Boards",
    description: "Advanced circuit boards for automation",
    category: "Electronics",
    supplier: "TechSupply Corp",
    currentStock: 450,
    minStockLevel: 300,
    maxStockLevel: 1200,
    unitCost: 213.0,
    totalValue: 95850.0,
    location: "Warehouse B-1",
    lastRestocked: "2024-01-15",
  },
]

const categories = ["All Categories", "Raw Materials", "Electronics", "Mechanical Parts", "Tools", "Consumables"]

export function InventoryList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [stockFilter, setStockFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAdjustmentDialogOpen, setIsAdjustmentDialogOpen] = useState(false)

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All Categories" || item.category === categoryFilter
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.currentStock <= item.minStockLevel) ||
      (stockFilter === "normal" && item.currentStock > item.minStockLevel && item.currentStock < item.maxStockLevel) ||
      (stockFilter === "high" && item.currentStock >= item.maxStockLevel)
    return matchesSearch && matchesCategory && matchesStock
  })

  const getStockStatus = (item: any) => {
    if (item.currentStock <= item.minStockLevel) {
      return { status: "Low Stock", color: "bg-chart-3 text-white", progress: 25 }
    }
    if (item.currentStock >= item.maxStockLevel) {
      return { status: "Overstock", color: "bg-chart-4 text-white", progress: 100 }
    }
    const progress = ((item.currentStock - item.minStockLevel) / (item.maxStockLevel - item.minStockLevel)) * 100
    return { status: "Normal", color: "bg-chart-2 text-white", progress }
  }

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleStockAdjustment = (item: any) => {
    setSelectedItem(item)
    setIsAdjustmentDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Inventory Items</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">Overstock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const stockStatus = getStockStatus(item)

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-card-foreground">{item.currentStock}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.minStockLevel}-{item.maxStockLevel}
                        </span>
                      </div>
                      <Progress value={stockStatus.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-card-foreground">${item.unitCost.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-chart-2">${item.totalValue.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-card-foreground">{item.location}</div>
                    <div className="text-xs text-muted-foreground">
                      Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={stockStatus.color}>{stockStatus.status}</Badge>
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
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStockAdjustment(item)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adjust Stock
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

      <EditInventoryDialog item={selectedItem} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
      <StockAdjustmentDialog
        item={selectedItem}
        open={isAdjustmentDialogOpen}
        onOpenChange={setIsAdjustmentDialogOpen}
      />
    </Card>
  )
}
