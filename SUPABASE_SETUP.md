# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/sign in
3. Click "New Project"
4. Choose your organization and fill in:
   - Project name: `syllabus-progress-tracker`
   - Database password: (generate a strong password)
   - Region: Choose closest to your users

## 2. Get Your Project Credentials

After your project is created:

1. Go to Project Settings → API
2. Copy the following values:
   - **Project URL** (under Project URL)
   - **Project API Key** (anon/public key)

## 3. Set Up Database Schema

1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `database/supabase_schema.sql`
3. Paste it into the SQL Editor and click "Run"
4. This will create all necessary tables and security policies

## 4. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory with:

```env
# Clerk Authentication (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Configuration (new)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Enable Row Level Security (RLS)

The SQL schema automatically enables RLS, but here's what it does:

- **Row Level Security**: Ensures users can only access their own data
- **Policies**: Automatically created for SELECT, INSERT, UPDATE, DELETE operations
- **Authentication**: Uses Clerk user IDs for data isolation

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Sign in with Clerk authentication
3. Navigate between Syllabus and Progress tabs
4. Check/uncheck some topics in the syllabus
5. Go to Progress tab to see your analytics

## 7. Database Tables Created

### `user_progress`
- Tracks completion percentage for each topic
- Stores last accessed time and completion date
- Links to Clerk user ID

### `study_sessions`
- Records study time for each session
- Tracks questions answered and accuracy
- Used for streak calculation and analytics

### `user_stats`
- Aggregated statistics per user
- Total study time, completed topics
- Current and longest study streaks

## 8. Key Features

✅ **Automatic Progress Saving**: Every checkbox click updates the database
✅ **Real-time Analytics**: Progress dashboard updates instantly
✅ **Study Streaks**: Track daily study habits
✅ **Cross-device Sync**: Progress syncs across all devices
✅ **Privacy-First**: Each user only sees their own data

## 9. Optional: Add Sample Data

For testing, you can add sample data by:

1. Uncomment the sample data section in `supabase_schema.sql`
2. Replace `'sample_user_id'` with your actual Clerk user ID
3. Run the INSERT statements

## 10. Troubleshooting

**Common Issues:**

1. **"Cannot find user_id"**: Make sure you're signed in with Clerk
2. **"Permission denied"**: Check RLS policies are enabled
3. **"Table doesn't exist"**: Run the schema SQL again
4. **Environment variables**: Make sure `.env.local` is in the `frontend` folder

**Debug Steps:**

1. Check Supabase logs in the dashboard
2. Open browser console for JavaScript errors
3. Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`

## Security Notes

🔒 **Your data is secure:**
- All user data is isolated using Row Level Security
- Clerk handles authentication securely
- Supabase provides enterprise-grade security
- No user can access another user's progress data
