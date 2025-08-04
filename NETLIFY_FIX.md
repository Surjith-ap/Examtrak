# Netlify Configuration Fix

## Issue
The build is failing with: "Your publish directory cannot be the same as the base directory of your site"

## Root Cause
- Base directory: `frontend`
- Publish directory: `frontend` (set via Netlify UI)
- These cannot be the same when using the Next.js plugin

## Solution

### Step 1: Clear Publish Directory in Netlify Dashboard
1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Build & Deploy** → **Build Settings**
3. Under **Build Settings**:
   - **Base directory**: Should be `frontend` ✅
   - **Publish directory**: Should be **EMPTY** or **CLEAR THIS FIELD**
   - **Build command**: Should be `npm install --legacy-peer-deps && npm run build` ✅

### Step 2: Let the Next.js Plugin Handle Publishing
The `@netlify/plugin-nextjs` plugin automatically:
- Detects the correct output directory (`.next`)
- Handles server-side rendering setup
- Configures edge functions for middleware
- Sets up proper redirects

### Step 3: Expected Configuration
After clearing the publish directory, your build settings should show:
```
Base directory: frontend
Publish directory: (empty)
Build command: npm install --legacy-peer-deps && npm run build
```

### Step 4: Verify Fix
1. Clear the publish directory field in Netlify dashboard
2. Trigger a new deploy
3. The build should complete successfully

## Alternative Solution
If you prefer to set a specific publish directory:
- Use `frontend/.next` as the publish directory
- But this is NOT recommended with the Next.js plugin

## Why This Happens
- Netlify UI settings override `netlify.toml` file settings
- The Next.js plugin expects to control the output directory
- Base and publish directories must be different for security reasons
