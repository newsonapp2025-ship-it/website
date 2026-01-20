import { useGetAllCategoriesQuery } from "@/features/api/userapi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* STATIC UI MAP (WITHOUT ID) */
const STATIC_UI = {
  sports: {
    emoji: "🏏",
    description: "Live updates, match highlights, and sports analysis",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
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
  education: {
    emoji: "📚",
    description: "Learning, exams, and career growth",
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
  },
  other: {
    emoji: "📰",
    description: "Miscellaneous and trending news",
    color: "from-gray-500/20 to-slate-500/20",
    borderColor: "border-gray-500/30",
  },
};

const CategoriesSection = () => {
  const navigate = useNavigate();
  const { data: getData, isLoading } = useGetAllCategoriesQuery();

  /* BUILD CATEGORY_UI WITH ID */
  const CATEGORY_UI = getData?.data?.reduce((acc, item) => {
    const key = item.categoryName?.toLowerCase();

    acc[key] = {
      ...(STATIC_UI[key] || STATIC_UI.other),
      id: item._id, // ✅ ID ADDED HERE
    };

    return acc;
  }, {});

  if (isLoading || !CATEGORY_UI) return null;

  return (
    <section
      id="categories"
      className="relative py-24 overflow-hidden bg-background"
    >

      <div className="absolute inset-0 bg-gradient-subtle" />
      {/* Background Effects */}
      {/* <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 blur-3xl rounded-full" /> */}

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            All Your Interests, <span className="text-gradient">One App</span>
          </h2>
          <p className="text-muted-foreground">
            From sports to technology, we cover everything.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getData.data
            .filter((item) => item.isActive)
            .map((item, index) => {
              const ui =
                CATEGORY_UI[item.categoryName.toLowerCase()] ||
                CATEGORY_UI.other;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    onClick={() => navigate(`/news/${ui.id}/${item.categoryName}`)} // ✅ USING UI ID
                    className={`p-6 rounded-2xl bg-gradient-to-br ${ui.color} border ${ui.borderColor} cursor-pointer`}
                  >
                    <span className="text-5xl mb-4 block">{ui.emoji}</span>
                    <h3 className="text-xl font-bold capitalize">
                      {item.categoryName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {ui.description}
                    </p>
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
