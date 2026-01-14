import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";
import { getPaginationFromQuery, createPaginatedResponse } from "@/lib/pagination";
import { createLogger } from "@/lib/logger";

const logger = createLogger("tickets-api");

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { skip, take } = getPaginationFromQuery(req.nextUrl.searchParams);
    const { page, pageSize } = { page: Math.max(1, (skip / take) + 1), pageSize: take };

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
          project: {
            select: { id: true, title: true },
          },
          _count: {
            select: { comments: true },
          },
        },
        skip,
        take,
      }),
      prisma.ticket.count(),
    ]);

    logger.info("Fetched tickets", { total, page, pageSize });
    return NextResponse.json(createPaginatedResponse(tickets, total, page, pageSize));
  } catch (error) {
    logger.error("Error fetching tickets", { error });
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { title, description, clientId, projectId, priority, status } = data;

    if (!title || !description || !clientId) {
      return NextResponse.json({ error: "Title, description, and client are required" }, { status: 400 });
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        clientId,
        projectId: projectId || null,
        priority: priority || "MEDIUM",
        status: status || "OPEN",
      },
    });

    logger.info("Created new ticket", { ticketId: ticket.id, title: ticket.title });
    return NextResponse.json({ ticket });
  } catch (error) {
    logger.error("Error creating ticket", { error });
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}
