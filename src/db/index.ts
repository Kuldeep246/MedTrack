import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = new PrismaClient();

type PrismaClientSingleton = typeof prismaClientSingleton;

declare global {
  var prisma: PrismaClientSingleton | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
