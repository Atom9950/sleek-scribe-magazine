
const HeroSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Featured Article */}
        <div className="lg:col-span-8">
          <article className="group cursor-pointer">
          
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-xs uppercase tracking-widest">
                <span className="font-medium">DESIGN</span>
                <span className="text-muted-foreground">MARCH 15, 2024</span>
              </div>
              
              <h1 className="magazine-title font-serif font-bold group-hover:text-muted-foreground transition-colors">
                THE FUTURE OF MINIMALIST DESIGN
              </h1>
              
              <p className="magazine-subtitle text-muted-foreground max-w-2xl">
                Exploring how minimalism continues to shape user experience and interface design in 2024. From typography choices to color palettes, discover the principles driving modern design.
              </p>
              
              <div className="pt-4">
                <span className="text-sm font-medium tracking-wide uppercase hover:text-muted-foreground transition-colors cursor-pointer">
                  Read More →
                </span>
              </div>
                <div className="relative mb-6">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop" 
                alt="Featured article"
                className="w-full h-[300px] lg:h-[400px] object-cover"
              />
            </div>
            </div>
          </article>
        </div>

        {/* Sidebar Articles */}
        <div className="lg:col-span-4 space-y-8">
          <div className="border-l border-border pl-6">
            <h2 className="text-sm font-medium tracking-widest uppercase mb-6">TRENDING</h2>
            
            <div className="space-y-6">
              <article className="group cursor-pointer">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    CULTURE
                  </div>
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    Typography Hierarchy in Modern Web Design
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understanding the role of typography in creating visual hierarchy and improving user experience.
                  </p>
                </div>
              </article>

              <article className="group cursor-pointer">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    OPINION
                  </div>
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    Color Psychology in Brand Identity
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    How colors influence consumer behavior and brand perception in the digital age.
                  </p>
                </div>
              </article>

              <article className="group cursor-pointer">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    TECH
                  </div>
                  <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors leading-tight">
                    Sustainable Design Practices
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Exploring eco-friendly approaches that are reshaping the creative industry.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
