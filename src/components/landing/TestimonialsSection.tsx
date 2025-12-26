import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Tech Entrepreneur",
    avatar: "SC",
    content: "NewsFlow has completely changed how I stay informed. The personalized feed knows exactly what I want to read before I do!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Financial Analyst",
    avatar: "MJ",
    content: "The speed of breaking news alerts is unmatched. I've made critical decisions faster thanks to NewsFlow's real-time updates.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "University Professor",
    avatar: "ER",
    content: "Finally, a news app that prioritizes accuracy. I recommend NewsFlow to all my students for reliable information.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Floating quote marks */}
      <Quote className="absolute top-20 left-[10%] w-24 h-24 text-primary/5 animate-float" />
      <Quote className="absolute bottom-20 right-[10%] w-32 h-32 text-primary/5 animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Loved by Millions Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our readers have to say about their NewsFlow experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="bg-card rounded-2xl p-8 border border-border h-full transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                {/* Quote icon */}
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Quote className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary opacity-0 animate-scale-up"
                      style={{ animationDelay: `${0.4 + index * 0.15 + i * 0.05}s` }}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground mb-6">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["TechCrunch", "Forbes", "Reuters", "Bloomberg", "The Guardian"].map((brand, i) => (
              <span
                key={brand}
                className="text-xl md:text-2xl font-display font-bold text-muted-foreground/40 hover:text-primary/60 transition-colors duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
