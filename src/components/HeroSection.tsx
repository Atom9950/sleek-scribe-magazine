
const HeroSection = () => {
  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">
                FEATURED ARTICLE
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                DESIGN
                <br />
                INSPIRATION
                <br />
                <span className="text-orange-500">FOR MODERN</span>
                <br />
                CREATORS
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover the latest trends, techniques, and insights in design and creativity. 
                Join our community of passionate creators and innovators.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 text-white px-8 py-3 font-medium hover:bg-orange-600 transition-colors">
                Read Article
              </button>
              <button className="border border-foreground text-foreground px-8 py-3 font-medium hover:bg-foreground hover:text-background transition-colors">
                Explore More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-orange-200 rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop" 
                alt="Design workspace"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
