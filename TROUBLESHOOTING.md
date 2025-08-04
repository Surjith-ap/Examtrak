# 🔧 Troubleshooting "Failed to save progress"

## Step-by-Step Fix Guide

### Step 1: Check Browser Console
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for these messages when you click a checkbox:
   - `🔄 Saving progress:` - Shows data being sent
   - `✅ Progress saved successfully` - Success
   - `❌ Supabase error:` - Shows specific error

### Step 2: Verify Database Tables Exist

**Go to your Supabase Dashboard:**
1. Visit [supabase.com](https://supabase.com) → Your Project
2. Go to **Table Editor** in the sidebar
3. Check if these tables exist:
   - ✅ `user_progress`
   - ✅ `study_sessions` 
   - ✅ `user_stats`

**If tables are missing:**
1. Go to **SQL Editor** in Supabase
2. Copy the entire contents of `database/supabase_schema.sql`
3. Paste and click **Run**
4. You should see "Success. No rows returned" messages

### Step 3: Test Connection

**With Debug Panel:**
1. Sign in to your app
2. Look for the "🔧 Supabase Debug Panel" in bottom-left corner
3. Check the connection status:
   - ✅ Connected + ✅ Tables Exist = Good
   - ❌ Failed = Check steps below

### Step 4: Verify Environment Variables

**Check your `frontend/.env.local` file:**
```bash
# Must have these lines:
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Get correct values from Supabase:**
1. Supabase Dashboard → **Settings** → **API**
2. Copy **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **Project API Key** (anon/public) → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 5: Restart Development Server

After changing `.env.local`:
```bash
# Stop server (Ctrl+C)
# Restart server
npm run dev
```

### Step 6: Check Supabase Project Status

1. Go to Supabase Dashboard
2. Check if project is **Active** (not paused)
3. If paused, click **Resume** button

## Common Error Messages & Fixes

### ❌ `relation "user_progress" does not exist`
**Fix:** Run the database schema in Supabase SQL Editor

### ❌ `Invalid API key`
**Fix:** Copy correct anon key from Supabase Settings → API

### ❌ `Network request failed`
**Fix:** Check internet connection and Supabase project status

### ❌ `JWT expired` or `Invalid JWT`
**Fix:** Get fresh API key from Supabase dashboard

## Testing Checklist

✅ **Environment variables set correctly**
✅ **Database schema has been run**  
✅ **Supabase project is active**
✅ **Development server restarted after env changes**
✅ **User is signed in with Clerk**
✅ **Browser console shows no errors**

## Manual Test

1. **Test database connection:**
   - Use the "Test Insert" button in debug panel
   - Should show "✅ Test insert successful!"

2. **Check database data:**
   - Go to Supabase → Table Editor → `user_progress`
   - You should see test rows being created

## Quick Fix Commands

```bash
# 1. Stop development server
# Ctrl+C

# 2. Check environment file exists
ls frontend/.env.local

# 3. Restart with fresh environment
cd frontend
npm run dev
```

## Still Not Working?

**Get detailed error info:**
1. Open browser console
2. Try checking a checkbox
3. Copy the full error message from console
4. Share the error details for specific help

**The error message will show exactly what's wrong:**
- Connection issues
- Missing tables  
- Authentication problems
- API key issues
