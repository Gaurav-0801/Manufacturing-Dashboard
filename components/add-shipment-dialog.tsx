"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

const suppliers = [
  { id: "1", name: "SteelCorp Industries" },
  { id: "2", name: "Global Components Ltd" },
  { id: "3", name: "Precision Parts Co" },
  { id: "4", name: "TechSupply Corp" },
]

export function AddShipmentDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    trackingNumber: "",
    supplierId: "",
    origin: "",
    destination: "",
    expectedDate: "",
    totalValue: "",
    weight: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to create the shipment
    console.log("Creating shipment:", formData)
    setOpen(false)
    setFormData({
      trackingNumber: "",
      supplierId: "",
      origin: "",
      destination: "",
      expectedDate: "",
      totalValue: "",
      weight: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Shipment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input
              id="tracking"
              value={formData.trackingNumber}
              onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
              placeholder="SCM-2024-XXX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select
              value={formData.supplierId}
              onValueChange={(value) => setFormData({ ...formData, supplierId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="City, State"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Plant Location"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected">Expected Delivery Date</Label>
            <Input
              id="expected"
              type="date"
              value={formData.expectedDate}
              onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Total Value ($)</Label>
              <Input
                id="value"
                type="number"
                value={formData.totalValue}
                onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="0.0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Shipment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
