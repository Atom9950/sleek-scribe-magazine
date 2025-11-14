// Supabase service for managing article likes and comments
import { supabase, isSupabaseConfigured } from './supabase';
import { sendNewsletterConfirmationEmail } from './emailService';

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
  userId?: string;
  article_slug: string;
}

export interface Like {
  article_slug: string;
  user_id: string;
}

// Get or create a unique user session ID (stored in localStorage)
const getUserSessionId = (): string => {
  const USER_SESSION_KEY = 'user_session_id';
  let sessionId = localStorage.getItem(USER_SESSION_KEY);
  if (!sessionId) {
    sessionId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_SESSION_KEY, sessionId);
  }
  return sessionId;
};

// Get like count for a specific article
export const getArticleLikes = async (slug: string): Promise<number> => {
  if (!isSupabaseConfigured) {
    return 0;
  }
  
  try {
    const { count, error } = await supabase
      .from('article_likes')
      .select('*', { count: 'exact', head: true })
      .eq('article_slug', slug);

    if (error) {
      console.error('Error fetching likes:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error fetching likes:', error);
    return 0;
  }
};

// Check if current user has liked an article
export const hasUserLiked = async (slug: string): Promise<boolean> => {
  if (!isSupabaseConfigured) {
    return false;
  }
  
  try {
    const userId = getUserSessionId();
    const { data, error } = await supabase
      .from('article_likes')
      .select('id')
      .eq('article_slug', slug)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking like status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking like status:', error);
    return false;
  }
};

// Toggle like for an article
export const toggleArticleLike = async (slug: string): Promise<number> => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured. Please set up your .env file.');
    return 0;
  }
  
  try {
    const userId = getUserSessionId();
    console.log('Toggling like for slug:', slug, 'userId:', userId);
    
    // Check if user has already liked
    const { data: existingLike, error: checkError } = await supabase
      .from('article_likes')
      .select('id')
      .eq('article_slug', slug)
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing like:', checkError);
      console.error('Error details:', JSON.stringify(checkError, null, 2));
    }

    if (existingLike) {
      // Unlike: delete the like
      console.log('Unliking - deleting existing like');
      const { error } = await supabase
        .from('article_likes')
        .delete()
        .eq('article_slug', slug)
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Error unliking:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        throw error;
      }
      console.log('✅ Successfully unliked');
    } else {
      // Like: insert new like
      console.log('Liking - inserting new like');
      const { data, error } = await supabase
        .from('article_likes')
        .insert({
          article_slug: slug,
          user_id: userId
        })
        .select();

      if (error) {
        console.error('❌ Error liking:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        throw error;
      }
      console.log('✅ Successfully liked, inserted data:', data);
    }

    // Return updated like count
    const count = await getArticleLikes(slug);
    console.log('Updated like count:', count);
    return count;
  } catch (error: any) {
    console.error('❌ Error toggling like:', error);
    if (error?.code === '42501') {
      console.error('🔒 PERMISSION DENIED - Check your RLS policies!');
      console.error('Make sure your RLS policies allow anonymous INSERT and DELETE');
    }
    return await getArticleLikes(slug);
  }
};

// Get comments for a specific article
export const getArticleComments = async (slug: string): Promise<Comment[]> => {
  if (!isSupabaseConfigured) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('article_comments')
      .select('*')
      .eq('article_slug', slug)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    return (data || []).map(comment => ({
      id: comment.id,
      text: comment.text,
      timestamp: new Date(comment.timestamp).getTime(),
      userId: comment.user_id,
      article_slug: comment.article_slug
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Add a comment to an article
export const addArticleComment = async (slug: string, text: string): Promise<Comment[]> => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured. Please set up your .env file.');
    return [];
  }
  
  try {
    const userId = getUserSessionId();
    const commentText = text.trim();
    
    console.log('Adding comment for slug:', slug, 'userId:', userId, 'text:', commentText);
    
    const { data, error } = await supabase
      .from('article_comments')
      .insert({
        article_slug: slug,
        text: commentText,
        user_id: userId,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error adding comment:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      
      if (error.code === '42501') {
        console.error('🔒 PERMISSION DENIED - Check your RLS policies!');
        console.error('Make sure your RLS policies allow anonymous INSERT');
      }
      
      throw error;
    }

    console.log('✅ Successfully added comment, data:', data);
    return await getArticleComments(slug);
  } catch (error: any) {
    console.error('❌ Error adding comment:', error);
    return await getArticleComments(slug);
  }
};

// Delete a comment from an article
export const deleteArticleComment = async (slug: string, commentId: string): Promise<Comment[]> => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured. Please set up your .env file.');
    return [];
  }
  
  try {
    const userId = getUserSessionId();

    // First verify the comment belongs to the user
    const { data: comment, error: fetchError } = await supabase
      .from('article_comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (fetchError || !comment) {
      console.error('Error fetching comment:', fetchError);
      return await getArticleComments(slug);
    }

    if (comment.user_id !== userId) {
      console.error('User does not own this comment');
      return await getArticleComments(slug);
    }

    // Delete the comment
    const { error } = await supabase
      .from('article_comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting comment:', error);
      return await getArticleComments(slug);
    }

    return await getArticleComments(slug);
  } catch (error) {
    console.error('Error deleting comment:', error);
    return await getArticleComments(slug);
  }
};

// Check if a comment belongs to the current user
export const isCommentOwner = (comment: Comment): boolean => {
  if (!comment.userId) return false;
  const userId = getUserSessionId();
  return comment.userId === userId;
};

// Newsletter subscription functions
export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      message: 'নিউজলেটার সার্ভিস কনফিগার করা হয়নি। অনুগ্রহ করে সাপোর্টের সঙ্গে যোগাযোগ করুন।'
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      success: false,
      message: 'অনুগ্রহ করে একটি বৈধ ইমেল ঠিকানা লিখুন।'
    };
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, status')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing subscription:', checkError);
      return {
        success: false,
        message: 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
      };
    }

    // If already subscribed and active, return success message
    if (existing && existing.status === 'active') {
      return {
        success: true,
        message: 'আপনি ইতিমধ্যেই আমাদের নিউজলেটারে সাবস্ক্রাইব করেছেন!'
      };
    }

    // If exists but unsubscribed, reactivate
    if (existing && existing.status === 'unsubscribed') {
      const { error: updateError } = await supabase
        .from('newsletter_subscriptions')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error reactivating subscription:', updateError);
        return {
          success: false,
          message: 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
        };
      }

      // Send welcome back email (don't fail if email fails)
      sendNewsletterConfirmationEmail(normalizedEmail).catch((error) => {
        console.warn('Failed to send welcome back email:', error);
      });

      return {
        success: true,
        message: 'ফিরে আসার জন্য স্বাগতম! আপনাকে আবার আমাদের নিউজলেটারে সাবস্ক্রাইব করা হয়েছে।'
      };
    }

    // New subscription
    const { error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: normalizedEmail,
        status: 'active',
        subscribed_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error subscribing to newsletter:', insertError);
      
      if (insertError.code === '23505') { // Unique constraint violation
        return {
          success: false,
          message: 'এই ইমেলটি ইতিমধ্যেই সাবস্ক্রাইব করা রয়েছে।'
        };
      }

      if (insertError.code === '42501') {
        console.error('🔒 PERMISSION DENIED - Check your RLS policies!');
        return {
          success: false,
          message: 'অনুমতি অস্বীকৃত হয়েছে। অনুগ্রহ করে আপনার ডাটাবেস কনফিগারেশন পরীক্ষা করুন।'
        };
      }

      return {
        success: false,
        message: 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
      };
    }

    // Send confirmation email (don't fail subscription if email fails)
    sendNewsletterConfirmationEmail(normalizedEmail).catch((error) => {
      console.warn('Failed to send confirmation email:', error);
      // Subscription is still successful even if email fails
    });

    return {
      success: true,
      message: 'ধন্যবাদ সাবস্ক্রাইব করার জন্য! আপনার ইমেলটি আমাদের তালিকায় যোগ করা হয়েছে।'
    };
  } catch (error: any) {
    console.error('❌ Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
    };
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      message: 'নিউজলেটার সার্ভিস কনফিগার করা হয়নি।'
    };
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ status: 'unsubscribed' })
      .eq('email', normalizedEmail);

    if (error) {
      console.error('Error unsubscribing:', error);
      return {
        success: false,
        message: 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
      };
    }

    return {
      success: true,
      message: 'আপনাকে আমাদের নিউজলেটার থেকে আনসাবস্ক্রাইব করা হয়েছে।'
    };
  } catch (error: any) {
    console.error('❌ Error unsubscribing:', error);
    return {
      success: false,
      message: 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
    };
  }
};

