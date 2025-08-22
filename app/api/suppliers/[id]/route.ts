import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: params.id },
      include: {
        shipments: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        inventoryItems: {
          orderBy: { updatedAt: "desc" },
          take: 10,
        },
        alerts: {
          where: { isResolved: false },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    }

    return NextResponse.json(supplier)
  } catch (error) {
    console.error("Error fetching supplier:", error)
    return NextResponse.json({ error: "Failed to fetch supplier" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, contactEmail, contactPhone, address, performanceScore, qualityRating, costSavings, status } = body

    const supplier = await prisma.supplier.update({
      where: { id: params.id },
      data: {
        name,
        contactEmail,
        contactPhone,
        address,
        performanceScore,
        qualityRating,
        costSavings,
        status,
        updatedAt: new Date(),
      },
    })

    // Update related KPIs when supplier data changes
    if (performanceScore !== undefined || costSavings !== undefined) {
      // Recalculate overall performance metrics
      const allSuppliers = await prisma.supplier.findMany({
        where: { status: "ACTIVE" },
      })

      const avgPerformance = allSuppliers.reduce((sum, s) => sum + s.performanceScore, 0) / allSuppliers.length
      const totalCostSavings = allSuppliers.reduce((sum, s) => sum + s.costSavings, 0)

      // Update KPIs
      await prisma.kPI.updateMany({
        where: { name: "On-Time Delivery Rate" },
        data: { value: avgPerformance },
      })

      await prisma.kPI.updateMany({
        where: { name: "Total Cost Savings" },
        data: { value: totalCostSavings },
      })
    }

    return NextResponse.json(supplier)
  } catch (error) {
    console.error("Error updating supplier:", error)
    return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.supplier.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Supplier deleted successfully" })
  } catch (error) {
    console.error("Error deleting supplier:", error)
    return NextResponse.json({ error: "Failed to delete supplier" }, { status: 500 })
  }
}
