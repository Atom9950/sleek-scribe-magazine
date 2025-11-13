// Supabase service for managing article likes and comments
import { supabase, isSupabaseConfigured } from './supabase';

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
    
    // Check if user has already liked
    const { data: existingLike } = await supabase
      .from('article_likes')
      .select('id')
      .eq('article_slug', slug)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Unlike: delete the like
      const { error } = await supabase
        .from('article_likes')
        .delete()
        .eq('article_slug', slug)
        .eq('user_id', userId);

      if (error) {
        console.error('Error unliking:', error);
        return await getArticleLikes(slug);
      }
    } else {
      // Like: insert new like
      const { error } = await supabase
        .from('article_likes')
        .insert({
          article_slug: slug,
          user_id: userId
        });

      if (error) {
        console.error('Error liking:', error);
        return await getArticleLikes(slug);
      }
    }

    // Return updated like count
    return await getArticleLikes(slug);
  } catch (error) {
    console.error('Error toggling like:', error);
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
    
    const { data, error } = await supabase
      .from('article_comments')
      .insert({
        article_slug: slug,
        text: text.trim(),
        user_id: userId,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding comment:', error);
      return await getArticleComments(slug);
    }

    return await getArticleComments(slug);
  } catch (error) {
    console.error('Error adding comment:', error);
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

