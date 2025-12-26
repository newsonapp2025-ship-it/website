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
  return (
    <section id="preview" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            App Preview
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Beautiful. Intuitive. Fast.
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience news consumption like never before with our clean, modern interface.
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Phone Frame */}
            <div className="bg-foreground rounded-[3rem] p-3 shadow-2xl shadow-foreground/20">
              {/* Phone Screen */}
              <div className="bg-background rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-secondary px-6 py-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-foreground rounded-sm" />
                    <div className="w-4 h-2 bg-foreground rounded-sm" />
                    <div className="w-6 h-3 bg-foreground rounded-sm" />
                  </div>
                </div>

                {/* App Header */}
                <div className="px-5 py-4 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      NewsOn
                    </h3>
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-muted-foreground">
                        JD
                      </span>
                    </div>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
                    {categories.map((cat, i) => (
                      <button
                        key={cat}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
                <div className="p-5 space-y-4 h-[400px] overflow-hidden">
                  {mockArticles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-4 border border-border hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary">
                          {article.category}
                        </span>
                        {article.trending && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-sm font-semibold text-foreground mb-3 leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.time}
                        </span>
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;