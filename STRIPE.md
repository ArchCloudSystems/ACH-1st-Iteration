# Stripe Integration Guide for ArchCloudHub

This guide explains how to set up and configure Stripe for payment processing in ArchCloudHub.

## Prerequisites

1. A Stripe account (create one at https://stripe.com)
2. Access to the Stripe Dashboard
3. Your application running in development or production

## Setup Steps

### 1. Get API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Developers > API keys
3. Copy your Secret Key and add it to your environment variables:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

### 2. Create Products and Prices

1. Go to Products > Add Product in your Stripe Dashboard
2. Create the Pro Plan:
   - Name: "Pro Plan"
   - Price: $49.00
   - Billing: One-time
   - Click "Save"
3. Copy the Price ID and add it to your environment variables:
   ```
   STRIPE_PRO_PRICE_ID=price_...
   ```

### 3. Configure Webhooks

1. Go to Developers > Webhooks in your Stripe Dashboard
2. Click "Add Endpoint"
3. Add your webhook URL:
   - Development: `http://localhost:3000/api/webhooks/stripe`
   - Production: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click "Add Endpoint"
6. Copy the Webhook Secret and add it to your environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### 4. Environment Variables

Add these variables to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000 # or your production URL
```

### 5. Testing Payments

1. Use Stripe's test card numbers:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002
   - Authentication Required: 4000 0027 6000 3184

2. Use any future expiration date and any CVC

### 6. Going Live

1. Switch to live mode in Stripe Dashboard
2. Update environment variables with live keys
3. Update webhook endpoints with live URLs
4. Test with real cards

## Webhook Events

The application handles these webhook events:

- `checkout.session.completed`: When a payment is successful
  - Updates user's plan to PRO
  - Creates audit log entry
  - Sends confirmation email

## Troubleshooting

1. Payment not processing:
   - Check Stripe Dashboard > Events for errors
   - Verify webhook is receiving events
   - Check application logs

2. Webhook errors:
   - Verify webhook secret is correct
   - Check webhook endpoint is accessible
   - Review Stripe Dashboard > Webhooks > Recent events

3. User not upgraded after payment:
   - Check webhook is receiving events
   - Verify user ID in metadata
   - Check database queries in webhook handler

## Security Best Practices

1. Always use HTTPS in production
2. Keep API keys secure and never expose them
3. Validate webhook signatures
4. Use Stripe's test mode for development
5. Regularly rotate webhook secrets
6. Monitor Stripe Dashboard for suspicious activity

## Support

For issues with:
- Stripe integration: contact Stripe support
- Application integration: create GitHub issue
- Billing questions: contact support@archcloudhub.com