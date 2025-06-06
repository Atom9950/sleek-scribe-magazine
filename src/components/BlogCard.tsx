
interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const BlogCard = ({ title, excerpt, category, readTime, image, featured = false }: BlogCardProps) => {
  if (featured) {
    return (
      <article className="group cursor-pointer">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-orange-500 font-medium uppercase tracking-wider">{category}</span>
              <span className="text-muted-foreground">{readTime}</span>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-orange-500 transition-colors">
              {title}
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              {excerpt}
            </p>
            
            <button className="text-foreground font-medium hover:text-orange-500 transition-colors">
              Read More →
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer">
      <div className="space-y-4">
        <div className="relative">
          <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-orange-500 font-medium uppercase tracking-wider">{category}</span>
            <span className="text-muted-foreground">{readTime}</span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          
          <button className="text-foreground font-medium hover:text-orange-500 transition-colors">
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
