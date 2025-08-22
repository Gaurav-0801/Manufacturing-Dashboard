import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    console.log("[v0] Starting KPI calculation...")

    try {
      // Test basic connection first
      await prisma.$queryRaw`SELECT 1`
      console.log("[v0] Database connection test successful")
    } catch (connectionError) {
      console.error("[v0] Database connection test failed:", connectionError)
      return NextResponse.json(
        {
          error: "Database not accessible",
          message: "Database file may not exist. Please run the initialization script.",
          setupRequired: true,
          totalCostSavings: 0,
          onTimeDeliveryRate: 0,
          inventoryValue: 0,
          activeSuppliers: 0,
          lowStockItems: 0,
          criticalAlerts: 0,
          highAlerts: 0,
          totalShipments: 0,
          onTimeDeliveries: 0,
        },
        { status: 200 },
      )
    }

    try {
      await prisma.$connect()
      console.log("[v0] Database connected successfully")

      // Check if tables exist by trying to count records
      const tableCheck = await Promise.all([
        prisma.supplier.count().catch(() => null),
        prisma.shipment.count().catch(() => null),
        prisma.inventoryItem.count().catch(() => null),
        prisma.alert.count().catch(() => null),
      ])

      if (tableCheck.some((count) => count === null)) {
        console.log("[v0] Database tables not found, returning setup message")
        return NextResponse.json(
          {
            error: "Database not initialized",
            message: "Please run the database initialization script first",
            setupRequired: true,
            totalCostSavings: 0,
            onTimeDeliveryRate: 0,
            inventoryValue: 0,
            activeSuppliers: 0,
            lowStockItems: 0,
            criticalAlerts: 0,
            highAlerts: 0,
            totalShipments: 0,
            onTimeDeliveries: 0,
          },
          { status: 200 },
        ) // Return 200 with default values instead of error
      }
    } catch (connectionError) {
      console.error("[v0] Database connection failed:", connectionError)
      return NextResponse.json(
        {
          error: "Database connection failed",
          message: "Unable to connect to database",
          totalCostSavings: 0,
          onTimeDeliveryRate: 0,
          inventoryValue: 0,
          activeSuppliers: 0,
          lowStockItems: 0,
          criticalAlerts: 0,
          highAlerts: 0,
          totalShipments: 0,
          onTimeDeliveries: 0,
        },
        { status: 200 },
      )
    }

    const [suppliers, shipments, inventory, alerts] = await Promise.all([
      prisma.supplier
        .findMany({
          include: {
            shipments: {
              where: { status: "DELIVERED" },
            },
          },
        })
        .catch((error) => {
          console.log("[v0] Error fetching suppliers:", error)
          return []
        }),
      prisma.shipment
        .findMany({
          where: { status: "DELIVERED" },
        })
        .catch((error) => {
          console.log("[v0] Error fetching shipments:", error)
          return []
        }),
      prisma.inventoryItem.findMany().catch((error) => {
        console.log("[v0] Error fetching inventory:", error)
        return []
      }),
      prisma.alert
        .findMany({
          where: { isResolved: false },
        })
        .catch((error) => {
          console.log("[v0] Error fetching alerts:", error)
          return []
        }),
    ])

    console.log(
      "[v0] Data fetched - Suppliers:",
      suppliers.length,
      "Shipments:",
      shipments.length,
      "Inventory:",
      inventory.length,
      "Alerts:",
      alerts.length,
    )

    // Calculate KPIs
    const activeSuppliers = suppliers.filter((s) => s.status === "ACTIVE").length
    const totalCostSavings = suppliers.reduce((sum, s) => sum + (s.costSavings || 0), 0)

    const onTimeDeliveries = shipments.filter((s) => s.actualDate && s.actualDate <= s.expectedDate).length
    const onTimeDeliveryRate = shipments.length > 0 ? (onTimeDeliveries / shipments.length) * 100 : 0

    const inventoryValue = inventory.reduce((sum, item) => sum + (item.totalValue || 0), 0)
    const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStockLevel).length

    const criticalAlerts = alerts.filter((a) => a.severity === "CRITICAL").length
    const highAlerts = alerts.filter((a) => a.severity === "HIGH").length

    try {
      const kpiUpdates = [
        { name: "Total Cost Savings", value: totalCostSavings, category: "cost", unit: "USD" },
        { name: "On-Time Delivery Rate", value: onTimeDeliveryRate, category: "performance", unit: "%" },
        { name: "Inventory Value", value: inventoryValue, category: "inventory", unit: "USD" },
        { name: "Active Suppliers", value: activeSuppliers, category: "suppliers", unit: "count" },
        { name: "Low Stock Items", value: lowStockItems, category: "inventory", unit: "count" },
        { name: "Critical Alerts", value: criticalAlerts, category: "alerts", unit: "count" },
      ]

      for (const kpi of kpiUpdates) {
        await prisma.kPI.upsert({
          where: { name: kpi.name },
          update: { value: kpi.value, updatedAt: new Date() },
          create: {
            name: kpi.name,
            value: kpi.value,
            category: kpi.category,
            unit: kpi.unit,
            period: "daily",
          },
        })
      }
      console.log("[v0] KPI records updated successfully")
    } catch (kpiError) {
      console.log("[v0] KPI table update failed, continuing with calculated values:", kpiError)
    }

    const result = {
      totalCostSavings,
      onTimeDeliveryRate: Math.round(onTimeDeliveryRate * 100) / 100,
      inventoryValue,
      activeSuppliers,
      lowStockItems,
      criticalAlerts,
      highAlerts,
      totalShipments: shipments.length,
      onTimeDeliveries,
    }

    console.log("[v0] KPI calculation completed:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Unexpected error in KPI calculation:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return NextResponse.json(
      {
        error: "Unexpected server error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        totalCostSavings: 0,
        onTimeDeliveryRate: 0,
        inventoryValue: 0,
        activeSuppliers: 0,
        lowStockItems: 0,
        criticalAlerts: 0,
        highAlerts: 0,
        totalShipments: 0,
        onTimeDeliveries: 0,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } finally {
    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.error("[v0] Error disconnecting from database:", disconnectError)
    }
  }
}
