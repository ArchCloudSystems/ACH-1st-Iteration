# ArchCloudHub Setup Guide

## Development Setup

For local development, the application uses a development-only authentication provider that bypasses Google OAuth. This makes it easier to develop and test without requiring real Google credentials.

### Quick Start (Development)

```bash
# Clone repository
git clone <repository-url>
cd archcloudhub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## Production Setup

For production deployment, you'll need to configure Google OAuth:

### 1. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google OAuth API
4. Configure OAuth consent screen:
   - User Type: External
   - App name: ArchCloudHub
   - Support email: your@email.com
   - Developer contact: your@email.com

5. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Name: ArchCloudHub
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://your-production-domain.com
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-production-domain.com/api/auth/callback/google
     ```

6. Update your production environment variables:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   NEXTAUTH_SECRET=your_nextauth_secret # Generate with: openssl rand -base64 32
   NEXTAUTH_URL=https://your-production-domain.com
   ```

### 2. Database Setup

1. Create a PostgreSQL database
2. Update DATABASE_URL in your environment
3. Run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### 3. Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred platform:
   ```bash
   npm run deploy
   ```

## Environment Variables

### Development
For local development, only these variables are required:
```env
NEXTAUTH_SECRET=any_random_string
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_local_database_url
```

### Production
All these variables are required in production:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_secure_random_string
NEXTAUTH_URL=https://your-production-domain.com
DATABASE_URL=your_production_database_url
```

## Security Notes

1. The development authentication provider should NEVER be used in production
2. Always use real Google OAuth credentials in production
3. Use strong NEXTAUTH_SECRET values in production
4. Enable HTTPS in production
5. Regularly rotate credentials
6. Keep your environment variables secure

For additional help or issues:
- Create an issue in the GitHub repository
- Contact support@archcloudhub.com