import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get overall performance metrics
    const suppliers = await prisma.supplier.findMany({
      where: { status: "ACTIVE" },
    })

    const shipments = await prisma.shipment.findMany({
      include: { supplier: true },
    })

    const inventoryItems = await prisma.inventoryItem.findMany()

    const alerts = await prisma.alert.findMany({
      where: { isResolved: false },
    })

    // Calculate metrics
    const totalSuppliers = suppliers.length
    const avgPerformanceScore =
      totalSuppliers > 0 ? suppliers.reduce((sum, s) => sum + s.performanceScore, 0) / totalSuppliers : 0
    const totalCostSavings = suppliers.reduce((sum, s) => sum + s.costSavings, 0)
    const avgQualityRating =
      totalSuppliers > 0 ? suppliers.reduce((sum, s) => sum + s.qualityRating, 0) / totalSuppliers : 0

    const deliveredShipments = shipments.filter((s) => s.status === "DELIVERED")
    const onTimeDeliveries = deliveredShipments.filter((s) => s.actualDate && s.actualDate <= s.expectedDate)
    const onTimeRate = deliveredShipments.length > 0 ? (onTimeDeliveries.length / deliveredShipments.length) * 100 : 0

    const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0)
    const lowStockItems = inventoryItems.filter((item) => item.currentStock <= item.minStockLevel)

    const criticalAlerts = alerts.filter((a) => a.severity === "CRITICAL").length
    const highAlerts = alerts.filter((a) => a.severity === "HIGH").length

    const performanceWeights = {
      delivery: 0.3,
      quality: 0.25,
      cost: 0.25,
      inventory: 0.2,
    }

    const deliveryScore = Math.min(onTimeRate, 100)
    const qualityScore = (avgQualityRating / 5) * 100
    const costScore = Math.min((totalCostSavings / 300000) * 100, 100) // Target $300K
    const inventoryScore = Math.max(100 - (lowStockItems.length / inventoryItems.length) * 100, 0)

    const overallPerformance =
      deliveryScore * performanceWeights.delivery +
      qualityScore * performanceWeights.quality +
      costScore * performanceWeights.cost +
      inventoryScore * performanceWeights.inventory

    return NextResponse.json({
      overallPerformance: Number.parseFloat(overallPerformance.toFixed(1)),
      costSavings: totalCostSavings,
      qualityScore: Number.parseFloat(avgQualityRating.toFixed(1)),
      deliveryPerformance: Number.parseFloat(onTimeRate.toFixed(1)),
      totalSuppliers,
      avgPerformanceScore: Number.parseFloat(avgPerformanceScore.toFixed(1)),
      totalInventoryValue,
      lowStockItems: lowStockItems.length,
      criticalAlerts,
      highAlerts,
      trends: {
        performanceChange: overallPerformance > 85 ? 2.1 : -1.5,
        costSavingsChange: totalCostSavings > 250000 ? 12.5 : -5.2,
        qualityChange: avgQualityRating >= 4.0 ? 0.2 : -0.1,
        deliveryChange: onTimeRate >= 90 ? 1.2 : -2.1,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics overview:", error)
    return NextResponse.json({ error: "Failed to fetch analytics overview" }, { status: 500 })
  }
}
