import { useGetAllCategoriesQuery } from "@/features/api/userapi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* UI CONFIG FOR CATEGORIES */

const CategoriesSection = () => {
  const navigate = useNavigate();
  const { data: getData, isLoading } = useGetAllCategoriesQuery();

  console.log(getData?.data, "super formate range large")


  const CATEGORY_UI = {
    sports: {
      emoji: "🏏",
      description: "Live updates, match highlights, and sports analysis",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      id: getData?.data?.[0]

    },
    politics: {
      emoji: "🏛️",
      description: "National and international political news",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30",
    },
    entertainment: {
      emoji: "🎬",
      description: "Movies, celebrities, music, and trending stories",
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
    },
    business: {
      emoji: "💼",
      description: "Market updates, startups, and economy news",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
    },
    world: {
      emoji: "🌍",
      description: "Global events and breaking headlines",
      color: "from-cyan-500/20 to-teal-500/20",
      borderColor: "border-cyan-500/30",
    },
    technology: {
      emoji: "🔬",
      description: "Tech trends, gadgets, and innovations",
      color: "from-violet-500/20 to-purple-500/20",
      borderColor: "border-violet-500/30",
    },
    science: {
      emoji: "🧪",
      description: "Discoveries, research, and innovation",
      color: "from-sky-500/20 to-blue-500/20",
      borderColor: "border-sky-500/30",
    },
    health: {
      emoji: "🩺",
      description: "Health tips, wellness, and medical news",
      color: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
    },
    lifestyle: {
      emoji: "🌿",
      description: "Living, culture, and daily trends",
      color: "from-lime-500/20 to-green-500/20",
      borderColor: "border-lime-500/30",
    },
    food: {
      emoji: "🍔",
      description: "Recipes, food trends, and dining",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
    },
    environment: {
      emoji: "🌱",
      description: "Climate, nature, and sustainability",
      color: "from-emerald-500/20 to-green-600/20",
      borderColor: "border-emerald-500/30",
    },
    education: {
      emoji: "📚",
      description: "Learning, exams, and career growth",
      color: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-500/30",
    },
    crime: {
      emoji: "🚨",
      description: "Crime reports and investigations",
      color: "from-red-600/20 to-rose-600/20",
      borderColor: "border-red-600/30",
    },
    domestic: {
      emoji: "🏠",
      description: "Local and domestic news",
      color: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/30",
    },
    tourism: {
      emoji: "✈️",
      description: "Travel, destinations, and tips",
      color: "from-sky-500/20 to-cyan-500/20",
      borderColor: "border-sky-500/30",
    },
    breaking: {
      emoji: "⚡",
      description: "Breaking and urgent updates",
      color: "from-red-500/30 to-orange-500/30",
      borderColor: "border-red-500/40",
    },
    other: {
      emoji: "📰",
      description: "Miscellaneous and trending news",
      color: "from-gray-500/20 to-slate-500/20",
      borderColor: "border-gray-500/30",
    },
  };


  return (
    <section id="categories" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
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
          {!isLoading &&
            getData?.data
              ?.filter((item) => item.isActive)
              .map((item, index) => {
                const ui =
                  CATEGORY_UI[item.categoryName?.toLowerCase()] ||
                  CATEGORY_UI.other;

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                    className="group cursor-pointer"
                  >
                    <div
                      onClick={() =>
                        navigate(`/news?category=${item.categoryName}`)
                      }
                      className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${ui.color} border ${ui.borderColor} backdrop-blur-sm hover:shadow-xl transition-all duration-500`}
                    >
                      {/* Emoji */}
                      <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                        {ui.emoji}
                      </span>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-foreground mb-2 capitalize">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {ui.description}
                      </p>

                      {/* Arrow */}
                      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <span className="text-foreground">→</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
