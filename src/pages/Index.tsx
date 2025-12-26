import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import AppPreviewSection from "@/components/landing/AppPreviewSection";
import DownloadSection from "@/components/landing/DownloadSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <AppPreviewSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;