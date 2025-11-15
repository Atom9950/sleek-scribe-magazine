// src/pages/PostsPage.tsx
import Header from "@/components/Header";
import BlogGrid from "../components/BlogGrid";
import Newsletter from "@/components/Newsletter";

const PostsPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
          <Header />
    <div className="min-h-screen bg-background">
      <BlogGrid />
    </div>
    <Newsletter />
    </div>
  );
};

export default PostsPage;