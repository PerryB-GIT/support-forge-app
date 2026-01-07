import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Warning: STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

// Academy course products
export const ACADEMY_PRODUCTS = {
  selfPaced: {
    name: 'AI Academy - Self-Paced',
    description: 'Complete LAUNCH Method curriculum with 12+ hours of video training',
    price: 997,
    priceId: process.env.STRIPE_ACADEMY_PRICE_ID,
    features: [
      'Complete LAUNCH Method curriculum',
      '12+ hours of video training',
      'Private community access',
      'Monthly group coaching calls',
      'Templates & prompt libraries',
      'Lifetime updates',
    ],
  },
  paymentPlan: {
    name: 'AI Academy - Payment Plan',
    description: '3 monthly payments for the self-paced course',
    price: 397,
    priceId: process.env.STRIPE_ACADEMY_PAYMENT_PLAN_PRICE_ID,
    installments: 3,
    features: [
      'Same as one-time payment',
      '3 monthly installments of $397',
      'Access unlocked after first payment',
    ],
  },
  liveTutoring: {
    name: 'AI Academy + Live Tutoring',
    description: 'Personalized tutor-led training with 1-on-1 sessions',
    price: 1500,
    priceId: process.env.STRIPE_ACADEMY_LIVE_PRICE_ID,
    features: [
      'Everything in Self-Paced, plus:',
      '4x 1-hour live tutoring sessions',
      'Personalized curriculum path',
      'Direct Slack/email access to tutor',
      'Custom project guidance',
      'Priority support for 90 days',
    ],
  },
} as const;

export type AcademyProductKey = keyof typeof ACADEMY_PRODUCTS;

// Create a checkout session for academy courses
export async function createAcademyCheckoutSession({
  productKey,
  customerEmail,
  userId,
  successUrl,
  cancelUrl,
}: {
  productKey: AcademyProductKey;
  customerEmail?: string;
  userId?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const product = ACADEMY_PRODUCTS[productKey];

  if (!product.priceId) {
    // If no price ID configured, create a one-time price
    const session = await stripe.checkout.sessions.create({
      mode: productKey === 'paymentPlan' ? 'subscription' : 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price * 100, // Stripe uses cents
            ...(productKey === 'paymentPlan' && {
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        productKey,
        userId: userId || '',
        productName: product.name,
      },
      ...(productKey === 'paymentPlan' && {
        subscription_data: {
          metadata: {
            productKey,
            userId: userId || '',
            installments_remaining: '3',
          },
        },
      }),
    });

    return session;
  }

  // Use configured price ID
  const session = await stripe.checkout.sessions.create({
    mode: productKey === 'paymentPlan' ? 'subscription' : 'payment',
    customer_email: customerEmail,
    line_items: [
      {
        price: product.priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      productKey,
      userId: userId || '',
      productName: product.name,
    },
  });

  return session;
}

// Verify webhook signature
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
