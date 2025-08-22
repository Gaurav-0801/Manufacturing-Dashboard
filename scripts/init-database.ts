import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function initializeDatabase() {
  try {
    console.log("🔄 Initializing database...")

    // Test connection
    await prisma.$connect()
    console.log("✅ Database connected")

    // Create sample suppliers
    const suppliers = await prisma.supplier.createMany({
      data: [
        {
          name: "Steel Corp Manufacturing",
          contactEmail: "contact@steelcorp.com",
          contactPhone: "+1-555-0101",
          address: "123 Industrial Ave, Detroit, MI",
          performanceScore: 92.5,
          totalOrders: 45,
          onTimeDeliveries: 42,
          qualityRating: 4.6,
          costSavings: 125000,
          status: "ACTIVE",
        },
        {
          name: "Global Parts Supply",
          contactEmail: "orders@globalparts.com",
          contactPhone: "+1-555-0102",
          address: "456 Supply Chain Blvd, Chicago, IL",
          performanceScore: 87.3,
          totalOrders: 38,
          onTimeDeliveries: 33,
          qualityRating: 4.2,
          costSavings: 89000,
          status: "ACTIVE",
        },
        {
          name: "Precision Components Ltd",
          contactEmail: "info@precision.com",
          contactPhone: "+1-555-0103",
          address: "789 Manufacturing St, Cleveland, OH",
          performanceScore: 95.1,
          totalOrders: 52,
          onTimeDeliveries: 50,
          qualityRating: 4.8,
          costSavings: 156000,
          status: "ACTIVE",
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${suppliers.count} suppliers`)

    // Get supplier IDs for relationships
    const supplierList = await prisma.supplier.findMany()

    // Create sample inventory items
    const inventoryItems = await prisma.inventoryItem.createMany({
      data: [
        {
          sku: "STL-001",
          name: "Steel Plates 10mm",
          description: "High-grade steel plates for manufacturing",
          category: "Raw Materials",
          supplierId: supplierList[0].id,
          currentStock: 150,
          minStockLevel: 50,
          maxStockLevel: 500,
          unitCost: 125.5,
          totalValue: 18825,
          location: "Warehouse A-1",
        },
        {
          sku: "BLT-002",
          name: "Industrial Bolts M12",
          description: "High-strength bolts for assembly",
          category: "Fasteners",
          supplierId: supplierList[1].id,
          currentStock: 25,
          minStockLevel: 100,
          maxStockLevel: 1000,
          unitCost: 2.75,
          totalValue: 68.75,
          location: "Warehouse B-2",
        },
        {
          sku: "BRG-003",
          name: "Precision Bearings",
          description: "High-precision ball bearings",
          category: "Components",
          supplierId: supplierList[2].id,
          currentStock: 75,
          minStockLevel: 30,
          maxStockLevel: 200,
          unitCost: 45.0,
          totalValue: 3375,
          location: "Warehouse C-1",
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${inventoryItems.count} inventory items`)

    // Create sample shipments
    const shipments = await prisma.shipment.createMany({
      data: [
        {
          trackingNumber: "SHP-2024-001",
          supplierId: supplierList[0].id,
          status: "DELIVERED",
          expectedDate: new Date("2024-01-15"),
          actualDate: new Date("2024-01-14"),
          origin: "Detroit, MI",
          destination: "Manufacturing Plant A",
          totalValue: 25000,
          weight: 2500,
          items: JSON.stringify([{ sku: "STL-001", quantity: 100 }]),
        },
        {
          trackingNumber: "SHP-2024-002",
          supplierId: supplierList[1].id,
          status: "IN_TRANSIT",
          expectedDate: new Date("2024-01-20"),
          origin: "Chicago, IL",
          destination: "Manufacturing Plant B",
          totalValue: 15000,
          weight: 800,
          items: JSON.stringify([{ sku: "BLT-002", quantity: 500 }]),
        },
        {
          trackingNumber: "SHP-2024-003",
          supplierId: supplierList[2].id,
          status: "DELAYED",
          expectedDate: new Date("2024-01-18"),
          origin: "Cleveland, OH",
          destination: "Manufacturing Plant C",
          totalValue: 8500,
          weight: 150,
          items: JSON.stringify([{ sku: "BRG-003", quantity: 50 }]),
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${shipments.count} shipments`)

    // Create sample alerts
    const alerts = await prisma.alert.createMany({
      data: [
        {
          type: "LOW_STOCK",
          severity: "HIGH",
          title: "Low Stock Alert",
          message: "Industrial Bolts M12 stock is below minimum threshold",
          supplierId: supplierList[1].id,
          inventoryItemId: (await prisma.inventoryItem.findFirst({ where: { sku: "BLT-002" } }))?.id,
        },
        {
          type: "SHIPMENT_DELAY",
          severity: "MEDIUM",
          title: "Shipment Delayed",
          message: "Shipment SHP-2024-003 is delayed beyond expected delivery date",
          supplierId: supplierList[2].id,
          shipmentId: (await prisma.shipment.findFirst({ where: { trackingNumber: "SHP-2024-003" } }))?.id,
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${alerts.count} alerts`)

    // Initialize KPIs
    const kpis = await prisma.kPI.createMany({
      data: [
        { name: "Total Cost Savings", value: 370000, category: "cost", unit: "USD", period: "daily" },
        { name: "On-Time Delivery Rate", value: 89.2, category: "performance", unit: "%", period: "daily" },
        { name: "Inventory Value", value: 22268.75, category: "inventory", unit: "USD", period: "daily" },
        { name: "Active Suppliers", value: 3, category: "suppliers", unit: "count", period: "daily" },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${kpis.count} KPIs`)

    console.log("🎉 Database initialization completed successfully!")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run initialization
initializeDatabase().catch((error) => {
  console.error("Failed to initialize database:", error)
  process.exit(1)
})
