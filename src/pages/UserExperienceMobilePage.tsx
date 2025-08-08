import { useState } from 'react';
import Header from '../components/Header';

const UserExperienceMobilePage = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const articleData = {
    title: "User Experience in Mobile Applications",
    date: "MARCH 10, 2024",
    author: "UX Team",
    category: "DESIGN",
    excerpt: "Best practices for creating intuitive and engaging mobile user experiences that convert and retain users in today's competitive landscape.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    fullContent: `
      <p>Mobile user experience design has evolved far beyond simple responsive layouts. Today's users expect seamless, intuitive interactions that feel natural and effortless.</p>
      <p>The key to successful mobile UX lies in understanding user behavior patterns and designing for thumb-friendly navigation. Every tap, swipe, and gesture should feel purposeful and responsive.</p>
      <p>Performance is a crucial aspect of mobile UX. Users abandon apps that take more than 3 seconds to load, making optimization not just a technical concern but a user experience imperative.</p>
      <p>Personalization and contextual awareness are becoming increasingly important. Apps that adapt to user preferences and location create more engaging and valuable experiences.</p>
      <p>Mobile-first design thinking has shifted from being a trend to a necessity. With over 60% of web traffic coming from mobile devices, designing for mobile first ensures better experiences across all platforms.</p>
      <p>Accessibility in mobile design is not optional. Creating inclusive experiences that work for users with disabilities not only expands your audience but often results in better design for everyone.</p>
      <p>The future of mobile UX lies in anticipatory design - interfaces that predict user needs and provide solutions before users even realize they need them.</p>
    `
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
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
            <button onClick={() => setLiked(!liked)} className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Like</span>
            </button>

            <button onClick={() => setSaved(!saved)} className={`flex items-center space-x-2 ${saved ? 'text-blue-500' : 'text-gray-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Save</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-12">
            <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
            
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
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p>{comment}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default UserExperienceMobilePage;