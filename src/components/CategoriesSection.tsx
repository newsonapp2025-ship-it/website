import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    emoji: "🏏",
    name: "Sports",
    description: "Live updates, match highlights, and sports analysis",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    emoji: "🏛️",
    name: "Politics",
    description: "National and international political news",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    emoji: "🎬",
    name: "Entertainment",
    description: "Movies, celebrities, music, and trending stories",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    emoji: "💼",
    name: "Business",
    description: "Market updates, startups, and economy news",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    emoji: "🌍",
    name: "World News",
    description: "Global events and breaking headlines",
    color: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30",
  },
  {
    emoji: "🔬",
    name: "Technology",
    description: "Tech trends, gadgets, and innovations",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
  },
];

const CategoriesSection = () => {

  const navigate = useNavigate()


  return (
    <section id="categories" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-glow opacity-30 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            News Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            All Your Interests,{" "}
            <span className="text-gradient">One App</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From sports to technology, we cover everything that matters to you.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group cursor-pointer"
            >
              <div onClick={() => navigate("/news")} className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor} backdrop-blur-sm hover:shadow-xl transition-all duration-500`}>
                {/* Emoji */}
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </span>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm">{category.description}</p>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <span className="text-foreground">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
