"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditSupplierDialogProps {
  supplier: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSupplierDialog({ supplier, open, onOpenChange }: EditSupplierDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    performanceScore: 0,
    qualityRating: 0,
    costSavings: 0,
    status: "ACTIVE",
  })

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        performanceScore: supplier.performanceScore || 0,
        qualityRating: supplier.qualityRating || 0,
        costSavings: supplier.costSavings || 0,
        status: supplier.status || "ACTIVE",
      })
    }
  }, [supplier])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to update the supplier
    console.log("Updating supplier:", { id: supplier?.id, ...formData })
    onOpenChange(false)
  }

  if (!supplier) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Company Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Contact Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Address</Label>
            <Textarea
              id="edit-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-performance">Performance Score (%)</Label>
              <Input
                id="edit-performance"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.performanceScore}
                onChange={(e) => setFormData({ ...formData, performanceScore: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-quality">Quality Rating</Label>
              <Input
                id="edit-quality"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.qualityRating}
                onChange={(e) => setFormData({ ...formData, qualityRating: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-savings">Cost Savings ($)</Label>
            <Input
              id="edit-savings"
              type="number"
              min="0"
              value={formData.costSavings}
              onChange={(e) => setFormData({ ...formData, costSavings: Number.parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Supplier</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
