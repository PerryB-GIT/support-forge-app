import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@support-forge/database";
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Generate reset token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email.toLowerCase() },
    });

    // Create new token
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token,
        expires,
      },
    });

    // Generate reset link
    const baseUrl = process.env.NEXTAUTH_URL || "https://support-forge.com";
    const resetLink = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email
    await sendEmail({
      to: email,
      subject: "Reset your Support Forge password",
      html: generatePasswordResetEmailHtml(user.name, resetLink),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

function generatePasswordResetEmailHtml(name: string, resetLink: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #c9a227; margin: 0; font-size: 28px;">Support Forge</h1>
    <p style="color: #888; margin: 5px 0 0 0;">Password Reset Request</p>
  </div>

  <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-top: none;">
    <p>Hi ${name},</p>

    <p>We received a request to reset your password for your Support Forge account. Click the button below to set a new password:</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" style="display: inline-block; background: #c9a227; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Reset Password
      </a>
    </div>

    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>

    <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #c9a227; font-size: 14px;">${resetLink}</p>
  </div>

  <div style="background: #1a1a2e; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="color: #888; margin: 0; font-size: 14px;">Support Forge - AI & IT Consulting Services</p>
    <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
      <a href="https://support-forge.com" style="color: #c9a227;">support-forge.com</a>
    </p>
  </div>
</body>
</html>
  `;
}
