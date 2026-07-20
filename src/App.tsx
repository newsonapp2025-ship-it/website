import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import { NewsBrowseProvider } from "@/context/NewsBrowseContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutPage from "./pages/AboutPage";
import EditorialPolicy from "./pages/EditorialPolicy";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
// Audio news page — enable when AUDIO_NEWS_ENABLED in src/config/features.ts
// import FiveNewsPage from "./components/NewPage";
import NewsDetail from "./pages/NewsDetail";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="newson-theme">
    <LanguageProvider>
      <NewsBrowseProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route index element={<Index />} />
                  <Route path="/terms" element={<TermsCondition />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/editorial-policy" element={<EditorialPolicy />} />
                  <Route path="/article/:articleId" element={<NewsDetail />} />
                  {/* AUDIO_NEWS_ENABLED: <Route path="/news/:id/:name" element={<FiveNewsPage />} /> */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </NewsBrowseProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
