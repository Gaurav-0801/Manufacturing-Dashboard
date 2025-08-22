import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const severity = searchParams.get("severity")
    const type = searchParams.get("type")
    const isRead = searchParams.get("isRead")
    const isResolved = searchParams.get("isResolved")

    const where: any = {}

    if (severity && severity !== "all") {
      where.severity = severity
    }

    if (type && type !== "all") {
      where.type = type
    }

    if (isRead !== null && isRead !== "all") {
      where.isRead = isRead === "true"
    }

    if (isResolved !== null && isResolved !== "all") {
      where.isResolved = isResolved === "true"
    }

    const alerts = await prisma.alert.findMany({
      where,
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
        shipment: {
          select: {
            id: true,
            trackingNumber: true,
            expectedDate: true,
            totalValue: true,
          },
        },
        inventoryItem: {
          select: {
            id: true,
            sku: true,
            name: true,
            currentStock: true,
            minStockLevel: true,
            location: true,
          },
        },
      },
      orderBy: [{ isResolved: "asc" }, { severity: "desc" }, { createdAt: "desc" }],
    })

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, severity, title, message, supplierId, shipmentId, inventoryItemId } = body

    const alert = await prisma.alert.create({
      data: {
        type,
        severity,
        title,
        message,
        supplierId,
        shipmentId,
        inventoryItemId,
      },
      include: {
        supplier: true,
        shipment: true,
        inventoryItem: true,
      },
    })

    return NextResponse.json(alert, { status: 201 })
  } catch (error) {
    console.error("Error creating alert:", error)
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}
