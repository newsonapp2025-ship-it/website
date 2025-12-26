import { useEffect } from "react";
import { Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".download-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="download" className="py-12 sm:py-16 md:py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="download-animate font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 slide-up-on-scroll px-4">
            Ready to Transform How You
            <br className="hidden sm:block" />
            <span className="text-primary"> Experience News?</span>
          </h2>

          <p className="download-animate text-background/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto slide-up-on-scroll px-4" style={{ transitionDelay: "0.1s" }}>
            Join millions of readers who trust NewsOn for their daily news.
            Download now and start your free trial today.
          </p>

          {/* Store Buttons */}
          <div className="download-animate flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 scale-up-on-scroll px-4" style={{ transitionDelay: "0.2s" }}>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl w-full sm:w-auto"
            >
              <Apple className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              <div className="text-left">
                <div className="text-[10px] sm:text-xs opacity-70">Download on the</div>
                <div className="font-bold text-sm sm:text-base">App Store</div>
              </div>
            </Button>

            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl w-full sm:w-auto"
            >
              <Play className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              <div className="text-left">
                <div className="text-[10px] sm:text-xs opacity-70">Get it on</div>
                <div className="font-bold text-sm sm:text-base">Google Play</div>
              </div>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-background/50 text-xs sm:text-sm px-4">
            <span>✓ Free to download</span>
            <span>✓ No credit card required</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;