import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createAcademyCheckoutSession, ACADEMY_PRODUCTS, AcademyProductKey } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productKey, email } = body;

    // Validate product key
    if (!productKey || !Object.keys(ACADEMY_PRODUCTS).includes(productKey)) {
      return NextResponse.json(
        { error: 'Invalid product key' },
        { status: 400 }
      );
    }

    // Get user session if logged in
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const customerEmail = email || session?.user?.email;

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create checkout session
    const checkoutSession = await createAcademyCheckoutSession({
      productKey: productKey as AcademyProductKey,
      customerEmail,
      userId,
      successUrl: `${appUrl}/academy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/academy?canceled=true`,
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch product info
export async function GET() {
  return NextResponse.json({
    products: Object.entries(ACADEMY_PRODUCTS).map(([key, product]) => ({
      key,
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      ...('installments' in product && { installments: product.installments }),
    })),
  });
}
