
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BlogGrid from "@/components/BlogGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <HeroSection />
      <BlogGrid />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
