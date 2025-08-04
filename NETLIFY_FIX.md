# Netlify Configuration Fix

## Issue
The build is failing with: "Your publish directory cannot be the same as the base directory of your site"

## Root Cause
- Base directory: `frontend`
- Publish directory: `frontend` (set via Netlify UI)
- These cannot be the same when using the Next.js plugin

## Solution Applied
Since the Netlify UI setting overrides the config file, I've explicitly set the publish directory in `netlify.toml`:

```toml
[build]
  base = "frontend"
  publish = "frontend/.next"  # This overrides the UI setting
  command = "npm install --legacy-peer-deps && npm run build"
```

## How This Works
1. **Base directory**: `frontend` - where the source code is located
2. **Publish directory**: `frontend/.next` - where Next.js builds the output
3. **Next.js Plugin**: Still handles the deployment but respects the publish directory

## Alternative Solutions
If this approach doesn't work, you can also:

### Option 1: Clear UI Setting (Manual)
1. Go to Netlify site dashboard
2. Navigate to **Site Settings** → **Build & Deploy** → **Build Settings**
3. Clear the **Publish directory** field completely
4. Let the Next.js plugin handle it automatically

### Option 2: Use Different Structure
```toml
[build]
  base = "frontend"
  publish = "frontend/out"  # For static export
```

## Expected Result
With the current fix:
- ✅ Base and publish directories are different
- ✅ Next.js plugin can process the built files
- ✅ All SSR and middleware features should work
- ✅ Build should complete successfully
