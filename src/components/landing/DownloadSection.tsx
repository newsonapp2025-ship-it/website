import { useEffect } from "react";
import { Apple, Play, Sparkles, Zap, Shield } from "lucide-react";
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

          <p className="download-animate text-background/70 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto slide-up-on-scroll px-4" style={{ transitionDelay: "0.1s" }}>
            Join millions of readers who trust NewsOn for their daily news.
            Download now and start your free trial today.
          </p>

          {/* Feature Highlights */}
          <div className="download-animate mb-8 sm:mb-10 md:mb-12 slide-up-on-scroll px-4" style={{ transitionDelay: "0.15s" }}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="group flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-background/5 hover:bg-background/10 transition-all duration-300 border border-background/10 hover:border-primary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-base font-bold text-background">Lightning Fast</div>
                  <div className="text-xs sm:text-sm text-background/70">Instant Updates</div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-background/5 hover:bg-background/10 transition-all duration-300 border border-background/10 hover:border-primary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-base font-bold text-background">AI-Powered</div>
                  <div className="text-xs sm:text-sm text-background/70">Personalized Feed</div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-background/5 hover:bg-background/10 transition-all duration-300 border border-background/10 hover:border-primary/30">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-base font-bold text-background">100% Secure</div>
                  <div className="text-xs sm:text-sm text-background/70">Privacy First</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="download-animate mb-8 sm:mb-10 flex items-center justify-center gap-4 px-4" style={{ transitionDelay: "0.18s" }}>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-background/30 to-background/30"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-background/30 to-background/30"></div>
          </div>

          {/* Store Buttons */}
          <div className="download-animate flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 scale-up-on-scroll px-4" style={{ transitionDelay: "0.2s" }}>
            {/* App Store Button */}
            <button
              className="group relative bg-gradient-to-br from-background via-background to-background/95 text-foreground font-semibold px-5 sm:px-6 py-4 sm:py-4.5 rounded-xl w-full sm:w-auto transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-primary/20 border-2 border-background/20 hover:border-primary/40 overflow-hidden min-w-[160px] sm:min-w-[180px]"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative flex items-center justify-center gap-2.5">
                <div className="relative">
                  <Apple className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] opacity-60 font-medium tracking-wide">Download on the</div>
                  <div className="font-bold text-sm sm:text-base tracking-tight">App Store</div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>

            {/* Google Play Button */}
            <button
              className="group relative bg-gradient-to-br from-background via-background to-background/95 text-foreground font-semibold px-5 sm:px-6 py-4 sm:py-4.5 rounded-xl w-full sm:w-auto transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-primary/20 border-2 border-background/20 hover:border-primary/40 overflow-hidden min-w-[160px] sm:min-w-[180px]"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative flex items-center justify-center gap-2.5">
                <div className="relative">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] opacity-60 font-medium tracking-wide">Get it on</div>
                  <div className="font-bold text-sm sm:text-base tracking-tight">Google Play</div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </button>
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