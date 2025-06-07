
const Newsletter = () => {
  return (
    <section className="bg-foreground text-background py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest opacity-80">
                NEWSLETTER
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold">
                STAY IN THE LOOP
              </h2>
            </div>
            <p className="text-lg opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
              Get the latest design insights, creative techniques, and industry trends 
              delivered directly to your inbox every week.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-foreground bg-background border text-sm"
              />
              <button className="text-black border border-black px-6 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors duration-300">
                SUBSCRIBE
              </button>
            </div>
            <p className="text-xs opacity-70 mt-4 tracking-wide">
              Unsubscribe at any time. Privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
