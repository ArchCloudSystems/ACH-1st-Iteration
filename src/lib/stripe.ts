import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
})

export const STRIPE_PLANS = {
  PRO: {
    name: "Pro Plan",
    price: 49,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "10,000 events per month",
      "Unlimited team members",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
      "Audit logs",
      "SSO & SAML",
    ],
  },
} as const

export async function createCheckoutSession({
  userId,
  userEmail,
  planId = STRIPE_PLANS.PRO.priceId,
  successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
  cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
}: {
  userId: string
  userEmail: string
  planId?: string
  successUrl?: string
  cancelUrl?: string
}) {
  if (!planId) {
    throw new Error("Plan ID is required")
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    line_items: [
      {
        price: planId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  })

  return session
}