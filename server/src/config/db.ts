import { PrismaClient } from "../../generated/prisma/client";

// Augment globalThis to cache the Prisma client during dev/hot-reload
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}


export default prisma;
