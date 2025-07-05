import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

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

  useEffect(() => {
    if (isMenuOpen) {
      // Animate menu background
      gsap.fromTo(".newspaper-menu", 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[60] newspaper-bg border-b border-gray-200"
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
              <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold">পাতা</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="34" height="34" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v40c0 2 2 4 4 4h20c2 0 4 2 4 4V20c0-2-2-4-4-4H8c-2 0-4-2-4-4z" />
                    <path d="M60 12v40c0 2-2 4-4 4H36c-2 0-4 2-4 4V20c0-2 2-4 4-4h20c2 0 4-2 4-4z" />
                    <path d="M32 20v32" />
                  </svg>
              </div>

            </motion.div>

            {/* Menu Button */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex"
            >
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
                      <nav className="space-y-6">
                        {["হোম", "বিষয়বস্তু", "সম্পর্কে", "পোস্ট", "নিউজলেটার"].map((item, i) => (
                          <motion.div
                            key={item}
                            custom={i}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <span className="text-xs text-gray-500">({String(i + 1).padStart(2, '0')})</span>
                            <a 
                              href="#" 
                              className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                              onClick={toggleMenu}
                            >
                              {item}
                            </a>
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
                        {["অবদান করুণ", "শেয়ার করুণ", "দান করুণ", "আমাদের কাছে পৌঁছান"].map((item, i) => (
                          <motion.a
                            key={item}
                            href="#"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                            className="block text-lg md:text-xl font-medium text-white"
                          >
                            {item}
                          </motion.a>
                        ))}
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="pt-8 space-y-2"
                        >
                          <p className="magazine-subtle text-sm md:text-base text-gray-400">sd-atom.vercel.app</p>
                          <p className="magazine-subtle text-sm md:text-base text-gray-400">+91 99000 55000</p>
                          <p className="magazine-subtle text-sm md:text-base text-gray-400">sdroy001@gmail.com</p>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                          className="pt-8 flex space-x-6"
                        >
                          <a href="#" className="magazine-subtle text-sm md:text-base font-medium text-white">
                            Twitter
                          </a>
                          <a href="#" className="magazine-subtle text-sm md:text-base font-medium text-white">
                            Instagram
                          </a>
                          <a href="#" className="magazine-subtle text-sm md:text-base font-medium text-white">
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
      </motion.header>
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;