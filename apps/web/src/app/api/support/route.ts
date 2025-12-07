import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

// GET - Fetch user's tickets
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await prisma.ticket.findMany({
      where: { clientId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

// POST - Create new ticket and send email notification
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject, priority, description } = await req.json();

    if (!subject || !description) {
      return NextResponse.json(
        { error: "Subject and description are required" },
        { status: 400 }
      );
    }

    // Create the ticket
    const ticket = await prisma.ticket.create({
      data: {
        title: subject,
        description,
        priority: priority || "MEDIUM",
        status: "OPEN",
        clientId: session.user.id,
      },
    });

    // Get user details for email
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, company: true, phone: true },
    });

    // Send email notification using a simple fetch to an email service
    // For now, we'll log the email that would be sent
    // In production, integrate with SendGrid, Resend, AWS SES, etc.
    const emailData = {
      to: "perry.bailes@gmail.com",
      subject: `[SupportForge] New Support Ticket: ${subject}`,
      html: `
        <h2>New Support Ticket Submitted</h2>
        <p><strong>Ticket ID:</strong> ${ticket.id}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Status:</strong> OPEN</p>
        <hr />
        <h3>Description:</h3>
        <p>${description.replace(/\n/g, "<br/>")}</p>
        <hr />
        <h3>Submitted By:</h3>
        <p><strong>Name:</strong> ${user?.name || "Unknown"}</p>
        <p><strong>Email:</strong> ${user?.email || "Unknown"}</p>
        ${user?.company ? `<p><strong>Company:</strong> ${user.company}</p>` : ""}
        ${user?.phone ? `<p><strong>Phone:</strong> ${user.phone}</p>` : ""}
        <hr />
        <p><em>This ticket was submitted via the SupportForge Client Portal.</em></p>
      `,
    };

    // Log email for development (replace with actual email service in production)
    console.log("Support ticket email notification:", emailData);

    // Try to send email via the email API if configured
    try {
      await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
    } catch (emailError) {
      // Log but don't fail the request if email fails
      console.error("Failed to send email notification:", emailError);
    }

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
