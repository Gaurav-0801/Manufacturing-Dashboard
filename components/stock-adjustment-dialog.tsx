"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus } from "lucide-react"

interface StockAdjustmentDialogProps {
  item: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StockAdjustmentDialog({ item, open, onOpenChange }: StockAdjustmentDialogProps) {
  const [adjustmentType, setAdjustmentType] = useState("add")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (open) {
      setAdjustmentType("add")
      setQuantity("")
      setReason("")
      setNotes("")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const adjustmentQuantity = adjustmentType === "add" ? Number.parseInt(quantity) : -Number.parseInt(quantity)
    const newStock = item.currentStock + adjustmentQuantity

    // Here you would typically call an API to update the stock
    console.log("Stock adjustment:", {
      itemId: item?.id,
      oldStock: item?.currentStock,
      adjustment: adjustmentQuantity,
      newStock,
      reason,
      notes,
    })

    onOpenChange(false)
  }

  if (!item) return null

  const getStockStatus = (currentStock: number) => {
    if (currentStock <= item.minStockLevel) {
      return { status: "Low Stock", color: "bg-chart-3 text-white" }
    }
    if (currentStock >= item.maxStockLevel) {
      return { status: "Overstock", color: "bg-chart-4 text-white" }
    }
    return { status: "Normal", color: "bg-chart-2 text-white" }
  }

  const previewStock = quantity
    ? item.currentStock + (adjustmentType === "add" ? Number.parseInt(quantity) : -Number.parseInt(quantity))
    : item.currentStock

  const currentStatus = getStockStatus(item.currentStock)
  const previewStatus = getStockStatus(previewStock)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stock Adjustment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Item</Label>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Current Stock: {item.currentStock}</span>
                <Badge className={currentStatus.color}>{currentStatus.status}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjustment-type">Adjustment Type</Label>
            <Select value={adjustmentType} onValueChange={setAdjustmentType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Stock
                  </div>
                </SelectItem>
                <SelectItem value="remove">
                  <div className="flex items-center gap-2">
                    <Minus className="h-4 w-4" />
                    Remove Stock
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>

          {quantity && (
            <div className="p-3 bg-accent/10 rounded-lg">
              <div className="text-sm font-medium">Preview:</div>
              <div className="flex items-center justify-between mt-1">
                <span>
                  {item.currentStock} {adjustmentType === "add" ? "+" : "-"} {quantity} = {previewStock}
                </span>
                <Badge className={previewStatus.color}>{previewStatus.status}</Badge>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restock">Restock</SelectItem>
                <SelectItem value="damaged">Damaged Goods</SelectItem>
                <SelectItem value="sold">Sold/Used</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="audit">Inventory Audit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Apply Adjustment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
