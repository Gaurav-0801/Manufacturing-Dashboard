import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, description, category, minStockLevel, maxStockLevel, unitCost, location } = body

    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id: params.id },
    })

    if (!inventoryItem) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
    }

    const totalValue = inventoryItem.currentStock * unitCost

    const updatedItem = await prisma.inventoryItem.update({
      where: { id: params.id },
      data: {
        name,
        description,
        category,
        minStockLevel: Number.parseInt(minStockLevel),
        maxStockLevel: Number.parseInt(maxStockLevel),
        unitCost: Number.parseFloat(unitCost),
        totalValue,
        location,
        updatedAt: new Date(),
      },
      include: {
        supplier: true,
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Error updating inventory item:", error)
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.inventoryItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Inventory item deleted successfully" })
  } catch (error) {
    console.error("Error deleting inventory item:", error)
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}
