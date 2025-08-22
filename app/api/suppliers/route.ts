import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        shipments: {
          select: {
            id: true,
            status: true,
            totalValue: true,
          },
        },
        inventoryItems: {
          select: {
            id: true,
            totalValue: true,
          },
        },
        _count: {
          select: {
            shipments: true,
            inventoryItems: true,
            alerts: true,
          },
        },
      },
      orderBy: {
        performanceScore: "desc",
      },
    })

    return NextResponse.json(suppliers)
  } catch (error) {
    console.error("Error fetching suppliers:", error)
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, contactEmail, contactPhone, address, status } = body

    const supplier = await prisma.supplier.create({
      data: {
        name,
        contactEmail,
        contactPhone,
        address,
        status: status || "ACTIVE",
        performanceScore: 0,
        totalOrders: 0,
        onTimeDeliveries: 0,
        qualityRating: 0,
        costSavings: 0,
      },
    })

    return NextResponse.json(supplier, { status: 201 })
  } catch (error) {
    console.error("Error creating supplier:", error)
    return NextResponse.json({ error: "Failed to create supplier" }, { status: 500 })
  }
}
