-- CreateEnum
CREATE TYPE "public"."SupplierStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_APPROVAL');

-- CreateEnum
CREATE TYPE "public"."ShipmentStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED', 'RETURNED');

-- CreateEnum
CREATE TYPE "public"."AlertType" AS ENUM ('LOW_STOCK', 'SHIPMENT_DELAY', 'QUALITY_ISSUE', 'COST_VARIANCE', 'SUPPLIER_PERFORMANCE', 'SYSTEM_NOTIFICATION');

-- CreateEnum
CREATE TYPE "public"."AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "public"."suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "address" TEXT,
    "performanceScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalOrders" INTEGER NOT NULL DEFAULT 0,
    "onTimeDeliveries" INTEGER NOT NULL DEFAULT 0,
    "qualityRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "costSavings" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "status" "public"."SupplierStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipments" (
    "id" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "status" "public"."ShipmentStatus" NOT NULL DEFAULT 'PENDING',
    "expectedDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION,
    "items" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inventory_items" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "currentStock" INTEGER NOT NULL DEFAULT 0,
    "minStockLevel" INTEGER NOT NULL DEFAULT 0,
    "maxStockLevel" INTEGER NOT NULL DEFAULT 1000,
    "unitCost" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "location" TEXT,
    "lastRestocked" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."alerts" (
    "id" TEXT NOT NULL,
    "type" "public"."AlertType" NOT NULL,
    "severity" "public"."AlertSeverity" NOT NULL DEFAULT 'MEDIUM',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "supplierId" TEXT,
    "shipmentId" TEXT,
    "inventoryItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."kpis" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "target" DOUBLE PRECISION,
    "unit" TEXT,
    "category" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kpis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipments_trackingNumber_key" ON "public"."shipments"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_items_sku_key" ON "public"."inventory_items"("sku");

-- AddForeignKey
ALTER TABLE "public"."shipments" ADD CONSTRAINT "shipments_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory_items" ADD CONSTRAINT "inventory_items_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerts" ADD CONSTRAINT "alerts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerts" ADD CONSTRAINT "alerts_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "public"."shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alerts" ADD CONSTRAINT "alerts_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "public"."inventory_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
