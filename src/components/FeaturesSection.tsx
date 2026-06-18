import { motion } from "framer-motion";
import { Layers, Clock, Smartphone, Globe, Newspaper } from "lucide-react";
import { AUDIO_NEWS_ENABLED } from "@/config/features";

const features = [
  {
    icon: Newspaper,
    title: "Curated News Feed",
    description: "Browse headlines and stories from trusted sources in your preferred language.",
  },
  {
    icon: Layers,
    title: "Multiple Categories",
    description: "Choose news based on your interest from sports to politics to entertainment.",
  },
  {
    icon: Clock,
    title: "Short & Clear Updates",
    description: "Easy to understand and time-saving updates that fit your busy schedule.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Designed specially for mobile users with intuitive touch controls.",
  },
  {
    icon: Globe,
    title: "Latest & Trusted Sources",
    description: "Real-time and reliable information from verified news outlets.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Stay Informed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {AUDIO_NEWS_ENABLED
              ? "News On makes news simple, accessible, and convenient by delivering important updates in audio format."
              : "News On brings you the latest headlines and stories from trusted sources — simple, fast, and in your language."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
