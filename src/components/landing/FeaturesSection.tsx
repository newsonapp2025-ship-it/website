import { useEffect } from "react";
import { Bell, Sparkles, Layers, Bookmark, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Breaking News Alerts",
    description:
      "Get instant push notifications for breaking stories that matter to you. Never miss an important update.",
  },
  {
    icon: Sparkles,
    title: "Personalized Feed",
    description:
      "AI-powered recommendations tailored to your interests. The more you read, the smarter it gets.",
  },
  {
    icon: Layers,
    title: "Multiple Categories",
    description:
      "Politics, Sports, Entertainment, Business, Technology, and more. All your interests in one place.",
  },
  {
    icon: Bookmark,
    title: "Save for Later",
    description:
      "Bookmark articles to read offline. Perfect for your commute or when you're away from WiFi.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "News from over 10,000 sources worldwide. Get perspectives from every corner of the globe.",
  },
  {
    icon: Shield,
    title: "Fact-Checked Content",
    description:
      "Verified news from trusted sources. We prioritize accuracy and journalistic integrity.",
  },
];

const FeaturesSection = () => {
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
      { threshold: 0.01, rootMargin: "0px" }
    );

    // Check if elements are already in view
    const checkInitialView = () => {
      const elements = document.querySelectorAll(".feature-card, .feature-header");
      elements.forEach((el) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInView) {
            el.classList.add("animate-in");
          } else {
            observer.observe(el);
          }
        }
      });
    };

    // Run immediately and after a short delay
    checkInitialView();
    const timer = setTimeout(checkInitialView, 100);

    return () => {
      clearTimeout(timer);
      const elements = document.querySelectorAll(".feature-card, .feature-header");
      elements.forEach((el) => {
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, []);

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="feature-header text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 fade-in-on-scroll">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4 px-4">
            Everything You Need to Stay Informed
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            Powerful features designed to transform how you consume news.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 scale-up-on-scroll"
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;