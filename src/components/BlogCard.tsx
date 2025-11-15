import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
  slug?: string;
}

const BlogCard = ({ title, excerpt, category, date, image, featured = false, slug }: BlogCardProps) => {
  const imageWrapperVariants = {
    initial: { 
      y: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)"
    },
    hover: { 
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        y: {
          type: "spring",
          stiffness: 150,
          damping: 15
        },
        boxShadow: {
          duration: 0.3
        }
      }
    }
  };

  const imageVariants = {
    initial: { 
      scale: 1,
      filter: "brightness(1) saturate(1)"
    },
    hover: { 
      scale: 1.07,
      filter: "brightness(1.1) saturate(1.1)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 25
        },
        filter: {
          duration: 0.4,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }
    }
  };

  const overlayVariants = {
    initial: { 
      opacity: 0,
      background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)"
    },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const readMoreVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: { x: 10, transition: { duration: 0.2 } }
  };

  if (featured) {
    return (
      <article className="group cursor-pointer col-span-2">
        <div className="space-y-6">
          <Link to={slug ? `/${slug}` : '#'}>
            <motion.div 
              initial="initial"
              whileHover="hover"
              animate="initial"
              variants={imageWrapperVariants}
              className="relative overflow-hidden"
            >
              <motion.div
                variants={overlayVariants}
                className="absolute inset-0 z-10"
              />
              <motion.div
                variants={imageVariants}
                className="w-full h-[250px] lg:h-[300px] transform-gpu"
              >
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </Link>
          
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-4 text-xs uppercase tracking-widest"
            >
              <span className="font-medium">{category}</span>
              <span className="text-muted-foreground">{date}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl lg:text-xl font-serif  group-hover:text-muted-foreground transition-colors leading-tight"
            >
              {title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground leading-relaxed"
            >
              {excerpt}
            </motion.p>
            
            <Link to={slug ? `/${slug}` : '#'}>
              <motion.span 
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                variants={readMoreVariants}
                className="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                আরও পড়ুন
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group cursor-pointer">
      <div className="space-y-4">
        <Link to={slug ? `/${slug}` : '#'}>
          <motion.div 
            initial="initial"
            whileHover="hover"
            animate="initial"
            variants={imageWrapperVariants}
            className="relative overflow-hidden"
          >
            <motion.div
              variants={overlayVariants}
              className="absolute inset-0 z-10"
            />
            <motion.div
              variants={imageVariants}
              className="w-full h-[200px] transform-gpu"
            >
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </Link>
        
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4 text-xs uppercase tracking-widest"
          >
            <span className="font-medium">{category}</span>
            <span className="text-muted-foreground">{date}</span>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight line-clamp-2"
          >
            {title}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground leading-relaxed line-clamp-3"
          >
            {excerpt}
          </motion.p>

          <Link to={slug ? `/${slug}` : '#'}>
            <motion.span 
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={readMoreVariants}
              className="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors cursor-pointer inline-flex items-center gap-2 mt-3"
            >
              আরও পড়ুন
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
