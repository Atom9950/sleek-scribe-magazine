import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BlogGrid from "@/components/BlogGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5
    }
  }
};

const Index = () => {
  return (
    <motion.div
      className="min-h-screen newspaper-bg"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      <HeroSection />
      <BlogGrid />
      <Newsletter />
      <Footer />
    </motion.div>
  );
};

export default Index;
