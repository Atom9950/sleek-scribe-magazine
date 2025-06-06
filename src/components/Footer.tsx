
const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                <span className="text-background font-bold text-lg">B</span>
              </div>
              <span className="ml-3 text-xl font-bold text-foreground">Blog</span>
            </div>
            <p className="text-muted-foreground">
              A modern magazine for creative professionals and design enthusiasts.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Navigation</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Home</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Articles</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Categories</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">About</a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Categories</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Design Trends</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Web Design</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Branding</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Technology</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Twitter</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Instagram</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">LinkedIn</a>
              <a href="#" className="block text-muted-foreground hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2024 Blog. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
