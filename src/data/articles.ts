export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  fullContent: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "amra-naki-adhunik-manush",
    title: "আমরা নাকি আধুনিক মানুষ ?",
    date: "AUGUST 16, 2024",
    author: "প্রীতি",
    category: "প্রহসন",
    excerpt: "ধর্ম-জাতির মোহে আমরা আধুনিক হলেও মানবতা হারিয়েছি। দেশপ্রেমের মুখোশ পরে চলছে পিশাচের রাজ। নিরাপত্তাহীন সমাজে ভালো মানুষরা হারিয়ে যাচ্ছে, অসুরেরা দাপট দেখাচ্ছে।",
    content: "ধর্ম-জাতির মোহে আমরা আধুনিক হলেও মানবতা হারিয়েছি...",
    fullContent: `
      <p>ধর্ম-জাতির মোহে আমরা আধুনিক হলেও মানবতা হারিয়েছি। দেশপ্রেমের মুখোশ পরে চলছে পিশাচের রাজ।</p>
      <p>নিরাপত্তাহীন সমাজে ভালো মানুষরা হারিয়ে যাচ্ছে, অসুরেরা দাপট দেখাচ্ছে।</p>
      <p>আমাদের সমাজে এখন মানবতার চেয়ে ধর্মীয় পরিচয়ই বড় হয়ে উঠেছে। মানুষ হিসেবে আমাদের পরিচয় হারিয়ে গেছে।</p>
      <p>প্রকৃত আধুনিকতা মানে শুধু প্রযুক্তির ব্যবহার নয়, বরং মানবিক মূল্যবোধের বিকাশ।</p>
    `,
    image: "/hero.jpg"
  },
  {
    id: "2",
    slug: "art-of-creative-collaboration",
    title: "The Art of Creative Collaboration",
    date: "MARCH 12, 2024",
    author: "Creative Team",
    category: "CULTURE",
    excerpt: "Building effective creative teams and fostering collaboration in remote and hybrid work environments. Discover the tools and techniques that drive innovation.",
    content: "Building effective creative teams and fostering collaboration in remote and hybrid work environments...",
    fullContent: `
      <p>In today's rapidly evolving creative landscape, collaboration has become the cornerstone of innovation. The art of bringing diverse minds together to create something extraordinary requires both skill and strategy.</p>
      <p>Remote and hybrid work environments have transformed how creative teams operate. The challenge lies not just in maintaining productivity, but in fostering the spontaneous interactions that often lead to breakthrough ideas.</p>
      <p>Successful creative collaboration starts with establishing clear communication channels and shared goals. When team members understand their roles and the project vision, they can contribute more effectively to the collective effort.</p>
      <p>The tools we use matter, but the culture we build matters more. Creating an environment where ideas can flow freely, where constructive criticism is welcomed, and where every voice is heard is essential for true collaboration.</p>
    `,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
  },
  {
    id: "3",
    slug: "user-experience-mobile-applications",
    title: "User Experience in Mobile Applications",
    date: "MARCH 10, 2024",
    author: "UX Team",
    category: "DESIGN",
    excerpt: "Best practices for creating intuitive and engaging mobile user experiences that convert and retain users in today's competitive landscape.",
    content: "Best practices for creating intuitive and engaging mobile user experiences...",
    fullContent: `
      <p>Mobile user experience design has evolved far beyond simple responsive layouts. Today's users expect seamless, intuitive interactions that feel natural and effortless.</p>
      <p>The key to successful mobile UX lies in understanding user behavior patterns and designing for thumb-friendly navigation. Every tap, swipe, and gesture should feel purposeful and responsive.</p>
      <p>Performance is a crucial aspect of mobile UX. Users abandon apps that take more than 3 seconds to load, making optimization not just a technical concern but a user experience imperative.</p>
      <p>Personalization and contextual awareness are becoming increasingly important. Apps that adapt to user preferences and location create more engaging and valuable experiences.</p>
    `,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    slug: "emerging-technologies-design",
    title: "Emerging Technologies in Design",
    date: "MARCH 08, 2024",
    author: "Tech Team",
    category: "TECH",
    excerpt: "From AI-assisted design tools to AR/VR interfaces, discover the technologies shaping the future of creative work and digital innovation.",
    content: "From AI-assisted design tools to AR/VR interfaces, discover the technologies shaping the future...",
    fullContent: `
      <p>The design industry is experiencing a technological revolution. AI-powered tools are not replacing designers but augmenting their capabilities, allowing for faster iteration and more creative exploration.</p>
      <p>Augmented and Virtual Reality are opening new frontiers for immersive design experiences. These technologies are transforming how we conceptualize and interact with digital spaces.</p>
      <p>Machine learning algorithms can now analyze user behavior patterns and suggest design improvements, making data-driven design more accessible than ever before.</p>
      <p>The future of design lies in the seamless integration of human creativity with technological capabilities. Designers who embrace these tools will lead the next wave of innovation.</p>
    `,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
  },
  {
    id: "5",
    slug: "psychology-visual-storytelling",
    title: "The Psychology of Visual Storytelling",
    date: "MARCH 05, 2024",
    author: "Content Team",
    category: "OPINION",
    excerpt: "How visual narratives influence human behavior and decision-making in the digital age of content consumption.",
    content: "How visual narratives influence human behavior and decision-making...",
    fullContent: `
      <p>Visual storytelling taps into fundamental aspects of human psychology. Our brains are wired to process visual information faster than text, making images a powerful tool for communication.</p>
      <p>The emotional impact of visual narratives can drive decision-making in ways that pure logic cannot. Colors, composition, and visual metaphors all play crucial roles in how messages are received and interpreted.</p>
      <p>In the digital age, attention spans are shorter, making the ability to convey complex ideas through visual means more valuable than ever. A single image can communicate what might take paragraphs to explain.</p>
      <p>Understanding the psychology behind visual perception allows creators to craft more effective and engaging content that resonates with their audience on a deeper level.</p>
    `,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "6",
    slug: "sustainable-design-philosophy",
    title: "Sustainable Design Philosophy",
    date: "MARCH 03, 2024",
    author: "Sustainability Team",
    category: "CULTURE",
    excerpt: "Exploring eco-conscious design principles and their impact on both environmental sustainability and creative innovation.",
    content: "Exploring eco-conscious design principles and their impact on environmental sustainability...",
    fullContent: `
      <p>Sustainable design is more than a trend—it's a fundamental shift in how we approach creativity and problem-solving. It challenges designers to consider the long-term impact of their decisions.</p>
      <p>The principles of sustainable design extend beyond material choices to include digital sustainability, energy-efficient processes, and designs that promote longevity over disposability.</p>
      <p>Eco-conscious design often leads to more innovative solutions. Constraints breed creativity, and the challenge of working within environmental limits often results in breakthrough ideas.</p>
      <p>The future of design must balance aesthetic appeal with environmental responsibility. This balance is not a limitation but an opportunity to create more meaningful and impactful work.</p>
    `,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
  },
  {
    id: "7",
    slug: "color-psychology-brand-identity",
    title: "Color Psychology in Brand Identity",
    date: "FEBRUARY 28, 2024",
    author: "Brand Team",
    category: "OPINION",
    excerpt: "How colors influence consumer behavior and brand perception in the digital age.",
    content: "How colors influence consumer behavior and brand perception...",
    fullContent: `
      <p>Color is one of the most powerful tools in a designer's arsenal. It can evoke emotions, trigger memories, and influence purchasing decisions in ways that consumers often don't consciously recognize.</p>
      <p>Different cultures associate different meanings with colors, making global brand design a complex challenge that requires deep understanding of cultural nuances.</p>
      <p>The psychology of color extends beyond individual hues to include color combinations, saturation levels, and contextual usage. A color that works in one context may fail completely in another.</p>
      <p>Successful brands understand that color consistency across all touchpoints creates stronger brand recognition and emotional connection with their audience.</p>
    `,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop"
  },
  {
    id: "8",
    slug: "sustainable-design-practices",
    title: "Sustainable Design Practices",
    date: "FEBRUARY 25, 2024",
    author: "Green Team",
    category: "TECH",
    excerpt: "Exploring eco-friendly approaches that are reshaping the creative industry.",
    content: "Exploring eco-friendly approaches that are reshaping the creative industry...",
    fullContent: `
      <p>The creative industry is undergoing a green revolution. Designers are increasingly aware of their environmental impact and are seeking ways to create beautiful, functional designs while minimizing their carbon footprint.</p>
      <p>Digital sustainability is becoming as important as physical sustainability. Optimizing websites for energy efficiency, choosing green hosting providers, and designing for longevity are all part of the modern designer's toolkit.</p>
      <p>Sustainable design practices often lead to better user experiences. Faster-loading websites, cleaner interfaces, and more intuitive navigation all contribute to both environmental and user benefits.</p>
      <p>The future of design is green, and those who embrace sustainable practices now will be better positioned to meet the demands of environmentally conscious consumers and clients.</p>
    `,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
  }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getAllArticles = (): Article[] => {
  return articles;
};