import { prisma } from "@/lib/prisma";
import { TICKET_PAGE_SIZE } from "../constants";
import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  const isValidSize =
    searchParams && TICKET_PAGE_SIZE.includes(searchParams.size);

  if (!isValidSize) {
    return {
      list: [],
      metadata: { count: 0, hasNextPage: false }
    };
  }
  const where = {
    userId,
    ...(typeof searchParams.search === "string" && {
      title: {
        contains: searchParams.search,
        mode: "insensitive" as const
      }
    })
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    }),
    prisma.ticket.count({ where })
  ]);

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take
    }
  };
};
