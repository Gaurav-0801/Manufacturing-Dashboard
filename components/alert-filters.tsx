"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw } from "lucide-react"

export function AlertFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filterOptions = [
    { key: "unread", label: "Unread", count: 18 },
    { key: "today", label: "Today", count: 26 },
    { key: "this-week", label: "This Week", count: 45 },
    { key: "critical", label: "Critical", count: 3 },
  ]

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
            {filterOptions.map((option) => (
              <Button
                key={option.key}
                variant={activeFilters.includes(option.key) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(option.key)}
                className="gap-2"
              >
                {option.label}
                <Badge variant="secondary" className="text-xs">
                  {option.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                <SelectItem value="SHIPMENT_DELAY">Shipment Delay</SelectItem>
                <SelectItem value="QUALITY_ISSUE">Quality Issue</SelectItem>
                <SelectItem value="COST_VARIANCE">Cost Variance</SelectItem>
                <SelectItem value="SUPPLIER_PERFORMANCE">Supplier Performance</SelectItem>
                <SelectItem value="SYSTEM_NOTIFICATION">System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="gap-1">
                  {filterOptions.find((f) => f.key === filter)?.label}
                  <button
                    onClick={() => toggleFilter(filter)}
                    className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
