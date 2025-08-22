import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🔄 Starting database migration and seeding...")

  try {
    // Test connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Create sample suppliers
    console.log("📦 Creating suppliers...")
    const suppliers = await Promise.all([
      prisma.supplier.upsert({
        where: { name: "Steel Corp Industries" },
        update: {},
        create: {
          name: "Steel Corp Industries",
          contactEmail: "contact@steelcorp.com",
          contactPhone: "+1-555-0101",
          address: "123 Industrial Blvd, Detroit, MI",
          performanceScore: 92.5,
          onTimeDeliveries: 147,
          qualityRating: 4.6,
          totalOrders: 156,
          costSavings: 25000.0,
          status: "ACTIVE",
        },
      }),
      prisma.supplier.upsert({
        where: { name: "Global Manufacturing Co" },
        update: {},
        create: {
          name: "Global Manufacturing Co",
          contactEmail: "orders@globalmfg.com",
          contactPhone: "+1-555-0102",
          address: "456 Factory Lane, Chicago, IL",
          performanceScore: 88.3,
          onTimeDeliveries: 182,
          qualityRating: 4.4,
          totalOrders: 203,
          costSavings: 18500.0,
          status: "ACTIVE",
        },
      }),
    ])

    // Create sample inventory items
    console.log("📋 Creating inventory items...")
    const inventoryItems = await Promise.all([
      prisma.inventoryItem.upsert({
        where: { sku: "STL-001" },
        update: {},
        create: {
          name: "Steel Plates Grade A",
          sku: "STL-001",
          category: "Raw Materials",
          currentStock: 450,
          minStockLevel: 100,
          maxStockLevel: 1000,
          unitCost: 125.5,
          totalValue: 56475.0,
          supplierId: suppliers[0].id,
          location: "Warehouse A-1",
          status: "IN_STOCK",
        },
      }),
      prisma.inventoryItem.upsert({
        where: { sku: "BLT-002" },
        update: {},
        create: {
          name: "Industrial Bolts M12",
          sku: "BLT-002",
          category: "Hardware",
          currentStock: 25,
          minStockLevel: 50,
          maxStockLevel: 500,
          unitCost: 2.75,
          totalValue: 68.75,
          supplierId: suppliers[1].id,
          location: "Warehouse B-3",
          status: "LOW_STOCK",
        },
      }),
    ])

    // Create sample shipments
    console.log("🚚 Creating shipments...")
    await Promise.all([
      prisma.shipment.upsert({
        where: { trackingNumber: "SHP-2024-001" },
        update: {},
        create: {
          trackingNumber: "SHP-2024-001",
          supplierId: suppliers[0].id,
          status: "DELIVERED",
          expectedDate: new Date("2024-01-15"),
          actualDate: new Date("2024-01-14"),
          totalValue: 15000.0,
          items: ["Steel Plates Grade A (120 units)"],
          origin: "Detroit, MI",
          destination: "Manufacturing Plant A",
          weight: 2400.0,
        },
      }),
      prisma.shipment.upsert({
        where: { trackingNumber: "SHP-2024-002" },
        update: {},
        create: {
          trackingNumber: "SHP-2024-002",
          supplierId: suppliers[1].id,
          status: "IN_TRANSIT",
          expectedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          totalValue: 2500.0,
          items: ["Industrial Bolts M12 (1000 units)"],
          origin: "Chicago, IL",
          destination: "Manufacturing Plant B",
          weight: 50.0,
        },
      }),
    ])

    // Create sample alerts
    console.log("🚨 Creating alerts...")
    await prisma.alert.create({
      data: {
        type: "LOW_STOCK",
        severity: "HIGH",
        title: "Low Stock Alert",
        message: "Industrial Bolts M12 stock is below minimum threshold",
        isRead: false,
        inventoryItemId: inventoryItems[1].id,
      },
    })

    // Create sample KPIs
    console.log("📊 Creating KPIs...")
    await prisma.kPI.upsert({
      where: { name: "Total Cost Savings" },
      update: {
        value: 125000,
        target: 150000,
        unit: "USD",
      },
      create: {
        name: "Total Cost Savings",
        value: 125000,
        target: 150000,
        unit: "USD",
        category: "cost",
        period: "monthly",
      },
    })

    console.log("✅ Database migration and seeding completed successfully!")
  } catch (error) {
    console.error("❌ Error during migration and seeding:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
})
