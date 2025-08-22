"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface EditShipmentDialogProps {
  shipment: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditShipmentDialog({ shipment, open, onOpenChange }: EditShipmentDialogProps) {
  const [formData, setFormData] = useState({
    status: "",
    actualDate: "",
    progress: 0,
    notes: "",
  })

  useEffect(() => {
    if (shipment) {
      setFormData({
        status: shipment.status || "",
        actualDate: shipment.actualDate || "",
        progress: shipment.progress || 0,
        notes: shipment.notes || "",
      })
    }
  }, [shipment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to update the shipment
    console.log("Updating shipment:", { id: shipment?.id, ...formData })
    onOpenChange(false)
  }

  if (!shipment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Shipment Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tracking Number</Label>
            <div className="font-mono text-sm text-muted-foreground p-2 bg-muted rounded">
              {shipment.trackingNumber}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="DELAYED">Delayed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="RETURNED">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-progress">Progress (%)</Label>
            <Input
              id="edit-progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number.parseInt(e.target.value) || 0 })}
            />
          </div>

          {formData.status === "DELIVERED" && (
            <div className="space-y-2">
              <Label htmlFor="edit-actual">Actual Delivery Date</Label>
              <Input
                id="edit-actual"
                type="date"
                value={formData.actualDate}
                onChange={(e) => setFormData({ ...formData, actualDate: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Update notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Shipment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
