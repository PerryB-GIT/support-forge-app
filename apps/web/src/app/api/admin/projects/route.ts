import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";
import { getPaginationFromQuery, createPaginatedResponse } from "@/lib/pagination";
import { createLogger } from "@/lib/logger";

const logger = createLogger("projects-api");

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { skip, take } = getPaginationFromQuery(req.nextUrl.searchParams);
    const { page, pageSize } = { page: Math.max(1, (skip / take) + 1), pageSize: take };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { tickets: true },
          },
        },
        skip,
        take,
      }),
      prisma.project.count(),
    ]);

    logger.info("Fetched projects", { total, page, pageSize });
    return NextResponse.json(createPaginatedResponse(projects, total, page, pageSize));
  } catch (error) {
    logger.error("Error fetching projects", { error });
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { title, description, clientId, status, budget, startDate, endDate } = data;

    if (!title || !clientId) {
      return NextResponse.json({ error: "Title and client are required" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description: description || null,
        clientId,
        status: status || "ACTIVE",
        budget: budget ? parseFloat(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    logger.info("Created new project", { projectId: project.id, title: project.title });
    return NextResponse.json({ project });
  } catch (error) {
    logger.error("Error creating project", { error });
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
