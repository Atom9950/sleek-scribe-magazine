
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold tracking-tight">PAPER</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                HOME
              </a>
              <a href="#" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                ARTICLES
              </a>
              <a href="#" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                CULTURE
              </a>
              <a href="#" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                OPINION
              </a>
              <a href="#" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                ABOUT
              </a>
            </nav>

            {/* Subscribe Button */}
            <div className="hidden md:flex">
              <button className="bg-foreground text-background px-6 py-2 text-sm font-medium tracking-wide hover:bg-muted-foreground transition-colors">
                SUBSCRIBE
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-muted-foreground"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Expanding from top */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-accordion-down">
            <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-muted-foreground transition-colors">
                HOME
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-muted-foreground transition-colors">
                ARTICLES
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-muted-foreground transition-colors">
                CULTURE
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-muted-foreground transition-colors">
                OPINION
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-muted-foreground transition-colors">
                ABOUT
              </a>
              <button className="w-full bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-muted-foreground transition-colors mt-6">
                SUBSCRIBE
              </button>
            </div>
          </div>
        )}
      </header>
      <div className="h-16"></div> {/* Spacer for fixed header */}
    </>
  );
};

export default Header;
