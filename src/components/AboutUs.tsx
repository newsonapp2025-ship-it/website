import { motion } from "framer-motion";
import { Headphones, Brain, Globe, Zap, Rss } from "lucide-react";


const FEATURES = [
    {
        icon: Headphones,
        title: "Audio-First News",
        description:
            "Listen to the latest news without staring at screens. Perfect for multitasking, travel, and daily routines.",
    },
    {
        icon: Rss,
        title: "Live News Updates",
        description:
            "Listen to live and real-time news updates from trusted sources as events happen, without delays or summaries.",
    },
    {
        icon: Globe,
        title: "Trusted Sources",
        description:
            "NewsOn aggregates content from 50+ reliable global and local news providers in real time.",
    },
    {
        icon: Zap,
        title: "Fast & Lightweight",
        description:
            "Quick playback, low data usage, and smooth performance even on slow networks.",
    },
];

const AboutUs = () => {
    return (
        <section
            id="about"
            className="relative py-24 overflow-hidden bg-background"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-radial opacity-30" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block mb-4 px-4 py-2 rounded-full bg-secondary/70 border border-border/50 text-sm text-muted-foreground">
                        About NewsOn
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
                        News That Fits <span className="text-gradient">Your Life</span>
                    </h2>

                    <p className="text-lg text-muted-foreground">
                        NewsOn is built for people who want to stay informed without slowing
                        down. We transform real-time news into high-quality audio — so you
                        can listen anytime, anywhere.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group rounded-2xl p-6 bg-secondary/40 backdrop-blur border border-border/50 hover:border-primary/40 transition"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>

                                <h3 className="text-lg font-semibold mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 text-center max-w-2xl mx-auto"
                >
                    <p className="text-xl font-medium">
                        🎧 One tap. Zero reading. Smarter news consumption.
                    </p>
                    <p className="text-muted-foreground mt-2">
                        NewsOn helps you stay updated while living your life.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
