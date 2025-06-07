import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] newspaper-bg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">PAPER</h1>
            </div>

            {/* Menu Button (Hamburger/Close) */}
            <div className="flex">
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
            </div>
          </div>
        </div>

        {/* Fullscreen Menu */}
        <div 
          className={`fixed inset-0 z-[70] newspaper-menu transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ top: '0', height: '100vh' }}
        >
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto px-6 py-16">
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Column - Main Navigation */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <nav className="space-y-6">
                    <div>
                      <span className="text-xs text-gray-500">(01)</span>
                      <a 
                        href="#" 
                        className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                        onClick={toggleMenu}
                      >
                        HOME
                      </a>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-500">(02)</span>
                      <a 
                        href="#" 
                        className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                        onClick={toggleMenu}
                      >
                        CONTENT
                      </a>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-500">(03)</span>
                      <a 
                        href="#" 
                        className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                        onClick={toggleMenu}
                      >
                        ABOUT
                      </a>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-500">(04)</span>
                      <a 
                        href="#" 
                        className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                        onClick={toggleMenu}
                      >
                        POSTS
                      </a>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-500">(05)</span>
                      <a 
                        href="#" 
                        className="block text-4xl md:text-6xl font-bold font-serif text-white mt-1"
                        onClick={toggleMenu}
                      >
                        NEWSLETTER
                      </a>
                    </div>
                  </nav>
                </div>

                {/* Right Column - Secondary Links */}
                <div className="w-full md:w-1/2 md:pl-8 md:border-l md:border-gray-700">
                  <nav className="space-y-6">
                    <a href="#" className="magazine-subtitle block text-white max-w-2xl">
                      Contribute
                    </a>
                    <a href="#" className="magazine-subtitle block text-white max-w-2xl">
                      Incubate
                    </a>
                    <a href="#" className="magazine-subtitle block text-white max-w-2xl">
                      Recruit
                    </a>
                    <a href="#" className="magazine-subtitle block text-white max-w-2xl">
                      Reach Us
                    </a>
                    
                    <div className="pt-8 space-y-2">
                      <p className="magazine-subtle text-sm md:text-base text-gray-400">sd-atom.vercel.app</p>
                      <p className="magazine-subtle text-sm md:text-base text-gray-400">+91 99000 55000</p>
                      <p className="magazine-subtle text-sm md:text-base text-gray-400">sdroy001@gmail.com</p>
                    </div>
                    
                    <div className="pt-8 flex space-x-6">
                      <a href="#" className="magazine-subtle text-sm md:text-base font-medium text-white">
                        Instagram
                      </a>
                      <a href="#" className="magazine-subtle text-sm md:text-base font-medium text-white">
                        LinkedIn
                      </a>
                      <a href="#" className="magazine-subtle text-sm md:text-base font-medium text-white">
                        Youtube
                      </a>
                    </div>
                    
                    <p className="magazine-subtle pt-8 text-xs md:text-sm text-gray-500">
                      © 2024 PAPER MAGAZINE
                    </p>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;