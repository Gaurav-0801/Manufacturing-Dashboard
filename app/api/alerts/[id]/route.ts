import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { isRead, isResolved } = body

    const alert = await prisma.alert.update({
      where: { id: params.id },
      data: {
        isRead: isRead !== undefined ? isRead : undefined,
        isResolved: isResolved !== undefined ? isResolved : undefined,
        updatedAt: new Date(),
      },
      include: {
        supplier: true,
        shipment: true,
        inventoryItem: true,
      },
    })

    return NextResponse.json(alert)
  } catch (error) {
    console.error("Error updating alert:", error)
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.alert.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Alert deleted successfully" })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 })
  }
}
