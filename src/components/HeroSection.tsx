import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

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
        gsap.from(article as Element, {
          scrollTrigger: {
            trigger: article as Element,
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
                <span className="text-lg">কবিতা</span>
                <span className="text-muted-foreground text-lg">AUGUST 16, 2024</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="magazine-title font-serif font-bold group-hover:text-muted-foreground transition-colors whitespace-pre-line gap"
                style={{ lineHeight: '1.3' }} // Adjust this value as needed
              >
                আমরা নাকি{'\n'}আধুনিক{'\n'}মানুষ ?{'\n'}
              </motion.h1>

              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="magazine-subtitle text-muted-foreground py-5 max-w-2xl"
              >
               ধর্ম-জাতির মোহে আমরা আধুনিক হলেও মানবতা হারিয়েছি। দেশপ্রেমের মুখোশ পরে চলছে পিশাচের রাজ। নিরাপত্তাহীন সমাজে ভালো মানুষরা হারিয়ে যাচ্ছে, অসুরেরা দাপট দেখাচ্ছে।
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-4"
              >
                <Link to="/article/amra-naki-adhunik-manush">
                <motion.span 
                  whileHover={{ x: 10 }}
                  className="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors cursor-pointer inline-block"
                >
                  আরও পড়ুন →
                </motion.span>
              </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative overflow-hidden"
              >
                <Link to="/article/amra-naki-adhunik-manush">
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    animate="initial"
                    className="w-full h-[300px] lg:h-[400px] transform-gpu"
                  >
                    <img 
                      src="hero.jpg" 
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
                </Link>
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
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-medium tracking-widest uppercase mb-6"
            >
              ট্রেন্ডিং
            </motion.h1>
            
            <div className="space-y-6">
              {/* Trending articles with className for GSAP animations */}
              <Link to="/article/amra-naki-adhunik-manush">
                <motion.article 
                className="group cursor-pointer trending-article"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    আমরা নাকি আধুনিক মানুষ?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                   ধর্ম-জাতির মোহে মানবতা হারিয়ে যাচ্ছে, ভালো মানুষরা হারিয়ে অসুরেরা সমাজে দাপট দেখাচ্ছে।
                  </p>
                </div>
              </motion.article>
              </Link>

              <Link to="/brishti">
                <motion.article 
                  className="group cursor-pointer trending-article"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-3 py-5">
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                  বৃষ্টি
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                  কবিতাটি বৃষ্টির শহরের নানা অনুভূতি তুলে ধরে—কেউ পায় রোমান্স, কেউ আশ্রয়, আবার কেউ বাঁচে বা নাচে জীবনের বাস্তবতায়.
                  </p>
                </div>
              </motion.article>
              </Link>

              <Link to="/amar-rajya">
                <motion.article 
                  className="group cursor-pointer trending-article"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    আমার রাজ্য
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                    লেখাটি রাজ্যের বর্তমান অবস্থা ও অতীত গৌরবের তুলনা করে প্রশ্ন তোলে—এটাই কি সত্যিই সেই গর্বের রাজ্য?
                    </p>
                  </div>
                </motion.article>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
