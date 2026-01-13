import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTermsDataQuery } from "@/features/api/userapi";
import AboutUs from "@/components/AboutUs";
import FirstHero from "@/components/FirstHero";

const Index = () => {

  const { data: getdata } = useTermsDataQuery()
  const { hash } = useLocation();

  console.log(getdata, "think faster find")

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");

    // Wait until DOM is painted
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [hash]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* <Header /> */}
      {/* <HeroSection /> */}
      <FirstHero />

      <FeaturesSection />
      <AboutUs />
      <CategoriesSection />
      <HowItWorksSection />
      <ContactSection />
      <CTASection />
      {/* <Footer /> */}
    </main>
  );
};

export default Index;
