import { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  getArticleLikes,
  toggleArticleLike,
  hasUserLiked,
  getArticleComments,
  addArticleComment,
  deleteArticleComment,
  isCommentOwner,
  type Comment,
} from "../lib/supabaseInteractions";

const VisualStorytellingPage = () => {
  const slug = "psychology-visual-storytelling";
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  const articleData = {
    title: "The Psychology of Visual Storytelling",
    date: "MARCH 05, 2024",
    author: "Content Team",
    category: "OPINION",
    excerpt:
      "How visual narratives influence human behavior and decision-making in the digital age of content consumption.",
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop",
    fullContent: `
      <p>Visual storytelling taps into fundamental aspects of human psychology. Our brains are wired to process visual information faster than text, making images a powerful tool for communication.</p>
      <p>The emotional impact of visual narratives can drive decision-making in ways that pure logic cannot. Colors, composition, and visual metaphors all play crucial roles in how messages are received and interpreted.</p>
      <p>In the digital age, attention spans are shorter, making the ability to convey complex ideas through visual means more valuable than ever. A single image can communicate what might take paragraphs to explain.</p>
      <p>Understanding the psychology behind visual perception allows creators to craft more effective and engaging content that resonates with their audience on a deeper level.</p>
      <p>The rise of social media has transformed visual storytelling from a nice-to-have skill to an essential competency. Platforms like Instagram, TikTok, and Pinterest have made visual content the primary language of digital communication.</p>
      <p>Neuroscience research shows that visual information is processed 60,000 times faster than text by the human brain, explaining why visual storytelling is so effective at capturing and maintaining attention.</p>
      <p>Cultural context plays a significant role in visual interpretation. What resonates in one culture may have completely different meanings in another, making cultural sensitivity crucial for global visual communication.</p>
      <p>The future of visual storytelling lies in interactive and immersive experiences that engage multiple senses and create memorable, emotional connections with audiences.</p>
    `,
  };

  // Load likes and comments from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [likes, userLiked, articleComments] = await Promise.all([
          getArticleLikes(slug),
          hasUserLiked(slug),
          getArticleComments(slug),
        ]);

        setLikeCount(likes);
        setLiked(userLiked);
        setComments(articleComments);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const handleLike = async () => {
    try {
      const newLikeCount = await toggleArticleLike(slug);
      const userHasLiked = await hasUserLiked(slug);
      setLikeCount(newLikeCount);
      setLiked(userHasLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && !submittingComment) {
      try {
        setSubmittingComment(true);
        const updatedComments = await addArticleComment(slug, comment);
        setComments(updatedComments);
        setComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      } finally {
        setSubmittingComment(false);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const updatedComments = await deleteArticleComment(slug, commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
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
            <span className="text-muted-foreground text-lg">
              {articleData.date}
            </span>
          </div>

          {/* Article Title */}
          <h1
            className="magazine-title font-serif font-bold whitespace-pre-line"
            style={{ lineHeight: "1.3" }}
          >
            {articleData.title}
          </h1>

          {/* Hero Image */}
          <div
            className="relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setShowImageModal(true)}
          >
            <img
              src={articleData.image}
              alt="Featured article"
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>

          {/* Image Modal */}
          {showImageModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
              onClick={() => setShowImageModal(false)}
            >
              <img
                src={articleData.image}
                alt="Featured article full view"
                className="max-w-full max-h-full rounded-lg shadow-lg"
                style={{ cursor: "zoom-out" }}
              />
              <button
                className="absolute top-8 right-8 text-white text-3xl font-bold bg-black bg-opacity-40 rounded-full px-4 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImageModal(false);
                }}
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
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                liked ? "text-red-500" : "text-gray-500"
              } hover:opacity-80 transition-opacity`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Like ({likeCount})</span>
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center space-x-2 ${
                saved ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span>Save</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-12">
            <h3 className="text-xl font-semibold mb-6">
              Comments ({comments.length})
            </h3>

            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment..."
                rows={4}
              />
              <button
                type="submit"
                disabled={submittingComment}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>

            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => {
                  const canDelete = comment.userId && isCommentOwner(comment);
                  return (
                    <div
                      key={comment.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group"
                    >
                      <p className="text-gray-800 whitespace-pre-wrap pr-12">
                        {comment.text}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-xs text-red-600 hover:text-red-800 hover:underline transition-colors"
                            title="Delete comment"
                          >
                            Delete
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

export default VisualStorytellingPage;
