// scripts/seed-data.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with manufacturing data...");

  // Create suppliers
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: "SteelCorp Industries",
        contactEmail: "orders@steelcorp.com",
        contactPhone: "+1-555-0101",
        address: "123 Industrial Blvd, Detroit, MI 48201",
        performanceScore: 87.5,
        totalOrders: 156,
        onTimeDeliveries: 142,
        qualityRating: 4.2,
        costSavings: 125000.0,
        status: "ACTIVE",
      },
    }),
    prisma.supplier.create({
      data: {
        name: "Global Components Ltd",
        contactEmail: "supply@globalcomp.com",
        contactPhone: "+1-555-0202",
        address: "456 Manufacturing Way, Chicago, IL 60601",
        performanceScore: 92.3,
        totalOrders: 203,
        onTimeDeliveries: 195,
        qualityRating: 4.6,
        costSavings: 89000.0,
        status: "ACTIVE",
      },
    }),
    prisma.supplier.create({
      data: {
        name: "Precision Parts Co",
        contactEmail: "info@precisionparts.com",
        contactPhone: "+1-555-0303",
        address: "789 Factory St, Cleveland, OH 44101",
        performanceScore: 78.9,
        totalOrders: 98,
        onTimeDeliveries: 82,
        qualityRating: 3.8,
        costSavings: 45000.0,
        status: "ACTIVE",
      },
    }),
  ]);

  // Create shipments
  const shipments = await Promise.all([
    prisma.shipment.create({
      data: {
        trackingNumber: "SCM-2024-001",
        supplierId: suppliers[0].id,
        status: "IN_TRANSIT",
        expectedDate: new Date("2024-01-15"),
        origin: "Detroit, MI",
        destination: "Manufacturing Plant A",
        totalValue: 45000.0,
        weight: 2500.5,
        items: JSON.stringify([
          { sku: "STL-001", name: "Steel Beams", quantity: 50, unitPrice: 850 },
          { sku: "STL-002", name: "Steel Plates", quantity: 25, unitPrice: 320 },
        ]),
      },
    }),
    prisma.shipment.create({
      data: {
        trackingNumber: "SCM-2024-002",
        supplierId: suppliers[1].id,
        status: "DELIVERED",
        expectedDate: new Date("2024-01-10"),
        actualDate: new Date("2024-01-09"),
        origin: "Chicago, IL",
        destination: "Manufacturing Plant B",
        totalValue: 28000.0,
        weight: 1200.0,
        items: JSON.stringify([
          { sku: "CMP-001", name: "Electronic Components", quantity: 100, unitPrice: 280 },
        ]),
      },
    }),
    prisma.shipment.create({
      data: {
        trackingNumber: "SCM-2024-003",
        supplierId: suppliers[2].id,
        status: "DELAYED",
        expectedDate: new Date("2024-01-12"),
        origin: "Cleveland, OH",
        destination: "Manufacturing Plant C",
        totalValue: 15000.0,
        weight: 800.0,
        items: JSON.stringify([
          { sku: "PRC-001", name: "Precision Gears", quantity: 200, unitPrice: 75 },
        ]),
      },
    }),
  ]);

  // Create inventory items
  const inventoryItems = await Promise.all([
    prisma.inventoryItem.create({
      data: {
        sku: "STL-001",
        name: "Steel Beams",
        description: "High-grade structural steel beams",
        category: "Raw Materials",
        supplierId: suppliers[0].id,
        currentStock: 150,
        minStockLevel: 50,
        maxStockLevel: 500,
        unitCost: 850.0,
        totalValue: 127500.0,
        location: "Warehouse A-1",
      },
    }),
    prisma.inventoryItem.create({
      data: {
        sku: "CMP-001",
        name: "Electronic Components",
        description: "Microprocessors and circuit boards",
        category: "Electronics",
        supplierId: suppliers[1].id,
        currentStock: 25,
        minStockLevel: 100,
        maxStockLevel: 1000,
        unitCost: 280.0,
        totalValue: 7000.0,
        location: "Warehouse B-2",
      },
    }),
    prisma.inventoryItem.create({
      data: {
        sku: "PRC-001",
        name: "Precision Gears",
        description: "High-precision mechanical gears",
        category: "Mechanical Parts",
        supplierId: suppliers[2].id,
        currentStock: 300,
        minStockLevel: 200,
        maxStockLevel: 800,
        unitCost: 75.0,
        totalValue: 22500.0,
        location: "Warehouse C-3",
      },
    }),
  ]);

  // Create alerts
  await Promise.all([
    prisma.alert.create({
      data: {
        type: "LOW_STOCK",
        severity: "HIGH",
        title: "Low Stock Alert",
        message: "Electronic Components (CMP-001) stock is below minimum threshold",
        inventoryItemId: inventoryItems[1].id,
        supplierId: suppliers[1].id,
      },
    }),
    prisma.alert.create({
      data: {
        type: "SHIPMENT_DELAY",
        severity: "MEDIUM",
        title: "Shipment Delayed",
        message: "Shipment SCM-2024-003 from Precision Parts Co is delayed",
        shipmentId: shipments[2].id,
        supplierId: suppliers[2].id,
      },
    }),
    prisma.alert.create({
      data: {
        type: "SUPPLIER_PERFORMANCE",
        severity: "LOW",
        title: "Performance Review",
        message: "Precision Parts Co performance score dropped below 80%",
        supplierId: suppliers[2].id,
      },
    }),
  ]);

  // Create KPIs
  await Promise.all([
    prisma.kPI.create({
      data: {
        name: "Total Cost Savings",
        value: 259000.0,
        target: 300000.0,
        unit: "USD",
        category: "cost",
        period: "monthly",
      },
    }),
    prisma.kPI.create({
      data: {
        name: "On-Time Delivery Rate",
        value: 89.2,
        target: 95.0,
        unit: "%",
        category: "performance",
        period: "monthly",
      },
    }),
    prisma.kPI.create({
      data: {
        name: "Inventory Turnover",
        value: 4.2,
        target: 6.0,
        unit: "times",
        category: "inventory",
        period: "quarterly",
      },
    }),
    prisma.kPI.create({
      data: {
        name: "Quality Score",
        value: 4.2,
        target: 4.5,
        unit: "rating",
        category: "quality",
        period: "monthly",
      },
    }),
  ]);

  const currentDate = new Date();
  const kpiData = [];

  // Generate 6 months of historical data
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);

    kpiData.push(
      {
        name: "Total Cost Savings",
        value: 220000 + i * 8000 + Math.random() * 20000,
        target: 300000,
        unit: "USD",
        category: "cost",
        period: "monthly",
        date,
      },
      {
        name: "On-Time Delivery Rate",
        value: 85 + i * 0.8 + Math.random() * 5,
        target: 95.0,
        unit: "%",
        category: "performance",
        period: "monthly",
        date,
      },
      {
        name: "Quality Score",
        value: 3.9 + i * 0.1 + Math.random() * 0.3,
        target: 4.5,
        unit: "rating",
        category: "quality",
        period: "monthly",
        date,
      }
    );
  }

  await Promise.all(kpiData.map((kpi) => prisma.kPI.create({ data: kpi })));

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
