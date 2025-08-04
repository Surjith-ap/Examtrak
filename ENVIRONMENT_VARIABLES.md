# Environment Variables Setup Guide

## For Local Development

Copy the following into your `frontend/.env.local` file:

```bash
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RyaWtpbmctZHJ1bS04Ni5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_JsPyjtf63TmLw7wmyNbqW0PxGqMjhDsWeoeh4FzHvW

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_USER_PROFILE_URL=/user-profile
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://rehhsubdukbtjhzrbicg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaGhzdWJkdWtidGpoenJiaWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODg5NDksImV4cCI6MjA2OTg2NDk0OX0.O-jKbJZvRKb1PWTYpA84JcVYqsNiq8axy7ZFOm6r074
```

## For Netlify Production

### Method 1: Netlify Dashboard (Recommended)

1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_c3RyaWtpbmctZHJ1bS04Ni5jbGVyay5hY2NvdW50cy5kZXYk` |
| `CLERK_SECRET_KEY` | `sk_test_JsPyjtf63TmLw7wmyNbqW0PxGqMjhDsWeoeh4FzHvW` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_USER_PROFILE_URL` | `/user-profile` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rehhsubdukbtjhzrbicg.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaGhzdWJkdWtidGpoenJiaWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODg5NDksImV4cCI6MjA2OTg2NDk0OX0.O-jKbJZvRKb1PWTYpA84JcVYqsNiq8axy7ZFOm6r074` |

### Method 2: Netlify CLI

```bash
netlify env:set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY "pk_test_c3RyaWtpbmctZHJ1bS04Ni5jbGVyay5hY2NvdW50cy5kZXYk"
netlify env:set CLERK_SECRET_KEY "sk_test_JsPyjtf63TmLw7wmyNbqW0PxGqMjhDsWeoeh4FzHvW"
# ... (repeat for all variables)
```

## Environment Variable Sources

### Clerk Variables
- Get from: https://dashboard.clerk.com/last-active?path=api-keys
- **Publishable Key**: Starts with `pk_test_` or `pk_live_`
- **Secret Key**: Starts with `sk_test_` or `sk_live_`

### Supabase Variables
- Get from: Your Supabase Project → Settings → API
- **URL**: Your project URL (format: `https://[project-id].supabase.co`)
- **Anon Key**: Public anonymous key for client-side operations

## Troubleshooting

### Build Errors
- **"Missing publishableKey"**: Clerk publishable key not set
- **"supabaseUrl is required"**: Supabase URL not set
- **"Authentication failed"**: Check if secret keys are correct

### Verification
1. Check Netlify build logs for environment variable confirmation
2. Verify variables are set in Netlify dashboard
3. Ensure no typos in variable names (case-sensitive)
4. Confirm values don't have extra spaces or quotes

## Security Notes

- Never commit `.env.local` to version control
- Use test keys for development, live keys for production
- Rotate keys periodically for security
- Public keys (starting with `NEXT_PUBLIC_`) are exposed to browsers
