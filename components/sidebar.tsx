"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, Truck, Users, AlertTriangle, Settings, Home, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Suppliers", href: "/suppliers", icon: Users },
  { name: "Shipments", href: "/shipments", icon: Truck },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle, badge: "26" },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-4 border-b border-sidebar-border">
          <BarChart3 className="h-8 w-8 text-sidebar-primary" />
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-sidebar-foreground">ManufacturingSCM</h1>
            <p className="text-sm text-sidebar-foreground/70">Supply Chain Control</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isCurrent = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isCurrent ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    isCurrent
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                  {item.badge && (
                    <Badge className="ml-auto bg-destructive text-destructive-foreground">{item.badge}</Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-primary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Plant Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
