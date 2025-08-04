# Database Setup Instructions

The error you're seeing (`Could not find the 'completed_items' column`) indicates that the database schema hasn't been properly applied to your Supabase database.

## Step 1: Apply Database Schema

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Schema**
   - Copy the ENTIRE contents of `database/supabase_schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" button

4. **Verify Tables Created**
   - Go to "Table Editor" in the left sidebar
   - You should see 3 tables:
     - `user_progress` (with `completed_items` column)
     - `study_sessions`
     - `user_stats`

## Step 2: Verify Environment Variables

Make sure your `frontend/.env.local` file contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Restart Development Server

After applying the schema:

```bash
cd frontend
npm run dev
```

## Step 4: Test the Application

1. Open localhost:3000
2. Sign in with Clerk
3. Try clicking checkboxes
4. Check the debug panel in bottom-left corner

## Troubleshooting

If you still see errors:

1. **Check Console**: Open browser DevTools → Console tab
2. **Check Debug Panel**: Look at the connection status in bottom-left
3. **Verify Tables**: In Supabase Table Editor, confirm `user_progress` table exists with `completed_items` column
4. **Re-run Schema**: If tables are missing, run the SQL schema again

## Common Issues

- **Schema not applied**: Run the SQL in Supabase SQL Editor
- **Wrong environment variables**: Check .env.local file
- **Server not restarted**: Restart npm run dev after schema changes
