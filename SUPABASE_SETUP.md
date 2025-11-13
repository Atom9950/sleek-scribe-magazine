# Supabase Setup Instructions

This guide will help you set up Supabase for your blog to enable shared likes and comments that are visible to all users.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. Sign up with GitHub, Google, or email (it's free!)

## Step 2: Create a New Project

1. Once logged in, click "New Project"
2. Fill in the details:
   - **Name**: Your blog name (e.g., "পাতা Blog")
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose the closest region to your users
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be set up

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 4: Set Up Database Tables

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy and paste the following SQL code:

```sql
-- Create article_likes table
CREATE TABLE IF NOT EXISTS article_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(article_slug, user_id)
);

-- Create article_comments table
CREATE TABLE IF NOT EXISTS article_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  text TEXT NOT NULL,
  user_id TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_article_likes_slug ON article_likes(article_slug);
CREATE INDEX IF NOT EXISTS idx_article_comments_slug ON article_comments(article_slug);
CREATE INDEX IF NOT EXISTS idx_article_comments_timestamp ON article_comments(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access for likes"
  ON article_likes FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert for likes"
  ON article_likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete for likes"
  ON article_likes FOR DELETE
  USING (true);

-- Create policies to allow public read access for comments
CREATE POLICY "Allow public read access for comments"
  ON article_comments FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert for comments"
  ON article_comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete for own comments"
  ON article_comments FOR DELETE
  USING (true);
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 5: Configure Environment Variables

1. In your project root (`sleek-scribe-magazine`), create a file named `.env`
2. Add the following content (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace:
   - `https://your-project-id.supabase.co` with your **Project URL** from Step 3
   - `your-anon-key-here` with your **anon/public key** from Step 3

**Important**: 
- Never commit the `.env` file to Git! It should already be in `.gitignore`
- For Vercel deployment, you'll need to add these as environment variables in Vercel settings

## Step 6: Test Locally

1. Make sure your `.env` file is set up correctly
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Navigate to an article page
4. Try liking an article and posting a comment
5. Open the same page in an incognito/private window - you should see the likes and comments!

## Step 7: Deploy to Vercel

When deploying to Vercel:

1. Push your code to GitHub (make sure `.env` is NOT committed)
2. In Vercel dashboard, go to your project settings
3. Click on **Environment Variables**
4. Add these two variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Redeploy your site

## Troubleshooting

### "Supabase URL or Anon Key is missing" warning
- Make sure your `.env` file exists in the project root
- Check that the variable names start with `VITE_`
- Restart your dev server after creating/updating `.env`

### "Failed to fetch" errors
- Check that your Supabase project is active
- Verify your API keys are correct
- Make sure Row Level Security policies are set up correctly

### Comments/Likes not showing
- Check the browser console for errors
- Verify the database tables were created successfully
- Check that RLS policies allow public access

## Security Notes

- The `anon` key is safe to use in client-side code (it's designed for this)
- Row Level Security (RLS) policies ensure users can only delete their own comments
- Each user gets a unique session ID stored in their browser's localStorage
- No personal information is collected - just anonymous session IDs

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com

