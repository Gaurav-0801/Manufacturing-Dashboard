import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { alertIds, action } = body

    const updateData: any = { updatedAt: new Date() }

    switch (action) {
      case "markAsRead":
        updateData.isRead = true
        break
      case "markAsUnread":
        updateData.isRead = false
        break
      case "resolve":
        updateData.isResolved = true
        updateData.isRead = true
        break
      case "unresolve":
        updateData.isResolved = false
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const updatedAlerts = await prisma.alert.updateMany({
      where: {
        id: {
          in: alertIds,
        },
      },
      data: updateData,
    })

    return NextResponse.json({
      message: `Successfully updated ${updatedAlerts.count} alerts`,
      count: updatedAlerts.count,
    })
  } catch (error) {
    console.error("Error bulk updating alerts:", error)
    return NextResponse.json({ error: "Failed to update alerts" }, { status: 500 })
  }
}
