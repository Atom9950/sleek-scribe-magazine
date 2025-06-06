
const Newsletter = () => {
  return (
    <section className="w-full bg-foreground text-background py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              STAY INSPIRED
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Get the latest design insights, creative techniques, and industry trends 
              delivered directly to your inbox every week.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-foreground bg-background rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 text-white px-8 py-3 font-medium hover:bg-orange-600 transition-colors rounded-sm">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-70 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
