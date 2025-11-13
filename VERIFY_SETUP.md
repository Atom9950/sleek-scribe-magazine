# Verify Supabase Setup

## ✅ Step 1: Check Tables Were Created

1. In your Supabase dashboard, click on **Table Editor** in the left sidebar
2. You should see two tables:
   - `article_likes`
   - `article_comments`

If you see both tables, you're good to go! ✅

## ✅ Step 2: Get Your API Keys

1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **API**
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## ✅ Step 3: Create .env File

1. In your project folder (`sleek-scribe-magazine`), create a file named `.env`
2. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file

## ✅ Step 4: Test It!

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to an article page
3. Try liking an article - it should work!
4. Try posting a comment - it should work!
5. Open the same page in an incognito window - you should see the likes and comments from the other browser!

## 🎉 You're Done!

Your likes and comments are now shared across all users!

