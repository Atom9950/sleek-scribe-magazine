
const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold tracking-tight">PAPER</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A modern magazine for creative professionals and design enthusiasts exploring the intersection of art, technology, and culture.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-widest uppercase">Navigate</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Articles</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Culture</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Opinion</a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-widest uppercase">Topics</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Design</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Technology</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Innovation</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Sustainability</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium tracking-widest uppercase">Connect</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground tracking-wide">
              © 2024 PAPER MAGAZINE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">PRIVACY</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">TERMS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
