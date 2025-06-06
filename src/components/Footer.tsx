
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-black">PAPER</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A modern magazine for creative professionals and design enthusiasts.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium uppercase tracking-wide text-black">Navigation</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Home</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Articles</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Culture</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Opinion</a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium uppercase tracking-wide text-black">Categories</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Design</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Technology</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Architecture</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Photography</a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium uppercase tracking-wide text-black">Follow Us</h4>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Instagram</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Twitter</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">LinkedIn</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black transition-colors">Behance</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2024 Paper Magazine. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
