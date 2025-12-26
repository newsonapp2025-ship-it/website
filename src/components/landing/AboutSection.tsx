import { Target, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "10M+", label: "Monthly Readers" },
  { icon: Award, value: "50+", label: "Awards Won" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime" },
  { icon: Target, value: "150+", label: "Countries" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="opacity-0 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Delivering Truth in the{" "}
              <span className="text-primary relative">
                Digital Age
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" className="animate-fade-in" style={{ animationDelay: "0.8s" }} />
                </svg>
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded in 2020, NewsOn was born from a simple belief: everyone deserves access to 
              accurate, unbiased news. We've built a platform that cuts through the noise and 
              delivers what matters most to you.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our team of dedicated journalists and engineers work around the clock to ensure you're 
              always connected to the stories shaping our world. We're committed to journalistic 
              integrity, transparency, and putting our readers first.
            </p>
            
            {/* Mission badges */}
            <div className="flex flex-wrap gap-3">
              {["Fact-Checked", "Unbiased", "24/7 Coverage", "Global Reach"].map((badge, i) => (
                <span
                  key={badge}
                  className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default opacity-0 animate-scale-up"
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 opacity-0 animate-scale-up overflow-hidden"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/5 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="font-display text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
