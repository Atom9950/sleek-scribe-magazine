
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background font-bold text-lg">B</span>
            </div>
            <span className="ml-3 text-xl font-bold text-foreground">Blog</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-orange-500 transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-orange-500 transition-colors font-medium">
              Articles
            </a>
            <a href="#" className="text-foreground hover:text-orange-500 transition-colors font-medium">
              Categories
            </a>
            <a href="#" className="text-foreground hover:text-orange-500 transition-colors font-medium">
              About
            </a>
            <a href="#" className="text-foreground hover:text-orange-500 transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-sm font-medium hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-orange-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a href="#" className="block px-3 py-2 text-foreground hover:text-orange-500 transition-colors font-medium">
                Home
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-orange-500 transition-colors font-medium">
                Articles
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-orange-500 transition-colors font-medium">
                Categories
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-orange-500 transition-colors font-medium">
                About
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-orange-500 transition-colors font-medium">
                Contact
              </a>
              <button className="w-full mt-4 bg-orange-500 text-white px-6 py-2 rounded-sm font-medium hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
