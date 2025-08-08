import { useState } from 'react';
import Header from '../components/Header';

const SustainableDesignPage = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const articleData = {
    title: "Sustainable Design Philosophy",
    date: "MARCH 03, 2024",
    author: "Sustainability Team",
    category: "CULTURE",
    excerpt: "Exploring eco-conscious design principles and their impact on both environmental sustainability and creative innovation.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
    fullContent: `
      <p>Sustainable design is more than a trend—it's a fundamental shift in how we approach creativity and problem-solving. It challenges designers to consider the long-term impact of their decisions.</p>
      <p>The principles of sustainable design extend beyond material choices to include digital sustainability, energy-efficient processes, and designs that promote longevity over disposability.</p>
      <p>Eco-conscious design often leads to more innovative solutions. Constraints breed creativity, and the challenge of working within environmental limits often results in breakthrough ideas.</p>
      <p>The future of design must balance aesthetic appeal with environmental responsibility. This balance is not a limitation but an opportunity to create more meaningful and impactful work.</p>
      <p>Circular design principles are revolutionizing how we think about product lifecycles. Instead of linear "take-make-dispose" models, designers are creating systems where waste becomes input for new products.</p>
      <p>Biomimicry is inspiring sustainable design solutions by learning from nature's 3.8 billion years of research and development. From self-cleaning surfaces inspired by lotus leaves to energy-efficient buildings modeled after termite mounds.</p>
      <p>The concept of "design for disassembly" is gaining traction, where products are created with their end-of-life in mind, making recycling and material recovery more efficient.</p>
      <p>Digital sustainability is becoming increasingly important as our digital footprint grows. Optimizing websites, reducing data transfer, and choosing green hosting providers are all part of sustainable design practice.</p>
      <p>Consumer awareness of environmental issues is driving demand for sustainable design. Brands that embrace these principles are not only doing good but also gaining competitive advantages in the marketplace.</p>
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

export default SustainableDesignPage;