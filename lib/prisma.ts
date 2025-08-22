import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

console.log("[v0] Initializing Prisma client...")
console.log("[v0] DATABASE_URL exists:", !!process.env.DATABASE_URL)
console.log("[v0] NODE_ENV:", process.env.NODE_ENV)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty",
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
  console.log("[v0] Prisma client cached in global scope")
}

console.log("[v0] Prisma client initialized successfully")
