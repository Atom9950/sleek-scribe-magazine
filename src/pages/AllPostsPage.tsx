// src/pages/AllPostsPage.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Header from "@/components/Header";
import Newsletter from "@/components/Newsletter";

const AllPostsPage = () => {
  // Combine all posts manually
  const allPosts = [
    // Hero Section Posts
    {
      title: "আমরা নাকি আধুনিক মানুষ?",
      excerpt: "ধর্ম-জাতির মোহে আমরা আধুনিক হলেও মানবতা হারিয়েছি। দেশপ্রেমের মুখোশ পরে চলছে পিশাচের রাজ। নিরাপত্তাহীন সমাজে ভালো মানুষরা হারিয়ে যাচ্ছে, অসুরেরা দাপট দেখাচ্ছে।",
      category: "কবিতা",
      date: "AUGUST 16, 2024",
      image: "/hero.jpg",
      slug: "amra-naki-adhunik-manush",
    },
    {
      title: "বৃষ্টি",
      excerpt: "কবিতাটি বৃষ্টির শহরের নানা অনুভূতি তুলে ধরে—কেউ পায় রোমান্স, কেউ আশ্রয়, আবার কেউ বাঁচে বা নাচে জীবনের বাস্তবতায়",
      category: "কবিতা", 
      date: "MARCH 12, 2024",
      image: "/second.jpg",
      slug: "brishti",
    },
    {
      title: "আমার রাজ্য",
      excerpt: "লেখাটি রাজ্যের বর্তমান অবস্থা ও অতীত গৌরবের তুলনা করে প্রশ্ন তোলে—এটাই কি সত্যিই সেই গর্বের রাজ্য?",
      category: "গল্প",
      date: "MARCH 10, 2025", 
      image: "/third.jpg",
      slug: "amar-rajya",
    },

    // BlogGrid Posts
    {
      title: "বাংলার প্রতি বাঙালির উদাসীনতা",
      excerpt: "মেট্রোতে শিশুদের আচরণ, তাদের বাংলাবিমুখতা ও অভিভাবকদের অবহেলা দেখে লেখিকা ভাষা-সমস্যা ও মাতৃভাষার প্রতি উদাসীনতা উপলব্ধি করেন।",
      category: "গল্প",
      date: "MARCH 08, 2024",
      image: "/fourth.jpg",
      slug: "banglar-prati-bangalir-udashinota",
    },
    {
      title: "অদৃশ্য নায়ক",
      excerpt: "বর্ষার দিনে ডেলিভারি বয়কে দেখে লেখিকার উপলব্ধি—আমাদের সুবিধার জন্যই তারা কষ্ট সহ্য করে, অথচ আমরা তাদের মানুষ হিসেবেই দেখি না।",
      category: "গল্প",
      date: "MARCH 05, 2024",
      image: "/fifth.jpg", 
      slug: "odrishya-nayak",
    },
    {
      title: "কালো নয়, কলঙ্ক",
      excerpt: "সমাজ এখনো গায়ের রঙে মেয়েদের বিচার করে; প্রতিভার চেয়ে রূপ প্রাধান্য পায়, আর ভণ্ডামির কারণে কালো মেয়েরা অবহেলা-অপমানে কষ্ট পায়।",
      category: "গল্প",
      date: "JUNE 20, 2025",
      image: "/sixth.jpg",
      slug: "kalo-noy-kalanka",
    }
  ];

  // Group posts by category
  const postsByCategory = allPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof allPosts>);

  // Sort categories by number of posts (descending)
  const sortedCategories = Object.entries(postsByCategory)
    .sort(([, postsA], [, postsB]) => postsB.length - postsA.length);

  // Calculate total posts count
  const totalPosts = allPosts.length;

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
    <div className="min-h-screen bg-background pt-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-border pb-6 mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-2xl font-bold font-serif mb-4">
                সমস্ত নিবন্ধ
              </h1>
              <p className="text-muted-foreground">
                বিভাগ অনুযায়ী সকল প্রকাশিত নিবন্ধ
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4">
            {sortedCategories.map(([category, posts]) => (
              <a
                key={category}
                href={`#${category}`}
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted-foreground hover:text-background transition-colors"
              >
                {category} ({posts.length})
              </a>
            ))}
          </div>
        </motion.div>

        {/* Posts by Category */}
        <div className="space-y-16">
          {sortedCategories.map(([category, posts], categoryIndex) => (
            <motion.section
              key={category}
              id={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 + 0.3 }}
              className="scroll-mt-20"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <div>
                  <h2 className="text-2xl lg:text-2xl font-bold font-serif mb-2">
                    {category}
                  </h2>
                  <p className="text-muted-foreground">
                    {posts.length}টি নিবন্ধ
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  বিভাগ
                </div>
              </div>

              {/* Posts Grid for this Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, postIndex) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (categoryIndex * 0.05) + (postIndex * 0.1) }}
                  >
                    <BlogCard {...post} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Total Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
        </motion.div>
      </div>
    </div>
    <Newsletter />
    </div>
  );
};

export default AllPostsPage;