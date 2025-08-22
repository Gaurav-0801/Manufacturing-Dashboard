import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const inventoryItems = await prisma.inventoryItem.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(inventoryItems)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      sku,
      name,
      description,
      category,
      supplierId,
      currentStock,
      minStockLevel,
      maxStockLevel,
      unitCost,
      location,
    } = body

    const totalValue = currentStock * unitCost

    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        sku,
        name,
        description,
        category,
        supplierId,
        currentStock: Number.parseInt(currentStock),
        minStockLevel: Number.parseInt(minStockLevel),
        maxStockLevel: Number.parseInt(maxStockLevel),
        unitCost: Number.parseFloat(unitCost),
        totalValue,
        location,
        lastRestocked: new Date(),
      },
      include: {
        supplier: true,
      },
    })

    // Create low stock alert if needed
    if (inventoryItem.currentStock <= inventoryItem.minStockLevel) {
      await prisma.alert.create({
        data: {
          type: "LOW_STOCK",
          severity: "HIGH",
          title: "Low Stock Alert",
          message: `${inventoryItem.name} (${inventoryItem.sku}) stock is below minimum threshold`,
          inventoryItemId: inventoryItem.id,
          supplierId: inventoryItem.supplierId,
        },
      })
    }

    return NextResponse.json(inventoryItem, { status: 201 })
  } catch (error) {
    console.error("Error creating inventory item:", error)
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 })
  }
}
