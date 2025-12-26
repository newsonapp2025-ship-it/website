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
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to Stay Informed
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful features designed to transform how you consume news.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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