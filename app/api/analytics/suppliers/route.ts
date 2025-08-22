import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: { status: "ACTIVE" },
      include: {
        shipments: {
          where: {
            status: "DELIVERED",
          },
        },
        _count: {
          select: {
            shipments: true,
            alerts: {
              where: {
                isResolved: false,
                severity: { in: ["HIGH", "CRITICAL"] },
              },
            },
          },
        },
      },
      orderBy: {
        performanceScore: "desc",
      },
    })

    const supplierAnalytics = suppliers.map((supplier) => {
      const deliveredShipments = supplier.shipments
      const onTimeDeliveries = deliveredShipments.filter(
        (shipment) => shipment.actualDate && shipment.actualDate <= shipment.expectedDate,
      )
      const onTimeRate = deliveredShipments.length > 0 ? (onTimeDeliveries.length / deliveredShipments.length) * 100 : 0

      // Calculate risk score based on performance, alerts, and delivery history
      let riskScore = 0
      if (supplier.performanceScore < 80) riskScore += 30
      if (supplier.qualityRating < 4.0) riskScore += 20
      if (onTimeRate < 85) riskScore += 25
      if (supplier._count.alerts > 0) riskScore += supplier._count.alerts * 10

      riskScore = Math.min(riskScore, 100)

      let riskCategory = "Low Risk"
      if (riskScore > 50) riskCategory = "High Risk"
      else if (riskScore > 30) riskCategory = "Medium Risk"

      return {
        id: supplier.id,
        name: supplier.name,
        score: supplier.performanceScore,
        orders: supplier.totalOrders,
        onTime: Number.parseFloat(onTimeRate.toFixed(1)),
        quality: supplier.qualityRating,
        savings: supplier.costSavings,
        riskScore,
        riskCategory,
        alerts: supplier._count.alerts,
      }
    })

    return NextResponse.json(supplierAnalytics)
  } catch (error) {
    console.error("Error fetching supplier analytics:", error)
    return NextResponse.json({ error: "Failed to fetch supplier analytics" }, { status: 500 })
  }
}
