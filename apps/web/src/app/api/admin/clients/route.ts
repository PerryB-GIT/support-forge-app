import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";
import bcrypt from "bcryptjs";
import { getPaginationFromQuery, createPaginatedResponse } from "@/lib/pagination";
import { createLogger } from "@/lib/logger";

const logger = createLogger("clients-api");

// GET - List all clients with pagination
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (\!session || session.user.role \!== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skip, take } = getPaginationFromQuery(req.nextUrl.searchParams);
    const { page, pageSize } = { page: Math.max(1, (skip / take) + 1), pageSize: take };

    const [clients, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: "CLIENT" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          phone: true,
          createdAt: true,
        },
        skip,
        take,
      }),
      prisma.user.count({ where: { role: "CLIENT" } }),
    ]);

    logger.info("Fetched clients", { total, page, pageSize });
    return NextResponse.json(createPaginatedResponse(clients, total, page, pageSize));
  } catch (error) {
    logger.error("Error fetching clients", { error });
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

// POST - Create new client
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (\!session || session.user.role \!== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, password, company, phone } = body;

    if (\!name || \!email || \!password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: company || null,
        phone: phone || null,
        role: "CLIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        createdAt: true,
      },
    });

    logger.info("Created new client", { userId: user.id, email: user.email });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    logger.error("Error creating client", { error });
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
