
interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
}

const BlogCard = ({ title, excerpt, category, date, image, featured = false }: BlogCardProps) => {
  if (featured) {
    return (
      <article className="group cursor-pointer col-span-2">
        <div className="space-y-6">
          <div className="relative">
            <img 
              src={image} 
              alt={title}
              className="w-full h-[250px] lg:h-[300px] object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-xs uppercase tracking-widest">
              <span className="font-medium">{category}</span>
              <span className="text-muted-foreground">{date}</span>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-serif font-bold group-hover:text-muted-foreground transition-colors leading-tight">
              {title}
            </h2>
            
            <p className="text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
            
            <span className="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors cursor-pointer">
              Read More →
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer">
      <div className="space-y-4">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-[200px] object-cover"
          />
        </div>
        
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {category}
          </div>
          
          <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          
          <div className="text-xs text-muted-foreground">
            {date}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
