import { PrismaPg } from "@prisma/adapter-pg";
import config from "../prisma.config";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaPg({ connectionString: config.datasource?.url });
const prisma = new PrismaClient({ adapter });

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
