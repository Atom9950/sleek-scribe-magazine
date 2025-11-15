import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in footer on scroll
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-background border-t border-border py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-serif font-bold tracking-tight"
            >
              পাতা
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              বিপ্লবী কবিতা ও গল্পের এক অনন্য ঠিকানা, যেখানে ভাবনা জাগে, জাগে অনুভব, গড়ে প্রতিবাদ, ও শুরু হয় পরিবর্তন।
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium tracking-widest uppercase">নেভিগেট করুন</h4>
            <div className="space-y-3">
              {["হোম", "বিষয়বস্তু", "সম্পর্কে", "পোস্ট", "নিউজলেটার"].map((item, i) => (
                <motion.a
                  key={item}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium tracking-widest uppercase">বিষয়</h4>
            <div className="space-y-3">
              {["প্রহসন", "গল্প", "কবিতা",].map((item, i) => (
                <motion.a
                  key={item}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-medium tracking-widest uppercase">সংযোগ করুন</h4>
            <div className="space-y-3">
              {[
                { name: "Twitter", url: "https://x.com/SdeepR0" },
                { name: "Instagram", url: "https://www.instagram.com/panja.preeti?igsh=cHVkaXBoc3p0MXZy" },
                { name: "Facebook", url: "https://www.facebook.com/share/1BRy3vhqKi/" }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-border pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground tracking-wide">
              © 2025 পাতা. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-6">
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                PRIVACY
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                TERMS
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
