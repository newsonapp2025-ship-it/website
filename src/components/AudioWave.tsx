import { motion } from "framer-motion";

interface AudioWaveProps {
  className?: string;
  barCount?: number;
  size?: "sm" | "md" | "lg";
}

const AudioWave = ({ className = "", barCount = 5, size = "md" }: AudioWaveProps) => {
  const heights = {
    sm: { min: 4, max: 16 },
    md: { min: 8, max: 24 },
    lg: { min: 12, max: 40 },
  };

  const { min, max } = heights[size];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-gradient-primary rounded-full w-1"
          initial={{ height: min }}
          animate={{
            height: [min, max, min],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AudioWave;