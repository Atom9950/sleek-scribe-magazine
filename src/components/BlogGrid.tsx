import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlogGrid = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid items on scroll
      const cards = gsap.utils.toArray<HTMLElement>('.blog-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
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

  const featuredPost = {
    title: "বৃষ্টি",
    excerpt: "কবিতাটি বৃষ্টির শহরের নানা অনুভূতি তুলে ধরে—কেউ পায় রোমান্স, কেউ আশ্রয়, আবার কেউ বাঁচে বা নাচে জীবনের বাস্তবতায়",
    category: "কবিতা",
    date: "MARCH 12, 2024",
    image: "/second.jpg",
    slug: "বৃষ্টি"
  };

  const posts = [
    {
      title: "আমার রাজ্য",
      excerpt: "লেখাটি রাজ্যের বর্তমান অবস্থা ও অতীত গৌরবের তুলনা করে প্রশ্ন তোলে—এটাই কি সত্যিই সেই গর্বের রাজ্য?",
      category: "গল্প",
      date: "MARCH 10, 2025",
      image: "/third.jpg",
      slug: "আমার রাজ্য"
    },
    {
      title: "বাংলার প্রতি বাঙালির উদাসীনতা",
      excerpt: "মেট্রোতে শিশুদের আচরণ, তাদের বাংলাবিমুখতা ও অভিভাবকদের অবহেলা দেখে লেখিকা ভাষা-সমস্যা ও মাতৃভাষার প্রতি উদাসীনতা উপলব্ধি করেন।",
      category: "গল্প",
      date: "MARCH 08, 2024",
      image: "/fourth.jpg",
      slug: "বাংলার প্রতি বাঙালির উদাসীনতা"
    },
    {
      title: "অদৃশ্য নায়ক",
      excerpt: "বর্ষার দিনে ডেলিভারি বয়কে দেখে লেখিকার উপলব্ধি—আমাদের সুবিধার জন্যই তারা কষ্ট সহ্য করে, অথচ আমরা তাদের মানুষ হিসেবেই দেখি না।",
      category: "গল্প",
      date: "MARCH 05, 2024",
      image: "/fifth.jpg",
      slug: "অদৃশ্য নায়ক"
    },
    {
      title: "কালো নয়, কলঙ্ক",
      excerpt: "সমাজ এখনো গায়ের রঙে মেয়েদের বিচার করে; প্রতিভার চেয়ে রূপ প্রাধান্য পায়, আর ভণ্ডামির কারণে কালো মেয়েরা অবহেলা-অপমানে কষ্ট পায়।",
      category: "গল্প",
      date: "JUNE 20, 2025",
      image: "/sixth.jpg",
      slug: "কালো নয়, কলঙ্ক"
    }
  ];

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="space-y-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-6"
        >
          <h2 className="text-sm font-medium tracking-widest uppercase">সর্বশেষ নিবন্ধ</h2>
        </motion.div>

        {/* Featured + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="blog-card">
            <BlogCard {...featuredPost} featured={true} />
          </div>
          
          <div className="space-y-8">
            {posts.slice(0, 2).map((post, index) => (
              <div key={index} className="blog-card">
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-border">
          {posts.slice(2).map((post, index) => (
            <div key={index + 2} className="blog-card">
              <BlogCard {...post} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center pt-8 border-t border-border"
        >
          {/* <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-foreground text-background px-8 py-3 text-sm font-medium tracking-wide hover:bg-muted-foreground transition-colors"
          >
            VIEW ALL ARTICLES
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogGrid;
