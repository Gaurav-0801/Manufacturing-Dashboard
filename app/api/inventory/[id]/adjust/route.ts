import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { adjustment, reason, notes } = body

    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id: params.id },
      include: { supplier: true },
    })

    if (!inventoryItem) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
    }

    const newStock = Math.max(0, inventoryItem.currentStock + adjustment)
    const newTotalValue = newStock * inventoryItem.unitCost

    const updatedItem = await prisma.inventoryItem.update({
      where: { id: params.id },
      data: {
        currentStock: newStock,
        totalValue: newTotalValue,
        lastRestocked: adjustment > 0 ? new Date() : inventoryItem.lastRestocked,
        updatedAt: new Date(),
      },
      include: {
        supplier: true,
      },
    })

    if (newStock <= updatedItem.minStockLevel && newStock > 0) {
      const stockPercentage = (newStock / updatedItem.minStockLevel) * 100
      const severity = stockPercentage < 25 ? "CRITICAL" : stockPercentage < 50 ? "HIGH" : "MEDIUM"

      await prisma.alert.create({
        data: {
          type: "LOW_STOCK",
          severity,
          title: "Low Stock Alert",
          message: `${updatedItem.name} (${updatedItem.sku}) has ${newStock} units remaining (${stockPercentage.toFixed(1)}% of minimum threshold)`,
          inventoryItemId: updatedItem.id,
          supplierId: updatedItem.supplierId,
        },
      })
    } else if (newStock === 0) {
      await prisma.alert.create({
        data: {
          type: "LOW_STOCK",
          severity: "CRITICAL",
          title: "Out of Stock",
          message: `${updatedItem.name} (${updatedItem.sku}) is completely out of stock`,
          inventoryItemId: updatedItem.id,
          supplierId: updatedItem.supplierId,
        },
      })
    }

    const allItems = await prisma.inventoryItem.findMany()
    const totalInventoryValue = allItems.reduce((sum, item) => sum + item.totalValue, 0)
    const lowStockItems = allItems.filter((item) => item.currentStock <= item.minStockLevel).length
    const outOfStockItems = allItems.filter((item) => item.currentStock === 0).length

    // Update inventory value KPI
    await prisma.kPI.upsert({
      where: { name: "Inventory Value" },
      update: { value: totalInventoryValue },
      create: {
        name: "Inventory Value",
        value: totalInventoryValue,
        category: "inventory",
        period: "daily",
        unit: "USD",
      },
    })

    // Update stock alerts KPI
    await prisma.kPI.upsert({
      where: { name: "Low Stock Items" },
      update: { value: lowStockItems },
      create: {
        name: "Low Stock Items",
        value: lowStockItems,
        category: "inventory",
        period: "daily",
        unit: "items",
      },
    })

    return NextResponse.json({
      item: updatedItem,
      adjustment: {
        oldStock: inventoryItem.currentStock,
        newStock,
        adjustment,
        reason,
        notes,
        valueChange: newTotalValue - inventoryItem.totalValue,
      },
      summary: {
        totalInventoryValue,
        lowStockItems,
        outOfStockItems,
      },
    })
  } catch (error) {
    console.error("Error adjusting inventory:", error)
    return NextResponse.json({ error: "Failed to adjust inventory" }, { status: 500 })
  }
}
