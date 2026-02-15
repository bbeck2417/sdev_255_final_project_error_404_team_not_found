import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// This is the object you will import in your components
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Tell the client to use the URL from your .env
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
