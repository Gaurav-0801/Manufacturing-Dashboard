import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const shipments = await prisma.shipment.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            performanceScore: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(shipments)
  } catch (error) {
    console.error("Error fetching shipments:", error)
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { trackingNumber, supplierId, expectedDate, origin, destination, totalValue, weight, items, notes } = body

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        supplierId,
        status: "PENDING",
        expectedDate: new Date(expectedDate),
        origin,
        destination,
        totalValue: Number.parseFloat(totalValue),
        weight: weight ? Number.parseFloat(weight) : null,
        items: JSON.stringify(items || []),
        notes,
      },
      include: {
        supplier: true,
      },
    })

    // Update supplier total orders
    await prisma.supplier.update({
      where: { id: supplierId },
      data: {
        totalOrders: {
          increment: 1,
        },
      },
    })

    return NextResponse.json(shipment, { status: 201 })
  } catch (error) {
    console.error("Error creating shipment:", error)
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 })
  }
}
