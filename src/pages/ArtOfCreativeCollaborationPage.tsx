import { useState } from 'react';
import Header from '../components/Header';

const ArtOfCreativeCollaborationPage = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const articleData = {
    title: "The Art of Creative Collaboration",
    date: "MARCH 12, 2024",
    author: "Creative Team",
    category: "CULTURE",
    excerpt: "Building effective creative teams and fostering collaboration in remote and hybrid work environments. Discover the tools and techniques that drive innovation.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    fullContent: `
      <p>In today's rapidly evolving creative landscape, collaboration has become the cornerstone of innovation. The art of bringing diverse minds together to create something extraordinary requires both skill and strategy.</p>
      <p>Remote and hybrid work environments have transformed how creative teams operate. The challenge lies not just in maintaining productivity, but in fostering the spontaneous interactions that often lead to breakthrough ideas.</p>
      <p>Successful creative collaboration starts with establishing clear communication channels and shared goals. When team members understand their roles and the project vision, they can contribute more effectively to the collective effort.</p>
      <p>The tools we use matter, but the culture we build matters more. Creating an environment where ideas can flow freely, where constructive criticism is welcomed, and where every voice is heard is essential for true collaboration.</p>
      <p>Digital collaboration platforms have revolutionized how we work together, but they cannot replace the human element of creativity. The best collaborative efforts combine technological efficiency with human empathy and understanding.</p>
      <p>Building trust within creative teams is fundamental. When team members feel safe to share their ideas, take risks, and even fail, the collective creative output increases exponentially.</p>
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

export default ArtOfCreativeCollaborationPage;