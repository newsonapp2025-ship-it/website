import { useEffect } from "react";
import { TrendingUp, Clock, Heart } from "lucide-react";

const mockArticles = [
  {
    category: "TECHNOLOGY",
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    time: "2 min read",
    trending: true,
  },
  {
    category: "BUSINESS",
    title: "Global Markets Rally as Economic Data Exceeds Expectations",
    time: "4 min read",
    trending: false,
  },
  {
    category: "SCIENCE",
    title: "Breakthrough Discovery: New Renewable Energy Source Found",
    time: "3 min read",
    trending: true,
  },
];

const categories = ["For You", "Politics", "Sports", "Tech", "World", "Business"];

const AppPreviewSection = () => {
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

    const elements = document.querySelectorAll(".preview-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="preview" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="preview-animate text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 fade-in-on-scroll">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
            App Preview
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4 px-4">
            Beautiful. Intuitive. Fast.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            Experience news consumption like never before with our clean, modern interface.
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center px-4">
          <div className="preview-animate relative w-full max-w-[280px] sm:max-w-sm scale-up-on-scroll">
            {/* Phone Frame */}
            <div className="bg-foreground rounded-[2rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl shadow-foreground/20">
              {/* Phone Screen */}
              <div className="bg-background rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-secondary px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-medium text-foreground">9:41</span>
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-foreground rounded-sm" />
                    <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-foreground rounded-sm" />
                    <div className="w-5 h-2 sm:w-6 sm:h-3 bg-foreground rounded-sm" />
                  </div>
                </div>

                {/* App Header */}
                <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      NewsOn
                    </h3>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                        JD
                      </span>
                    </div>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-3 sm:-mx-5 px-3 sm:px-5 scrollbar-hide">
                    {categories.map((cat, i) => (
                      <button
                        key={cat}
                        className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                          i === 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* News Feed */}
                <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 h-[300px] sm:h-[400px] overflow-hidden">
                  {mockArticles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-semibold text-primary">
                          {article.category}
                        </span>
                        {article.trending && (
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Trending
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {article.time}
                        </span>
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-3xl hidden sm:block" />
            <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 bg-primary/5 rounded-full blur-3xl hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;