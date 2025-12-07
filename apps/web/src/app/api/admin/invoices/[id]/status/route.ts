import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

// POST - Update invoice status
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Get form data or JSON body
    let status: string;
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      status = formData.get("status") as string;
    } else {
      const body = await req.json();
      status = body.status;
    }

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "paid", "overdue", "cancelled"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update invoice
    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
        status: status.toLowerCase(),
        paidDate: status.toLowerCase() === "paid" ? new Date() : null,
      },
    });

    // For form submissions, redirect back to invoices page
    if (contentType?.includes("application/x-www-form-urlencoded")) {
      return NextResponse.redirect(new URL("/admin/invoices", req.url));
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return NextResponse.json(
      { error: "Failed to update invoice status" },
      { status: 500 }
    );
  }
}
