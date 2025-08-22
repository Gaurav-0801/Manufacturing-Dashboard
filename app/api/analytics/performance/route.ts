import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "monthly"

    // Get KPI data over time
    const kpis = await prisma.kPI.findMany({
      where: {
        period: timeframe === "monthly" ? "monthly" : "quarterly",
      },
      orderBy: {
        date: "asc",
      },
      take: timeframe === "monthly" ? 6 : 4,
    })

    // Group KPIs by date and calculate performance metrics
    const performanceData = kpis.reduce((acc: any[], kpi) => {
      const dateKey = kpi.date.toISOString().slice(0, 7) // YYYY-MM format
      let existing = acc.find((item) => item.period === dateKey)

      if (!existing) {
        existing = {
          period: dateKey,
          month: new Date(kpi.date).toLocaleDateString("en-US", { month: "short" }),
          onTime: 0,
          quality: 0,
          cost: 0,
          performance: 0,
        }
        acc.push(existing)
      }

      switch (kpi.name) {
        case "On-Time Delivery Rate":
          existing.onTime = kpi.value
          break
        case "Quality Score":
          existing.quality = kpi.value
          break
        case "Total Cost Savings":
          existing.cost = kpi.value
          break
      }

      // Calculate overall performance score
      existing.performance = (existing.onTime + existing.quality * 20 + existing.cost / 10000) / 3

      return acc
    }, [])

    return NextResponse.json(performanceData)
  } catch (error) {
    console.error("Error fetching performance analytics:", error)
    return NextResponse.json({ error: "Failed to fetch performance analytics" }, { status: 500 })
  }
}
