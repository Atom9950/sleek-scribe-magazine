import { useState, useEffect } from 'react';
import Header from '../components/Header';
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
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

const EmergingTechnologiesPage = () => {
  const slug = 'বাংলার প্রতি বাঙালির উদাসীনতা'; // Article slug
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [modalImage, setModalImage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  const articleData = {
    title: "বাংলার প্রতি বাঙালির উদাসীনতা",
    date: "MARCH 08, 2024",
    author: "প্রীতি",
    category: "গল্প",
    excerpt: "মেট্রোতে শিশুদের আচরণ, তাদের বাংলাবিমুখতা ও অভিভাবকদের অবহেলা দেখে লেখিকা ভাষা-সমস্যা ও মাতৃভাষার প্রতি উদাসীনতা উপলব্ধি করেন।",
    image: "/fourth.jpg",
    image2: "/fourth(2).jpg",
    image3: "/fourth(3).jpg",
    fullContent: `
      <p>স্কুল থেকে ফিরতে গিয়ে লেখিকা মেট্রোয় দুটি মোটা শিশু দেখে মায়ের সঙ্গে তাদের আচরণ লক্ষ্য করেন।</p>

<p>বাচ্চাদের জন্য তিনি ও তার মা সিট ছেড়ে দিলে তাদের কৃতজ্ঞতাহীন আচরণে বিস্মিত হন।</p>

<p>পরে ট্রেনে অভিভাবকদের আড্ডায় জানা যায়—তাদের সন্তানের বাংলার নম্বর কমেছে কারণ সে বাংলা পড়তে চায় না, ইংরেজিতেই স্বাচ্ছন্দ্য।</p>

<p>শিশুরা নিজেদের মাতৃভাষাকে অবহেলা করছে, অথচ অভিভাবকরাও তা গুরুত্ব দিচ্ছেন না।</p>

<p>ইংরেজি বলতে পারলেই যেন গর্ব, কিন্তু বাংলা বললে লজ্জা।</p>

<p>শেষে লেখিকা উপলব্ধি করেন—বাংলা ভাষা নিয়ে এ উদাসীনতাই আজকের সমাজের বড় সমস্যা।</p>

<p>বাংলা ভাষা নিয়ে এ উদাসীনতাই আজকের সমাজের বড় সমস্যা, অথচ আমরা ভাষাদিবস উদযাপনের কথা বলি।</p>
    `
  };

  // Load likes and comments from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
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
      console.error('Error toggling like:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && !submittingComment) {
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
    try {
      const updatedComments = await deleteArticleComment(slug, commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
       toast({
        title: "সফল",
        description: "লিংক কপি হয়েছে!",
        variant: "destructive",
        className: "bg-black text-white border-border"
      });
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

          {/* Hero Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => { setModalImage(articleData.image); setShowImageModal(true); }}>
              <img 
                src={articleData.image} 
                alt="Featured article"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => { setModalImage(articleData.image2); setShowImageModal(true); }}>
              <img 
                src={articleData.image2} 
                alt="Second featured image"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => { setModalImage(articleData.image3); setShowImageModal(true); }}>
              <img 
                src={articleData.image3} 
                alt="Third featured image"
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          </div>

         {/* Image Modal */}
          {showImageModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-auto" onClick={() => setShowImageModal(false)}>
              <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
                <button
                  className="absolute top-12 right-4 md:top-8 md:right-8 text-white text-2xl font-bold rounded-full w-14 h-14 flex items-center justify-center z-50 shadow-2xl border-2 border-white"
                  onClick={(e) => { e.stopPropagation(); setShowImageModal(false); }}
                  aria-label="Close"
                >
                  ×
                </button>
                <img 
                  src={modalImage}
                  alt="Featured article full view"
                  className="max-w-full max-h-screen object-contain rounded-lg shadow-lg"
                  style={{ cursor: 'zoom-out' }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
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
                className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                          {new Date(comment.timestamp).toLocaleString('en-US', {
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
                            title="Delete comment"
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
      <Footer />
    </div>
  );
};

export default EmergingTechnologiesPage;