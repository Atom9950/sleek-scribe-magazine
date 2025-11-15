import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticlePage from "./components/ArticlePage";
import ArtOfCreativeCollaborationPage from "./pages/ArtOfCreativeCollaborationPage";
import UserExperienceMobilePage from "./pages/UserExperienceMobilePage";
import EmergingTechnologiesPage from "./pages/EmergingTechnologiesPage";
import VisualStorytellingPage from "./pages/VisualStorytellingPage";
import SustainableDesignPage from "./pages/SustainableDesignPage";
import NewsletterPage from "./components/Newsletter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/article/:slug" element={<ArticlePage />} />
          
          {/* Individual Article Pages */}
          <Route path="/বৃষ্টি" element={<ArtOfCreativeCollaborationPage />} />
          <Route path="/আমার রাজ্য" element={<UserExperienceMobilePage />} />
          <Route path="/বাংলার প্রতি বাঙালির উদাসীনতা" element={<EmergingTechnologiesPage />} />
          <Route path="/visual-storytelling" element={<VisualStorytellingPage />} />
          <Route path="/sustainable-design" element={<SustainableDesignPage />} />
          
          {/* Newsletter Page */}
          <Route path="/newsletter" element={<NewsletterPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
