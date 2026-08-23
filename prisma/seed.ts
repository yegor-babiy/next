import { hash } from "@node-rs/argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import config from "../prisma.config";

const adapter = new PrismaPg({
  connectionString: config.datasource?.url
});

const prisma = new PrismaClient({ adapter });

const users = [
  {
    username: "admin",
    email: "admin@admin.com"
  },
  {
    username: "user",
    email: "user@user.com"
  }
];

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

const comments = [
  { content: "first comment from DB." },
  { content: "second comment from DB." },
  { content: "third comment from DB." }
];

const seed = async () => {
  console.time("DB Seed");
  console.log("DB Seed: Started...");

  try {
    await prisma.comment.deleteMany();
    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();

    const passwordHash = await hash("geheimnis");
    const dbUsers = await prisma.user.createManyAndReturn({
      data: users.map(user => ({
        ...user,
        passwordHash
      }))
    });
    const dbTickets = await prisma.ticket.createManyAndReturn({
      data: tickets.map(tickets => ({
        ...tickets,
        userId: dbUsers[0].id
      }))
    });

    await prisma.comment.createMany({
      data: comments.map(comment => ({
        ...comment,
        userId: dbUsers[1].id,
        ticketId: dbTickets[0].id
      }))
    });

    console.log("DB Seed: Completed");
  } finally {
    console.timeEnd("DB Seed");
  }
};

seed()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
