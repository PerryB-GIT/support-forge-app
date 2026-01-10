import { NextRequest, NextResponse } from "next/server";

// Access code stored in environment variable
// Set SF_SETUP_ACCESS_CODE in your .env file
const ACCESS_CODE = process.env.SF_SETUP_ACCESS_CODE || "sf-academy-2024";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    // Simple comparison - in production you might want to hash this
    if (password === ACCESS_CODE) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
