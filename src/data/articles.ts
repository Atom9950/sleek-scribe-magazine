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
    slug: "আমরা নাকি আধুনিক মানুষ",
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
    slug: "বৃষ্টি",
    title: "বৃষ্টি",
    date: "MARCH 12, 2024",
    author: "প্রীতি",
    category: "কবিতা",
    excerpt: "কবিতাটি “বৃষ্টি”কে কেন্দ্র করে, যেখানে শহরের প্রতিটি মানুষ বৃষ্টিকে ভিন্নভাবে অনুভব করে। কারো কাছে এটি প্রেমের সুর, কারো কাছে আশ্রয়ের নীরবতা।",
    content: "কবিতাটি “বৃষ্টি”কে কেন্দ্র করে, যেখানে শহরের প্রতিটি মানুষ বৃষ্টিকে ভিন্নভাবে অনুভব করে। কারো কাছে এটি প্রেমের সুর, কারো কাছে আশ্রয়ের নীরবতা।",
    fullContent: `
     <p>কবিতাটি “বৃষ্টি”কে কেন্দ্র করে, যেখানে শহরের প্রতিটি মানুষ বৃষ্টিকে ভিন্নভাবে অনুভব করে। কারো কাছে এটি প্রেমের সুর, কারো কাছে আশ্রয়ের নীরবতা।</p>
<p>কেউ রোমান্টিক গানে হারিয়ে যায়, কেউ ভালোবাসার স্মৃতিতে ডুবে থাকে। আবার কেউ জানালার পাশে দাঁড়িয়ে জীবনের রঙিন প্রবাহ দেখে।</p>
<p>বৃষ্টি কখনো আনন্দের নাচ, কখনো সংগ্রামের প্রতিচ্ছবি। প্রতিটি ফোঁটা যেন নতুন অনুভবের গল্প বলে।</p>
<p>শেষে বোঝা যায়—যে যেভাবেই দেখুক, সবাই বৃষ্টিতে ভিজে যায় অনুভবে, এক অদ্ভুত শান্তির ছোঁয়ায়।</p>

    `,
    image: "/second.jpg"
  },
  {
    id: "3",
    slug: "আমার রাজ্য",
    title: "আমার রাজ্য",
    date: "MARCH 10, 2025",
    author: "সায়নদীপ",
    category: "গল্প",
    excerpt: "Best practices for creating intuitive and engaging mobile user experiences that convert and retain users in today's competitive landscape.",
    content: "Best practices for creating intuitive and engaging mobile user experiences...",
    fullContent: `
      <p>লেখাটি রাজ্যের নৈতিক ও সামাজিক অবক্ষয়ের চিত্র তুলে ধরে, যেখানে বেকারত্ব, নারী নির্যাতন ও অবিচার বেড়েছে।</p>
<p>লেখক অতীতের গৌরব—বিদ্যাসাগর, নোবেলপ্রাপ্তি, প্রথম নারী ডাক্তার—এর উল্লেখ করে বর্তমানের সঙ্গে তুলনা করেছেন।</p>
<p>শেষে তিনি প্রশ্ন তুলেছেন, “এটাই কি সত্যিই আমার রাজ্য?”, এক গভীর হতাশা ও ব্যথার সুরে।</p>

    `,
    image: "/third.jpg"
  },
  {
    id: "4",
    slug: "বাংলার প্রতি বাঙালির উদাসীনতা",
    title: "বাংলার প্রতি বাঙালির উদাসীনতা",
    date: "MARCH 08, 2024",
    author: "প্রীতি",
    category: "গল্প",
    excerpt: "মেট্রোতে শিশুদের আচরণ, তাদের বাংলাবিমুখতা ও অভিভাবকদের অবহেলা দেখে লেখিকা ভাষা-সমস্যা ও মাতৃভাষার প্রতি উদাসীনতা উপলব্ধি করেন।",
    content: "মেট্রোতে শিশুদের আচরণ, তাদের বাংলাবিমুখতা ও অভিভাবকদের অবহেলা দেখে লেখিকা ভাষা-সমস্যা ও মাতৃভাষার প্রতি উদাসীনতা উপলব্ধি করেন।",
    fullContent: `
      <p>স্কুল থেকে ফিরতে গিয়ে লেখিকা মেট্রোয় দুটি মোটা শিশু দেখে মায়ের সঙ্গে তাদের আচরণ লক্ষ্য করেন।</p>

      <p>বাচ্চাদের জন্য তিনি ও তার মা সিট ছেড়ে দিলে তাদের কৃতজ্ঞতাহীন আচরণে বিস্মিত হন।</p>

      <p>পরে ট্রেনে অভিভাবকদের আড্ডায় জানা যায়—তাদের সন্তানের বাংলার নম্বর কমেছে কারণ সে বাংলা পড়তে চায় না, ইংরেজিতেই স্বাচ্ছন্দ্য।</p>

      <p>শিশুরা নিজেদের মাতৃভাষাকে অবহেলা করছে, অথচ অভিভাবকরাও তা গুরুত্ব দিচ্ছেন না।</p>

      <p>ইংরেজি বলতে পারলেই যেন গর্ব, কিন্তু বাংলা বললে লজ্জা।</p>

      <p>শেষে লেখিকা উপলব্ধি করেন—বাংলা ভাষা নিয়ে এ উদাসীনতাই আজকের সমাজের বড় সমস্যা, অথচ আমরা ভাষাদিবস উদযাপনের কথা বলি।</p>
`,
    image: "/fourth.jpg"
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