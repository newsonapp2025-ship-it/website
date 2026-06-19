import {
  APP_STORE_BADGE,
  APP_STORE_URL,
  PLAY_STORE_BADGE,
  PLAY_STORE_URL,
} from "@/config/appStores";
import { cn } from "@/lib/utils";

interface StoreBadgesProps {
  className?: string;
  badgeClassName?: string;
  size?: "sm" | "md" | "lg";
}

const badgeHeights = {
  sm: "h-10",
  md: "h-12",
  lg: "h-14",
};

const StoreBadges = ({ className, badgeClassName, size = "md" }: StoreBadgesProps) => {
  const height = badgeHeights[size];

  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get NewsOn on Google Play"
        className="flex items-center justify-center rounded-xl bg-secondary px-4 py-3 transition hover:bg-secondary/80"
      >
        <img src={PLAY_STORE_BADGE} alt="Get it on Google Play" className={cn(height, badgeClassName)} />
      </a>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download NewsOn on the App Store"
        className="flex items-center justify-center rounded-xl bg-secondary px-4 py-3 transition hover:bg-secondary/80"
      >
        <img src={APP_STORE_BADGE} alt="Download on the App Store" className={cn(height, badgeClassName)} />
      </a>
    </div>
  );
};

export default StoreBadges;
