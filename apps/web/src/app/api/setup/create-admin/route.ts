import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@support-forge/database";

// ONE-TIME USE: Create admin account
// DELETE THIS FILE AFTER USE
export async function POST(request: Request) {
  try {
    const { secret, email, name } = await request.json();

    // Simple protection - require a secret to run
    if (secret !== "setup-admin-2024-dec") {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    const company = "Wollenlabs";
    const password = "admin123"; // Temporary password

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Update to admin if exists
      const updated = await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
      });

      return NextResponse.json({
        message: "User updated to ADMIN",
        user: {
          id: updated.id,
          email: updated.email,
          name: updated.name,
          role: updated.role,
        },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        company,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      message: "Admin user created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        role: user.role,
      },
      note: "Temporary password is 'admin123' - please change after first login!",
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
