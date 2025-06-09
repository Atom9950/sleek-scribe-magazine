import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main content
      gsap.from(mainRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate sidebar
      gsap.from(sidebarRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });

      // Animate trending articles on scroll
      gsap.utils.toArray(".trending-article").forEach((article, i) => {
        gsap.from(article, {
          scrollTrigger: {
            trigger: article,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1
        });
      });
    });

    return () => ctx.revert();
  }, []);

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

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Featured Article */}
        <motion.div 
          ref={mainRef}
          className="lg:col-span-8"
        >
          <article className="group cursor-pointer">
            <div className="space-y-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4 text-xs uppercase tracking-widest"
              >
                <span className="font-medium">DESIGN</span>
                <span className="text-muted-foreground">MARCH 15, 2024</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="magazine-title font-serif font-bold group-hover:text-muted-foreground transition-colors whitespace-pre-line"
              >
                THE FUTURE{'\n'}OF{'\n'}MINIMALIST{'\n'}DESIGN
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="magazine-subtitle text-muted-foreground py-5 max-w-2xl"
              >
                Exploring how minimalism continues to shape user experience and interface design in 2024. From typography choices to color palettes, discover the principles driving modern design.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-4"
              >
                <motion.span 
                  whileHover={{ x: 10 }}
                  className="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors cursor-pointer inline-block"
                >
                  Read More →
                </motion.span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative overflow-hidden"
              >
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  animate="initial"
                  className="w-full h-[300px] lg:h-[400px] transform-gpu"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop" 
                    alt="Featured article"
                    className="w-full h-full object-cover transition-all will-change-transform"
                    style={{
                      transition: "transform 0.4s ease-out, filter 0.4s ease-out"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.filter = "brightness(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "brightness(1)";
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </article>
        </motion.div>

        {/* Sidebar Articles */}
        <motion.div 
          ref={sidebarRef}
          className="lg:col-span-4 space-y-8"
        >
          <div className="border-l border-border pl-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium tracking-widest uppercase mb-6"
            >
              TRENDING
            </motion.h2>
            
            <div className="space-y-6">
              {/* Trending articles with className for GSAP animations */}
              <motion.article 
                className="group cursor-pointer trending-article"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    CULTURE
                  </div>
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    Typography Hierarchy in Modern Web Design
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understanding the role of typography in creating visual hierarchy and improving user experience.
                  </p>
                </div>
              </motion.article>

              <motion.article 
                className="group cursor-pointer trending-article"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    OPINION
                  </div>
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    Color Psychology in Brand Identity
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    How colors influence consumer behavior and brand perception in the digital age.
                  </p>
                </div>
              </motion.article>

              <motion.article 
                className="group cursor-pointer trending-article"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    TECH
                  </div>
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    Sustainable Design Practices
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Exploring eco-friendly approaches that are reshaping the creative industry.
                  </p>
                </div>
              </motion.article>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
