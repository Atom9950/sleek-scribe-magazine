
import BlogCard from "./BlogCard";

const BlogGrid = () => {
  const featuredPost = {
    title: "The Art of Creative Collaboration",
    excerpt: "Building effective creative teams and fostering collaboration in remote and hybrid work environments. Discover the tools and techniques that drive innovation.",
    category: "CULTURE",
    date: "MARCH 12, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
  };

  const posts = [
    {
      title: "User Experience in Mobile Applications",
      excerpt: "Best practices for creating intuitive and engaging mobile user experiences that convert and retain users in today's competitive landscape.",
      category: "DESIGN",
      date: "MARCH 10, 2024",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      title: "Emerging Technologies in Design",
      excerpt: "From AI-assisted design tools to AR/VR interfaces, discover the technologies shaping the future of creative work and digital innovation.",
      category: "TECH",
      date: "MARCH 08, 2024",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    {
      title: "The Psychology of Visual Storytelling",
      excerpt: "How visual narratives influence human behavior and decision-making in the digital age of content consumption.",
      category: "OPINION",
      date: "MARCH 05, 2024",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
    },
    {
      title: "Sustainable Design Philosophy",
      excerpt: "Exploring eco-conscious design principles and their impact on both environmental sustainability and creative innovation.",
      category: "CULTURE",
      date: "MARCH 03, 2024",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="border-b border-border pb-6">
          <h2 className="text-sm font-medium tracking-widest uppercase">LATEST ARTICLES</h2>
        </div>

        {/* Featured + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <BlogCard {...featuredPost} featured={true} />
          
          <div className="space-y-8">
            {posts.slice(0, 2).map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>

        {/* Additional Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-border">
          {posts.slice(2).map((post, index) => (
            <BlogCard key={index + 2} {...post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-8 border-t border-border">
          <button className="bg-foreground text-background px-8 py-3 text-sm font-medium tracking-wide hover:bg-muted-foreground transition-colors">
            VIEW ALL ARTICLES
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
