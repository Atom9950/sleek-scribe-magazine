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
import ScrollToTop from "./components/ScrollToTop";
import AllPostsPage from "./pages/AllPostsPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/posts" element={<AllPostsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/article/:slug" element={<ArticlePage />} />
          
          {/* Individual Article Pages */}
          <Route path="/brishti" element={<ArtOfCreativeCollaborationPage />} />
          <Route path="/amar-rajya" element={<UserExperienceMobilePage />} />
          <Route path="/banglar-prati-bangalir-udashinota" element={<EmergingTechnologiesPage />} />
          <Route path="/odrishya-nayak" element={<VisualStorytellingPage />} />
          <Route path="/kalo-noy-kalanka" element={<SustainableDesignPage />} />
          
          {/* Newsletter Page */}
          <Route path="/newsletter" element={<NewsletterPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
