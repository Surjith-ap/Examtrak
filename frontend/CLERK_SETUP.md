# Clerk Authentication Setup Guide

## 🔐 Clerk Authentication has been added to your Interactive Syllabus project!

### What's Included:

1. **✅ User Authentication**: Sign up, sign in, and sign out functionality
2. **✅ Protected Routes**: Main syllabus content requires authentication
3. **✅ User Profile Management**: Complete profile management interface
4. **✅ Responsive Design**: Authentication UI matches your app's warm color scheme
5. **✅ Landing Page**: Beautiful landing page for non-authenticated users

### Files Added/Modified:

- `src/app/layout.tsx` - Added ClerkProvider
- `src/middleware.ts` - Route protection
- `src/app/sign-in/[[...sign-in]]/page.tsx` - Sign in page
- `src/app/sign-up/[[...sign-up]]/page.tsx` - Sign up page
- `src/app/user-profile/[[...user-profile]]/page.tsx` - User profile page
- `src/components/Header.tsx` - Added auth buttons and user menu
- `src/app/page.tsx` - Landing page + protected content
- `.env.local` - Environment variables (needs your keys)

### Setup Instructions:

#### 1. Create a Clerk Account
1. Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Sign up for a free account
3. Create a new application

#### 2. Get Your API Keys
1. In your Clerk dashboard, go to **Developers** → **API Keys**
2. Copy your **Publishable Key** and **Secret Key**

#### 3. Update Environment Variables
Replace the placeholder values in `frontend/.env.local`:

```env
# Replace these with your actual Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
CLERK_SECRET_KEY=sk_test_your_actual_secret_key
```

#### 4. Configure Your Clerk Application
In your Clerk Dashboard:

1. **Domain Settings**:
   - Set your domain to `http://localhost:3001` for development
   - For production, update to your actual domain

2. **Social Providers** (Optional):
   - Go to **User & Authentication** → **Social Providers**
   - Enable Google, GitHub, etc. if desired

3. **Appearance** (Optional):
   - Customize the look to match your brand

#### 5. Test the Authentication

1. Restart your development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Visit `http://localhost:3001`
3. You should see the landing page
4. Click "Sign In" to test authentication

### Features Available:

#### 🔓 **Public Pages**:
- Landing page with feature overview
- Beautiful sign-in/sign-up forms

#### 🔒 **Protected Pages** (requires authentication):
- Interactive syllabus with progress tracking
- All original functionality preserved
- User profile management

#### 🎨 **UI Features**:
- Custom styling that matches your warm color scheme
- Responsive design
- User welcome message in header
- User button with profile dropdown

### Development vs Production:

**Development** (Current):
- Uses `http://localhost:3001`
- Test mode keys (pk_test_* and sk_test_*)

**Production** (When you deploy):
- Update domain in Clerk dashboard
- Use production keys (pk_live_* and sk_live_*)
- Update `.env.local` with production keys

### Next Steps:

1. **Set up your Clerk keys** (most important!)
2. **Test authentication flow**
3. **Customize appearance** in Clerk dashboard if needed
4. **Add social providers** if desired
5. **Deploy to production** when ready

### Troubleshooting:

- **"Invalid publishable key"**: Make sure you've updated `.env.local` with real keys
- **Auth not working**: Restart your development server after updating env vars
- **Styling issues**: Clerk components are customized with your color scheme

Your app now has enterprise-grade authentication! 🎉
