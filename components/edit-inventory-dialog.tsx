"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditInventoryDialogProps {
  item: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = ["Raw Materials", "Electronics", "Mechanical Parts", "Tools", "Consumables"]

export function EditInventoryDialog({ item, open, onOpenChange }: EditInventoryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    minStockLevel: 0,
    maxStockLevel: 0,
    unitCost: 0,
    location: "",
  })

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        category: item.category || "",
        minStockLevel: item.minStockLevel || 0,
        maxStockLevel: item.maxStockLevel || 0,
        unitCost: item.unitCost || 0,
        location: item.location || "",
      })
    }
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to update the inventory item
    console.log("Updating inventory item:", { id: item?.id, ...formData })
    onOpenChange(false)
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>SKU</Label>
            <div className="font-mono text-sm text-muted-foreground p-2 bg-muted rounded">{item.sku}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-name">Item Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-min">Min Stock Level</Label>
              <Input
                id="edit-min"
                type="number"
                value={formData.minStockLevel}
                onChange={(e) => setFormData({ ...formData, minStockLevel: Number.parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-max">Max Stock Level</Label>
              <Input
                id="edit-max"
                type="number"
                value={formData.maxStockLevel}
                onChange={(e) => setFormData({ ...formData, maxStockLevel: Number.parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-cost">Unit Cost ($)</Label>
              <Input
                id="edit-cost"
                type="number"
                step="0.01"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: Number.parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
