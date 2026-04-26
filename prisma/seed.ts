import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import config from "../prisma.config";

const adapter = new PrismaPg({
  connectionString: config.datasource?.url
});

const prisma = new PrismaClient({ adapter });

export const tickets = [
  {
    title: "First Ticket",
    content: "This is the first ticket from the database.",
    status: "DONE" as const,
    bounty: 499, // $4.99
    deadline: new Date().toISOString().split("T")[0] // Today's date in YYYY-MM-DD format
  },
  {
    title: "Second Ticket",
    content: "This is the second ticket from the database.",
    status: "OPEN" as const,
    bounty: 399, // $3.99
    deadline: new Date().toISOString().split("T")[0] // Today's date in YYYY-MM-DD format
  },
  {
    title: "Third Ticket",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
    bounty: 599, // $5.99
    deadline: new Date().toISOString().split("T")[0] // Today's date in YYYY-MM-DD format
  }
];

const seed = async () => {
  console.time("DB Seed");
  console.log("DB Seed: Started...");

  try {
    await prisma.ticket.deleteMany();

    await prisma.ticket.createMany({
      data: tickets
    });

    console.log("DB Seed: Completed");
  } finally {
    console.timeEnd("DB Seed");
  }
};

seed()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
