import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, constructWebhookEvent, ACADEMY_PRODUCTS } from '@/lib/stripe';
import { prisma } from '@support-forge/database';
import Stripe from 'stripe';

// Disable body parsing - Stripe needs raw body
export const dynamic = 'force-dynamic';

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { productKey, userId, productName } = session.metadata || {};

  if (!productKey || !Object.keys(ACADEMY_PRODUCTS).includes(productKey)) {
    console.error('Invalid product key in session metadata:', productKey);
    return;
  }

  const product = ACADEMY_PRODUCTS[productKey as keyof typeof ACADEMY_PRODUCTS];
  const customerEmail = session.customer_details?.email || session.customer_email;

  if (!customerEmail) {
    console.error('No customer email found in session');
    return;
  }

  // Check if enrollment already exists
  const existingEnrollment = await prisma.courseEnrollment.findUnique({
    where: { stripeSessionId: session.id },
  });

  if (existingEnrollment) {
    console.log('Enrollment already exists for session:', session.id);
    return;
  }

  // Create enrollment record
  const enrollment = await prisma.courseEnrollment.create({
    data: {
      userId: userId || null,
      email: customerEmail,
      name: session.customer_details?.name || null,
      courseType: productKey,
      courseName: productName || product.name,
      stripeSessionId: session.id,
      stripeCustomerId: typeof session.customer === 'string' ? session.customer : session.customer?.id,
      stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
      amountPaid: (session.amount_total || 0) / 100,
      currency: session.currency || 'usd',
      status: 'ACTIVE',
      enrolledAt: new Date(),
    },
  });

  console.log('Created enrollment:', enrollment.id);

  // TODO: Send welcome email
  // await sendWelcomeEmail(customerEmail, product.name);

  return enrollment;
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Handle subscription updates (for payment plans)
  const enrollment = await prisma.courseEnrollment.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!enrollment) {
    console.log('No enrollment found for subscription:', subscription.id);
    return;
  }

  // Update status based on subscription status
  let status: 'ACTIVE' | 'CANCELLED' | 'PENDING' = 'ACTIVE';
  if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    status = 'CANCELLED';
  } else if (subscription.status === 'past_due') {
    status = 'PENDING';
  }

  await prisma.courseEnrollment.update({
    where: { id: enrollment.id },
    data: { status },
  });
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  // Find enrollment by customer ID or session
  const customerId = typeof charge.customer === 'string' ? charge.customer : charge.customer?.id;

  if (!customerId) return;

  const enrollment = await prisma.courseEnrollment.findFirst({
    where: { stripeCustomerId: customerId },
    orderBy: { createdAt: 'desc' },
  });

  if (enrollment) {
    await prisma.courseEnrollment.update({
      where: { id: enrollment.id },
      data: { status: 'REFUNDED' },
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
