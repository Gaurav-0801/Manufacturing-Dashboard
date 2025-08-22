import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log("🔄 Setting up database...")

    // Test database connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Create some initial suppliers
    const suppliers = await prisma.supplier.createMany({
      data: [
        {
          name: "Steel Corp Industries",
          contactEmail: "contact@steelcorp.com",
          contactPhone: "+1-555-0101",
          address: "123 Industrial Blvd, Detroit, MI",
          performanceScore: 85.5,
          totalOrders: 45,
          onTimeDeliveries: 38,
          qualityRating: 4.2,
          costSavings: 125000.0,
          status: "ACTIVE",
        },
        {
          name: "Global Parts Supply",
          contactEmail: "orders@globalparts.com",
          contactPhone: "+1-555-0202",
          address: "456 Supply Chain Ave, Chicago, IL",
          performanceScore: 92.3,
          totalOrders: 67,
          onTimeDeliveries: 62,
          qualityRating: 4.7,
          costSavings: 89000.0,
          status: "ACTIVE",
        },
        {
          name: "Precision Manufacturing",
          contactEmail: "info@precisionmfg.com",
          contactPhone: "+1-555-0303",
          address: "789 Precision Way, Cleveland, OH",
          performanceScore: 78.9,
          totalOrders: 23,
          onTimeDeliveries: 18,
          qualityRating: 3.9,
          costSavings: 45000.0,
          status: "ACTIVE",
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${suppliers.count} suppliers`)

    // Get supplier IDs for relationships
    const supplierList = await prisma.supplier.findMany()

    // Create inventory items
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
          totalValue: 18825.0,
          location: "Warehouse A-1",
        },
        {
          sku: "BLT-002",
          name: "Industrial Bolts M12",
          description: "High-strength bolts for assembly",
          category: "Hardware",
          supplierId: supplierList[1].id,
          currentStock: 2500,
          minStockLevel: 500,
          maxStockLevel: 5000,
          unitCost: 2.75,
          totalValue: 6875.0,
          location: "Warehouse B-3",
        },
        {
          sku: "GER-003",
          name: "Precision Gears",
          description: "Custom machined gears",
          category: "Components",
          supplierId: supplierList[2].id,
          currentStock: 25,
          minStockLevel: 10,
          maxStockLevel: 100,
          unitCost: 450.0,
          totalValue: 11250.0,
          location: "Warehouse C-2",
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${inventoryItems.count} inventory items`)

    // Create shipments
    const shipments = await prisma.shipment.createMany({
      data: [
        {
          trackingNumber: "TRK-2024-001",
          supplierId: supplierList[0].id,
          status: "IN_TRANSIT",
          expectedDate: new Date("2024-01-15"),
          origin: "Detroit, MI",
          destination: "Manufacturing Plant A",
          totalValue: 25000.0,
          weight: 2500.0,
          items: JSON.stringify([{ sku: "STL-001", quantity: 100, unitPrice: 125.5 }]),
        },
        {
          trackingNumber: "TRK-2024-002",
          supplierId: supplierList[1].id,
          status: "DELIVERED",
          expectedDate: new Date("2024-01-10"),
          actualDate: new Date("2024-01-09"),
          origin: "Chicago, IL",
          destination: "Manufacturing Plant B",
          totalValue: 15000.0,
          weight: 500.0,
          items: JSON.stringify([{ sku: "BLT-002", quantity: 1000, unitPrice: 2.75 }]),
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${shipments.count} shipments`)

    // Create some alerts
    const alerts = await prisma.alert.createMany({
      data: [
        {
          type: "LOW_STOCK",
          severity: "HIGH",
          title: "Low Stock Alert",
          message: "Precision Gears stock is running low (25 units remaining)",
          supplierId: supplierList[2].id,
          isRead: false,
          isResolved: false,
        },
        {
          type: "SHIPMENT_DELAY",
          severity: "MEDIUM",
          title: "Shipment Delay",
          message: "Shipment TRK-2024-001 may be delayed due to weather conditions",
          supplierId: supplierList[0].id,
          isRead: false,
          isResolved: false,
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${alerts.count} alerts`)

    // Create KPIs
    const kpis = await prisma.kPI.createMany({
      data: [
        {
          name: "Total Cost Savings",
          value: 259000.0,
          target: 300000.0,
          unit: "USD",
          category: "cost",
          period: "monthly",
        },
        {
          name: "On-Time Delivery Rate",
          value: 87.5,
          target: 90.0,
          unit: "%",
          category: "performance",
          period: "monthly",
        },
        {
          name: "Total Inventory Value",
          value: 36950.0,
          target: 50000.0,
          unit: "USD",
          category: "inventory",
          period: "daily",
        },
        {
          name: "Active Suppliers",
          value: 3,
          target: 5,
          unit: "count",
          category: "performance",
          period: "monthly",
        },
      ],
      skipDuplicates: true,
    })
    console.log(`✅ Created ${kpis.count} KPIs`)

    console.log("🎉 Database setup completed successfully!")
  } catch (error) {
    console.error("❌ Error setting up database:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase().catch((error) => {
  console.error("Failed to setup database:", error)
  process.exit(1)
})
