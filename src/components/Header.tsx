
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold tracking-tight text-black">PAPER</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
                HOME
              </a>
              <a href="#" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
                ARTICLES
              </a>
              <a href="#" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
                CULTURE
              </a>
              <a href="#" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
                OPINION
              </a>
              <a href="#" className="text-sm font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
                ABOUT
              </a>
            </nav>

            {/* Subscribe Button */}
            <div className="hidden md:flex">
              <button className="bg-black text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                SUBSCRIBE
              </button>
            </div>

            {/* Mobile hamburger menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:text-gray-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Expanding from top to bottom */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
            <a href="#" className="block text-lg font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
              HOME
            </a>
            <a href="#" className="block text-lg font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
              ARTICLES
            </a>
            <a href="#" className="block text-lg font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
              CULTURE
            </a>
            <a href="#" className="block text-lg font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
              OPINION
            </a>
            <a href="#" className="block text-lg font-medium tracking-wide text-black hover:text-gray-600 transition-colors">
              ABOUT
            </a>
            <button className="w-full bg-black text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors mt-6">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer for fixed header */}
    </>
  );
};

export default Header;
