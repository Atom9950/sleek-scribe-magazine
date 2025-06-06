
import BlogCard from "./BlogCard";

const BlogGrid = () => {
  const featuredPost = {
    title: "The Future of Minimalist Design in Digital Spaces",
    excerpt: "Exploring how minimalism continues to shape user experience and interface design in 2024. From typography choices to color palettes, discover the principles driving modern design.",
    category: "DESIGN TRENDS",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
  };

  const posts = [
    {
      title: "Typography Hierarchy in Modern Web Design",
      excerpt: "Understanding the role of typography in creating visual hierarchy and improving user experience across digital platforms.",
      category: "WEB DESIGN",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
    },
    {
      title: "Color Psychology in Brand Identity",
      excerpt: "How colors influence consumer behavior and brand perception. A deep dive into the psychological impact of color choices.",
      category: "BRANDING",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    {
      title: "Sustainable Design Practices",
      excerpt: "Exploring eco-friendly design approaches and how sustainability is reshaping the creative industry.",
      category: "SUSTAINABILITY",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
    },
    {
      title: "User Experience in Mobile Applications",
      excerpt: "Best practices for creating intuitive and engaging mobile user experiences that convert and retain users.",
      category: "UX DESIGN",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
    },
    {
      title: "The Art of Creative Collaboration",
      excerpt: "Building effective creative teams and fostering collaboration in remote and hybrid work environments.",
      category: "COLLABORATION",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
    },
    {
      title: "Emerging Technologies in Design",
      excerpt: "From AI-assisted design tools to AR/VR interfaces, discover the technologies shaping the future of creative work.",
      category: "TECHNOLOGY",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="w-full bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              LATEST ARTICLES
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights, trends, and inspiration for the modern creative professional
            </p>
          </div>

          {/* Featured Article */}
          <div className="border-b border-border pb-16">
            <BlogCard {...featuredPost} featured={true} />
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <button className="border border-foreground text-foreground px-8 py-3 font-medium hover:bg-foreground hover:text-background transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
