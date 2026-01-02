import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@support-forge/database";
import { applyRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Apply rate limiting based on IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const rateLimitResponse = applyRateLimit(`register:${ip}`, "auth");
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();
    const { email, password, name, company, phone } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        company,
        phone,
        role: "CLIENT",
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
