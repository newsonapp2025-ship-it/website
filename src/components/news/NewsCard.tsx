import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { NewsArticle } from "@/types/news";
import { cacheArticle, formatRelativeTime, getArticleSummary } from "@/lib/news";
import NewsImage from "./NewsImage";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "featured" | "compact" | "horizontal";
  /** Optional side effect before navigation (defaults to cacheArticle) */
  onNavigate?: (article: NewsArticle) => void;
  className?: string;
}

const SourceMeta = ({ article }: { article: NewsArticle }) => (
  <div className="flex min-w-0 items-center gap-2">
    {article.source_icon ? (
      <img
        src={article.source_icon}
        alt=""
        className="h-5 w-5 rounded-full object-cover ring-1 ring-white/10"
      />
    ) : (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
        {article.source_name?.charAt(0) || "N"}
      </span>
    )}
    <span className="truncate text-xs font-medium text-muted-foreground">
      {article.source_name}
    </span>
    <span className="text-muted-foreground/50">·</span>
    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
      <Clock className="h-3 w-3" />
      {formatRelativeTime(article.pubDate)}
    </span>
  </div>
);

const NewsCard = ({
  article,
  variant = "compact",
  onNavigate,
  className,
}: NewsCardProps) => {
  const summary = getArticleSummary(article, variant === "featured" ? 220 : 120);

  const handleNavigate = () => {
    if (onNavigate) onNavigate(article);
    else cacheArticle(article);
  };

  if (variant === "featured") {
    return (
      <Link
        to={`/article/${article.article_id}`}
        state={{ article }}
        onClick={handleNavigate}
        className={cn(
          "group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-card text-left shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow",
          className,
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <NewsImage
            article={article}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            iconClassName="w-16 h-16"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <SourceMeta article={article} />
            <h3 className="mt-3 line-clamp-3 text-xl font-bold leading-snug text-white md:text-2xl">
              {article.title}
            </h3>
            {summary && (
              <p className="mt-2 hidden text-sm leading-relaxed text-white/75 line-clamp-2 md:block">
                {summary}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        to={`/article/${article.article_id}`}
        state={{ article }}
        onClick={handleNavigate}
        className={cn(
          "group flex w-full gap-4 overflow-hidden rounded-xl border border-white/10 bg-card/80 p-3 text-left transition-all duration-300 hover:border-primary/25 hover:bg-card",
          className,
        )}
      >
        <NewsImage
          article={article}
          className="h-24 w-32 shrink-0 rounded-lg"
          iconClassName="w-8 h-8"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <div className="mt-2">
            <SourceMeta article={article} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${article.article_id}`}
      state={{ article }}
      onClick={handleNavigate}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card/80 text-left transition-all duration-300 hover:border-primary/25 hover:bg-card hover:shadow-card",
        className,
      )}
    >
      <NewsImage
        article={article}
        className="aspect-[16/10] w-full"
        iconClassName="w-10 h-10"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <div className="mt-auto pt-3">
          <SourceMeta article={article} />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
