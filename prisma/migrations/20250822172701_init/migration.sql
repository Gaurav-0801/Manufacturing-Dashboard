-- CreateEnum
CREATE TYPE "public"."InventoryStatus" AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'DISCONTINUED', 'ON_ORDER');

-- AlterTable
ALTER TABLE "public"."inventory_items" ADD COLUMN     "status" "public"."InventoryStatus" NOT NULL DEFAULT 'IN_STOCK';
