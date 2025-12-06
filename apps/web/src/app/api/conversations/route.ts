import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@support-forge/database";

// GET /api/conversations - List all conversations for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");

    const conversations = await prisma.conversation.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: { messages: true },
        },
      },
    });

    // Check if there are more results
    let nextCursor: string | undefined;
    if (conversations.length > limit) {
      const nextItem = conversations.pop();
      nextCursor = nextItem?.id;
    }

    return NextResponse.json({
      conversations: conversations.map((conv: typeof conversations[0]) => ({
        id: conv.id,
        title: conv.title,
        model: conv.model,
        messageCount: conv._count.messages,
        lastMessage: conv.messages[0]?.content.slice(0, 100),
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
      })),
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}

// POST /api/conversations - Create a new conversation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, model = "claude-3-sonnet-20240229" } = body;

    const conversation = await prisma.conversation.create({
      data: {
        title: title || "New Conversation",
        model,
        userId: session.user.id,
      },
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 }
    );
  }
}
