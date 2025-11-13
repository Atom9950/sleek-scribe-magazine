import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section background on scroll
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1
        },
        backgroundColor: "transparent",
        duration: 1
      });

      // Animate form elements on scroll
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
    <section 
      ref={sectionRef} 
      className="bg-foreground text-background py-16 lg:py-20"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs uppercase tracking-widest opacity-80"
              >
                নিউজলেটার
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl lg:text-4xl font-serif font-bold"
              >
                সংযোগে থাকুন
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg opacity-90 max-w-2xl mx-auto font-light leading-relaxed"
            >
              প্রতি সপ্তাহে আপনার ইনবক্সে পান নতুন কবিতা, ভাবনাচিত্র, আর যুগান্তকারী গল্প — কল্পনার রঙে আঁকা বাস্তবতার ছোঁয়া।
            </motion.p>
          </motion.div>

          <motion.div 
            ref={formRef}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                type="email"
                placeholder="আপনার ইমেইল ঠিকানা"
                className="flex-1 px-4 py-3 bg-transparent text-background border border-background text-sm placeholder-opacity-80"
              />
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-black border border-black px-6 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
              >
                সাবস্ক্রাইব করুন
              </motion.button>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-xs mt-4 tracking-wide"
            >
              যেকোনো সময় সদস্যতা বাতিল করুন। গোপনীয়তা নীতিমালা।
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
};

export default Newsletter;
