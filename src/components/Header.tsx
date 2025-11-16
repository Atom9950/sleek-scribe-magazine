import { Menu, X, Search, X as CloseIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import gsap from "gsap";
import { articles, getAllArticles } from "@/data/articles";
import { Input } from "@/components/ui/input";

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    articles: typeof articles;
    categories: string[];
  }>({ articles: [], categories: [] });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuOpen) {
      // Animate menu background
      gsap.fromTo(".newspaper-menu", 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Helper function to check if text contains Bengali characters
  const containsBengali = (text: string): boolean => {
    // Bengali Unicode range: \u0980-\u09FF
    return /[\u0980-\u09FF]/.test(text);
  };

  // Search logic - supports both English and Bengali input
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults({ articles: [], categories: [] });
      return;
    }

    const query = searchQuery.trim();
    const queryLower = query.toLowerCase();
    const allArticles = getAllArticles();
    
    // Filter to only Bengali articles (articles with Bengali titles)
    const bengaliArticles = allArticles.filter(article =>
      containsBengali(article.title)
    );
    
    // Search articles by title, slug, and excerpt
    // This allows searching in both English (via slug) and Bengali (via title)
    const matchedArticles = bengaliArticles.filter(article => {
      const title = article.title;
      const slug = article.slug.trim();
      const excerpt = article.excerpt;
      
      // Normalize for search - handle both case-sensitive and case-insensitive
      const titleLower = title.toLowerCase();
      const slugLower = slug.toLowerCase();
      const excerptLower = excerpt.toLowerCase();
      
      // Search in title (Bengali) - check both original and lowercase
      const matchesTitle = title.includes(query) || titleLower.includes(queryLower);
      
      // Search in slug (English/transliteration) - allows English input to find Bengali articles
      const matchesSlug = slug.includes(query) || slugLower.includes(queryLower);
      
      // Search in excerpt (Bengali) - check both original and lowercase
      const matchesExcerpt = excerpt.includes(query) || excerptLower.includes(queryLower);
      
      return matchesTitle || matchesSlug || matchesExcerpt;
    });

    // Filter to only Bengali categories
    const bengaliCategories = Array.from(new Set(bengaliArticles.map(a => a.category)))
      .filter(category => containsBengali(category));
    
    // Search categories (supports both English and Bengali input)
    const matchedCategories = bengaliCategories.filter(category => {
      const categoryLower = category.toLowerCase();
      // Check both original case and lowercase
      return category.includes(query) || categoryLower.includes(queryLower);
    });

    setSearchResults({
      articles: matchedArticles.slice(0, 5), // Limit to 5 suggestions
      categories: matchedCategories
    });
  }, [searchQuery]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults({ articles: [], categories: [] });
    }
  };

  const handleArticleClick = (slug: string) => {
    // Clean slug (remove extra spaces)
    const cleanSlug = slug.trim();
    
    // Map slugs to their actual routes (handling discrepancies)
    // Note: Some slugs have spaces or don't match the route exactly
    const slugToRoute: Record<string, string> = {
      'b': '/brishti',  // "b  " trimmed becomes "b"
      'b  ': '/brishti',  // Original with spaces
      'brishti': '/brishti',
      'amar-rajya': '/amar-rajya',
      'banglar-prati-bangalir-udashinota': '/banglar-prati-bangalir-udashinota',
      'odrishya-nayak': '/odrishya-nayak',
      'kalo-noy-kalanka': '/kalo-noy-kalanka',
      // 'amra-naki-adhunik-manush' doesn't have a direct route, use /article/:slug
    };
    
    // Check if we have a direct route mapping
    const route = slugToRoute[cleanSlug] || slugToRoute[slug]; // Check both cleaned and original
    if (route) {
      navigate(route);
    } else {
      // Use article route for other articles (like amra-naki-adhunik-manush)
      // Don't encode the slug - ArticlePage will handle it
      navigate(`/article/${cleanSlug}`);
    }
    
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults({ articles: [], categories: [] });
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/posts?category=${encodeURIComponent(category)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults({ articles: [], categories: [] });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length === 0) return;

    // If there's exactly one article match, navigate to it
    if (searchResults.articles.length === 1 && searchResults.categories.length === 0) {
      handleArticleClick(searchResults.articles[0].slug);
      return;
    }

    // If there's exactly one category match, navigate to it
    if (searchResults.categories.length === 1 && searchResults.articles.length === 0) {
      handleCategoryClick(searchResults.categories[0]);
      return;
    }

    // Otherwise, navigate to posts page with search query
    navigate(`/posts?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults({ articles: [], categories: [] });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const handleShare = async () => {
    const url = "https://blog-page-jade-three.vercel.app/";
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "লিঙ্ক কপি হয়েছে!",
        description: "ওয়েবসাইট লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে।",
      });
      toggleMenu();
    } catch (err) {
      toast({
        title: "ত্রুটি",
        description: "লিঙ্ক কপি করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[60] newspaper-bg border-b border-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">পাতা</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="34" height="34" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v40c0 2 2 4 4 4h20c2 0 4 2 4 4V20c0-2-2-4-4-4H8c-2 0-4-2-4-4z" />
                  <path d="M60 12v40c0 2-2 4-4 4H36c-2 0-4 2-4 4V20c0-2 2-4 4-4h20c2 0 4-2 4-4z" />
                  <path d="M32 20v32" />
                </svg>
              </Link>
            </motion.div>

            {/* Search and Menu Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              {/* Search Button */}
              <button
                onClick={handleSearchToggle}
                className={`focus:outline-none p-2 transition-colors duration-300 ${
                  isSearchOpen ? 'text-white' : 'text-black'
                }`}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                {isSearchOpen ? (
                  <CloseIcon size={24} strokeWidth={1.5} />
                ) : (
                  <Search size={24} strokeWidth={1.5} />
                )}
              </button>

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className={`focus:outline-none p-4 transition-colors duration-300 relative ${
                  isMenuOpen ? 'text-white' : 'text-black'
                }`}
                style={{ zIndex: 90 }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <X 
                  size={56} 
                  strokeWidth={1.5} 
                  className={`absolute transition-all duration-300 hover:rotate-90 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} 
                />
                <Menu 
                  size={56} 
                  strokeWidth={1.5} 
                  className={`transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} 
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[70] newspaper-menu"
              style={{ top: '0', height: '100vh' }}
            >
              <div className="h-full overflow-y-auto">
                <div className="container mx-auto px-6 py-16">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Left Column - Main Navigation */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                      <nav className="space-y-10">
                        {[
                          { label: "হোম", path: "/" },
                          { label: "পোস্ট", path:"/posts" },
                          { label: "নিউজলেটার", path: "/newsletter" }
                        ].map((item, i) => (
                          <motion.div
                            key={item.label}
                            custom={i}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <span className="text-xs text-gray-500">({String(i + 1).padStart(2, '0')})</span>
                            <Link 
                              to={item.path}
                              className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                              onClick={toggleMenu}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </nav>
                    </div>

                    {/* Right Column - Secondary Links */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="w-full md:w-1/2 md:pl-8 md:border-l md:border-gray-700"
                    >
                      <nav className="space-y-6">
                        {["শেয়ার করুণ", "অবদান করুণ", "আমাদের কাছে পৌঁছান"].map((item, i) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                          >
                            {item === "শেয়ার করুণ" ? (
                              <button
                                onClick={handleShare}
                                className="block text-lg md:text-xl font-medium text-white text-left w-full hover:opacity-80 transition-opacity"
                              >
                                {item}
                              </button>
                            ) : item === "অবদান করুণ" ? (
                              <a
                                href="https://mail.google.com/mail/?view=cm&to=sdroy001@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-lg md:text-xl font-medium text-white hover:opacity-80 transition-opacity"
                                onClick={toggleMenu}
                              >
                                {item}
                              </a>
                            ) : (
                              <Link
                                to="/Newsletter"
                                className="block text-lg md:text-xl font-medium text-white"
                                onClick={toggleMenu}
                              >
                                {item}
                              </Link>
                            )}
                          </motion.div>
                        ))}
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="pt-8 space-y-2"
                        >
                          <p className="magazine-subtle text-sm md:text-base text-gray-400">
                          <a 
                            href="https://sd-atom.vercel.app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors duration-300"
                          >
                            sd-atom.vercel.app
                          </a>
                        </p>
                        <p className="magazine-subtle text-sm md:text-base text-gray-400">+91 99000 55000</p>
                        <p className="magazine-subtle text-sm md:text-base text-gray-400">
                          <a 
                            href="mailto:sdroy001@gmail.com"
                            className="hover:text-white transition-colors duration-300"
                          >
                            sdroy001@gmail.com
                          </a>
                        </p>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                          className="pt-8 flex space-x-6"
                        >
                          <a href="https://x.com/SdeepR0" className="magazine-subtle text-sm md:text-base font-medium text-white">
                            Twitter
                          </a>
                          <a href="https://www.instagram.com/panja.preeti?igsh=cHVkaXBoc3p0MXZy" className="magazine-subtle text-sm md:text-base font-medium text-white">
                            Instagram
                          </a>
                          <a href="https://www.facebook.com/share/1BRy3vhqKi/" className="magazine-subtle text-sm md:text-base font-medium text-white">
                            Facebook
                          </a>
                        </motion.div>
                        
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="pt-8 text-xs md:text-sm text-gray-500"
                        >
                          © 2025 পাতা
                        </motion.p>
                      </nav>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 z-[80] newspaper-bg border-b border-white shadow-lg"
            >
              <div className="max-w-6xl mx-auto px-6 py-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="নিবন্ধ বা বিভাগ অনুসন্ধান করুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 text-base"
                  />
                  <Search 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                </form>

                {/* Search Results */}
                {(searchResults.articles.length > 0 || searchResults.categories.length > 0) && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 max-h-96 overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200"
                  >
                    {/* Article Suggestions */}
                    {searchResults.articles.length > 0 && (
                      <div className="p-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                          নিবন্ধ
                        </div>
                        {searchResults.articles.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => handleArticleClick(article.slug)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <div className="font-medium text-sm">{article.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{article.category}</div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Category Suggestions */}
                    {searchResults.categories.length > 0 && (
                      <div className="p-2 border-t border-gray-200">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                          বিভাগ
                        </div>
                        {searchResults.categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <div className="font-medium text-sm">{category}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {articles.filter(a => a.category === category).length}টি নিবন্ধ
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;