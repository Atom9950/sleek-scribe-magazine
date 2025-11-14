import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import { getArticleBySlug } from '../data/articles';
import { 
  getArticleLikes, 
  toggleArticleLike, 
  hasUserLiked,
  getArticleComments, 
  addArticleComment,
  deleteArticleComment,
  isCommentOwner,
  type Comment 
} from '../lib/supabaseInteractions';

const ArticlePage = () => {
  const { slug } = useParams(); // Get the slug from URL
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Get article data based on slug
  const articleData = slug ? getArticleBySlug(slug) : null;

  // Load likes and comments from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        try {
          setLoading(true);
          const [likes, userLiked, articleComments] = await Promise.all([
            getArticleLikes(slug),
            hasUserLiked(slug),
            getArticleComments(slug)
          ]);
          
          setLikeCount(likes);
          setLiked(userLiked);
          setComments(articleComments);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [slug]);

  // If article not found, redirect to 404
  if (!articleData) {
    return <Navigate to="/404" replace />;
  }

  const handleLike = async () => {
    if (slug) {
      try {
        const newLikeCount = await toggleArticleLike(slug);
        const userHasLiked = await hasUserLiked(slug);
        setLikeCount(newLikeCount);
        setLiked(userHasLiked);
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && slug && !submittingComment) {
      try {
        setSubmittingComment(true);
        const updatedComments = await addArticleComment(slug, comment);
        setComments(updatedComments);
        setComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setSubmittingComment(false);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (slug) {
      try {
        const updatedComments = await deleteArticleComment(slug, commentId);
        setComments(updatedComments);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('লিংক কপি হয়েছে!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <article className="space-y-8">
          {/* Article Header */}
          <div className="flex items-center space-x-4 text-xs uppercase tracking-widest">
            <span className="text-lg">{articleData.author}</span>
            <span className="text-muted-foreground text-lg">{articleData.date}</span>
          </div>

          {/* Article Title */}
          <h1 className="magazine-title font-serif font-bold whitespace-pre-line" style={{ lineHeight: '1.3' }}>
            {articleData.title}
          </h1>

          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => setShowImageModal(true)}>
            <img 
              src={articleData.image} 
              alt="Featured article"
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>

          {/* Image Modal */}
          {showImageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setShowImageModal(false)}>
              <img 
                src={articleData.image} 
                alt="Featured article full view"
                className="max-w-full max-h-full rounded-lg shadow-lg"
                style={{ cursor: 'zoom-out' }}
              />
              <button
                className="absolute top-8 right-8 text-white text-3xl font-bold bg-black bg-opacity-40 rounded-full px-4 py-2"
                onClick={(e) => { e.stopPropagation(); setShowImageModal(false); }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose max-w-none text-lg"
            dangerouslySetInnerHTML={{ __html: articleData.fullContent }}
          />

          {/* Like/Save Buttons */}
          <div className="flex items-center space-x-6 pt-8">
            <button onClick={handleLike} className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'} hover:opacity-80 transition-opacity`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>লাইক ({likeCount})</span>
            </button>

            <button onClick={handleShare} className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>শেয়ার</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-12">
            <h3 className="text-xl font-semibold mb-6">মন্তব্য ({comments.length})</h3>
            
            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="আপনার মন্তব্য লিখুন..."
                rows={4}
              />
              <button
                type="submit"
                disabled={submittingComment}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingComment ? 'পোস্ট করা হচ্ছে...' : 'পোস্ট করুন'}
              </button>
            </form>

            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">কোন মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
              ) : (
                comments.map((comment) => {
                  const canDelete = comment.userId && isCommentOwner(comment);
                  return (
                    <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                      <p className="text-gray-800 whitespace-pre-wrap pr-12">{comment.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-red-600 hover:text-red-800 hover:underline transition-colors"
                            title="মন্তব্য মুছুন"
                          >
                            মুছুন
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ArticlePage;