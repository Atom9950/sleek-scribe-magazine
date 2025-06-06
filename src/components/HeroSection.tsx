
const HeroSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-8 fade-in-up">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="magazine-title font-serif font-bold text-black">
                MODERN<br />DESIGN<br />MAGAZINE
              </h1>
              <div className="w-16 h-0.5 bg-black mx-auto"></div>
            </div>
            <p className="magazine-subtitle text-gray-600 max-w-2xl mx-auto font-light">
              A curated collection of inspiring design, creative techniques, and innovative thinking 
              for the modern creative professional.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
              READ LATEST ISSUE
            </button>
            <button className="border border-black text-black px-8 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors">
              EXPLORE ARCHIVE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
