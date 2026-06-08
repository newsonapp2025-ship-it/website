import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import FiveNewsPage from "./components/NewPage";
import NewsDetail from "./pages/NewsDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Index />} />
            <Route path="/terms" element={<TermsCondition />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/article/:articleId" element={<NewsDetail />} />
            <Route path="/news/:id/:name" element={<FiveNewsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
