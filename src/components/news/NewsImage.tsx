import { useState } from "react";
import { Newspaper } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import { getPlaceholderGradient } from "@/lib/news";
import { cn } from "@/lib/utils";

interface NewsImageProps {
  article: NewsArticle;
  className?: string;
  iconClassName?: string;
}

const NewsImage = ({ article, className, iconClassName }: NewsImageProps) => {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !article.image_url || failed;

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br",
          getPlaceholderGradient(article),
          className,
        )}
      >
        <Newspaper className={cn("text-white/30", iconClassName || "w-10 h-10")} />
      </div>
    );
  }

  return (
    <img
      src={article.image_url}
      alt={article.title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
};

export default NewsImage;
