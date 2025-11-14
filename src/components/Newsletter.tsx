import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { subscribeToNewsletter } from "@/lib/supabaseInteractions";
import { useToast } from "@/hooks/use-toast";
gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "ইমেইল প্রয়োজন",
        description: "অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        toast({
          title: "সফল!",
          description: result.message,
        });
        setEmail(""); // Clear the form on success
      } else {
        toast({
          title: "ত্রুটি",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "ত্রুটি",
        description: "একটি সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

          <motion.form 
            ref={formRef}
            className="max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                type="email"
                placeholder="আপনার ইমেইল ঠিকানা"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="flex-1 px-4 py-3 bg-transparent text-background border border-background text-sm placeholder-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-background/50"
              />
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                type="submit"
                disabled={isLoading}
                className="text-black border border-black px-6 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? "অপেক্ষা করুন..." : "সাবস্ক্রাইব করুন"}
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
          </motion.form>
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
};

export default Newsletter;
