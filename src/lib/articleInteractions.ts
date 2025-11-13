// Utility functions for managing article likes and comments in localStorage

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
  userId?: string; // User session ID to track comment ownership (optional for backward compatibility)
}

const LIKES_STORAGE_KEY = 'article_likes';
const COMMENTS_STORAGE_KEY = 'article_comments';
const USER_SESSION_KEY = 'user_session_id';

// Get or create a unique user session ID
export const getUserSessionId = (): string => {
  let sessionId = localStorage.getItem(USER_SESSION_KEY);
  if (!sessionId) {
    // Generate a unique session ID
    sessionId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_SESSION_KEY, sessionId);
  }
  return sessionId;
};

// Get all likes from localStorage
const getLikes = (): Record<string, number> => {
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Get all comments from localStorage
const getComments = (): Record<string, Comment[]> => {
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Get like count for a specific article
export const getArticleLikes = (slug: string): number => {
  const likes = getLikes();
  return likes[slug] || 0;
};

// Toggle like for an article (increment or decrement)
export const toggleArticleLike = (slug: string): number => {
  const likes = getLikes();
  const currentLikes = likes[slug] || 0;
  
  // Check if user has already liked (using a simple approach)
  // We'll use a separate key to track user's like status
  const userLikesKey = `user_liked_${slug}`;
  const hasLiked = localStorage.getItem(userLikesKey) === 'true';
  
  if (hasLiked) {
    // Unlike: decrement
    likes[slug] = Math.max(0, currentLikes - 1);
    localStorage.removeItem(userLikesKey);
  } else {
    // Like: increment
    likes[slug] = currentLikes + 1;
    localStorage.setItem(userLikesKey, 'true');
  }
  
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
  return likes[slug];
};

// Check if current user has liked an article
export const hasUserLiked = (slug: string): boolean => {
  const userLikesKey = `user_liked_${slug}`;
  return localStorage.getItem(userLikesKey) === 'true';
};

// Get comments for a specific article
export const getArticleComments = (slug: string): Comment[] => {
  const comments = getComments();
  return comments[slug] || [];
};

// Add a comment to an article
export const addArticleComment = (slug: string, text: string): Comment[] => {
  const comments = getComments();
  const articleComments = comments[slug] || [];
  const userId = getUserSessionId();
  
  const newComment: Comment = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text: text.trim(),
    timestamp: Date.now(),
    userId: userId
  };
  
  comments[slug] = [...articleComments, newComment];
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  
  return comments[slug];
};

// Delete a comment from an article
export const deleteArticleComment = (slug: string, commentId: string): Comment[] => {
  const comments = getComments();
  const articleComments = comments[slug] || [];
  const userId = getUserSessionId();
  
  // Only allow deletion if the comment belongs to the current user
  const comment = articleComments.find(c => c.id === commentId);
  if (comment && comment.userId === userId) {
    comments[slug] = articleComments.filter(c => c.id !== commentId);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
    return comments[slug];
  }
  
  return articleComments;
};

// Check if a comment belongs to the current user
export const isCommentOwner = (comment: Comment): boolean => {
  if (!comment.userId) return false; // Old comments without userId cannot be deleted
  const userId = getUserSessionId();
  return comment.userId === userId;
};

