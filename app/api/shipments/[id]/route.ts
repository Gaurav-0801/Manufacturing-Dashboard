import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, actualDate, notes } = body

    const shipment = await prisma.shipment.update({
      where: { id: params.id },
      data: {
        status,
        actualDate: actualDate ? new Date(actualDate) : null,
        notes,
        updatedAt: new Date(),
      },
      include: {
        supplier: true,
      },
    })

    if (status === "DELIVERED" && actualDate) {
      const supplier = await prisma.supplier.findUnique({
        where: { id: shipment.supplierId },
        include: {
          shipments: {
            where: { status: "DELIVERED" },
          },
        },
      })

      if (supplier) {
        const deliveredOnTime = new Date(actualDate) <= shipment.expectedDate
        const deliveredShipments = supplier.shipments.length
        const onTimeDeliveries = supplier.shipments.filter((s) => s.actualDate && s.actualDate <= s.expectedDate).length

        // Calculate cost savings based on on-time delivery
        const costSavingsPerDelivery = deliveredOnTime ? shipment.totalValue * 0.02 : 0 // 2% savings for on-time
        const newCostSavings = supplier.costSavings + costSavingsPerDelivery

        const newPerformanceScore = deliveredShipments > 0 ? (onTimeDeliveries / deliveredShipments) * 100 : 0

        await prisma.supplier.update({
          where: { id: supplier.id },
          data: {
            onTimeDeliveries,
            performanceScore: newPerformanceScore,
            costSavings: newCostSavings,
          },
        })

        // Update KPIs
        await prisma.kPI.upsert({
          where: { name: "Total Cost Savings" },
          update: { value: { increment: costSavingsPerDelivery } },
          create: {
            name: "Total Cost Savings",
            value: costSavingsPerDelivery,
            category: "cost",
            period: "monthly",
            unit: "USD",
          },
        })

        // Create alert if delivery was late
        if (!deliveredOnTime) {
          const daysLate = Math.ceil(
            (new Date(actualDate).getTime() - shipment.expectedDate.getTime()) / (1000 * 60 * 60 * 24),
          )
          await prisma.alert.create({
            data: {
              type: "SHIPMENT_DELAY",
              severity: daysLate > 7 ? "HIGH" : "MEDIUM",
              title: "Late Delivery",
              message: `Shipment ${shipment.trackingNumber} was delivered ${daysLate} days late. Potential cost impact: $${(shipment.totalValue * 0.05).toFixed(2)}`,
              shipmentId: shipment.id,
              supplierId: supplier.id,
            },
          })
        }
      }
    }

    return NextResponse.json(shipment)
  } catch (error) {
    console.error("Error updating shipment:", error)
    return NextResponse.json({ error: "Failed to update shipment" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.shipment.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Shipment deleted successfully" })
  } catch (error) {
    console.error("Error deleting shipment:", error)
    return NextResponse.json({ error: "Failed to delete shipment" }, { status: 500 })
  }
}
