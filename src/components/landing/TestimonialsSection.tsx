import { useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Tech Entrepreneur",
    avatar: "SC",
    content: "NewsOn has completely changed how I stay informed. The personalized feed knows exactly what I want to read before I do!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Financial Analyst",
    avatar: "MJ",
    content: "The speed of breaking news alerts is unmatched. I've made critical decisions faster thanks to NewsOn's real-time updates.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "University Professor",
    avatar: "ER",
    content: "Finally, a news app that prioritizes accuracy. I recommend NewsOn to all my students for reliable information.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
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

    const elements = document.querySelectorAll(".testimonial-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Floating quote marks */}
      <Quote className="absolute top-20 left-[10%] w-16 h-16 sm:w-24 sm:h-24 text-primary/5 animate-float hidden sm:block" />
      <Quote className="absolute bottom-20 right-[10%] w-24 h-24 sm:w-32 sm:h-32 text-primary/5 animate-float hidden sm:block" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="testimonial-animate text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 fade-in-on-scroll">
          <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4 px-4">
            Loved by Millions Worldwide
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            See what our readers have to say about their NewsOn experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="testimonial-animate group relative scale-up-on-scroll"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border h-full transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                {/* Quote icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-sm sm:text-base group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="testimonial-animate mt-8 sm:mt-12 md:mt-16 text-center fade-in-on-scroll px-4" style={{ transitionDelay: "0.3s" }}>
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {["TechCrunch", "Forbes", "Reuters", "Bloomberg", "The Guardian"].map((brand, i) => (
              <span
                key={brand}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold text-muted-foreground/40 hover:text-primary/60 transition-colors duration-300 cursor-default"
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
