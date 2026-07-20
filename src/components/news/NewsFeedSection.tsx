import { useCallback, useEffect, useMemo, useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Clapperboard,
  Clock,
  Landmark,
  Loader2,
  Mail,
  Newspaper,
  Quote,
  RefreshCw,
  Rocket,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useGetWebsiteNewsQuery } from "@/features/api/userapi";
import type { NewsArticle } from "@/types/news";
import { useLanguage } from "@/context/LanguageContext";
import { useNewsBrowse } from "@/context/NewsBrowseContext";
import { cacheArticle, getArticleSummary } from "@/lib/news";
import { Button } from "@/components/ui/button";
import AdSense from "@/components/ads/AdSense";
import NewsImage from "./NewsImage";
import { cn } from "@/lib/utils";

/* ─── Figma tokens ─── */
const GRADIENT = "linear-gradient(90deg, #010101 0%, #C61418 100%)";
const VIEW_ALL_CLASS = "font-['Inria_Serif'] text-[20px] font-bold text-[#C70000] hover:underline";
const TITLE_CLASS = "font-bold text-[26px] leading-snug text-foreground";
const BODY_CLASS = "text-[20px] font-normal leading-relaxed text-foreground";

type SectionLayout = "politics" | "sports" | "movies" | "motivation";
type SidebarType = "latest" | "trending" | null;

interface FeedSectionConfig {
  key: string;
  label: string;
  icon: ElementType;
  layout: SectionLayout;
  sidebar: SidebarType;
  matchCategories?: string[];
}

const FEED_SECTIONS: FeedSectionConfig[] = [
  { key: "politics", label: "Politics", icon: Landmark, layout: "politics", sidebar: "latest" },
  { key: "sports", label: "Sports", icon: Trophy, layout: "sports", sidebar: "trending" },
  {
    key: "movies",
    label: "Movies",
    icon: Clapperboard,
    layout: "movies",
    sidebar: null,
    matchCategories: ["movies", "entertainment", "cinema", "lifestyle"],
  },
  {
    key: "motivation",
    label: "Motivation",
    icon: Quote,
    layout: "motivation",
    sidebar: null,
    matchCategories: ["motivation", "lifestyle", "general"],
  },
];

function formatFigmaTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function articleMatchesCategory(article: NewsArticle, keys: string[]): boolean {
  const cats = (article.categoryNames ?? []).map((c) => c.toLowerCase());
  return keys.some((k) => cats.includes(k));
}

function pickArticlesForSection(
  pool: NewsArticle[],
  section: FeedSectionConfig,
  used: Set<string>,
  count: number,
): NewsArticle[] {
  const keys = section.matchCategories ?? [section.key];
  const matched = pool.filter(
    (a) => !used.has(a.article_id) && articleMatchesCategory(a, keys),
  );
  const fallback = pool.filter((a) => !used.has(a.article_id));
  const picked = [...matched, ...fallback].slice(0, count);
  picked.forEach((a) => used.add(a.article_id));
  return picked;
}

/* ─── Sub-components (Figma UI) ─── */

const ViewAllLink = ({ onClick }: { onClick?: () => void }) => (
  <button type="button" onClick={onClick} className={VIEW_ALL_CLASS}>
    View all
  </button>
);

const CategoryRibbon = ({
  label,
  icon: Icon,
  onViewAll,
}: {
  label: string;
  icon: ElementType;
  onViewAll?: () => void;
}) => (
  <div className="mb-5 flex items-center justify-between gap-4">
    <div className="flex min-w-0 flex-1 items-center">
      <div
        className="relative flex items-center gap-3 py-2.5 pl-4 pr-10 text-white"
        style={{
          background: GRADIENT,
          clipPath:
            "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)",
        }}
      >
        <span className="h-8 w-1 shrink-0 bg-white" aria-hidden />
        <span className="font-['Inria_Serif'] text-xl font-bold md:text-2xl">{label}</span>
        <Icon className="h-5 w-5 shrink-0 opacity-95" strokeWidth={1.75} />
      </div>
    </div>
    <ViewAllLink onClick={onViewAll} />
  </div>
);

const TimeStamp = ({ date }: { date: string }) => (
  <span className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
    <Clock className="h-3.5 w-3.5" />
    {formatFigmaTime(date)}
  </span>
);

const FeaturedCard = ({
  article,
  onClick,
  showExcerpt = true,
}: {
  article: NewsArticle;
  onClick: (a: NewsArticle) => void;
  showExcerpt?: boolean;
}) => {
  const excerpt = getArticleSummary(article, 280);
  return (
    <button
      type="button"
      onClick={() => onClick(article)}
      className="group w-full text-left"
    >
      <NewsImage
        article={article}
        className="aspect-[16/10] w-full rounded-lg object-cover transition group-hover:opacity-95"
        iconClassName="h-14 w-14"
      />
      <h3 className={cn(TITLE_CLASS, "mt-4 line-clamp-3 group-hover:text-[#C61418]")}>
        {article.title}
      </h3>
      {showExcerpt && excerpt && (
        <p className={cn(BODY_CLASS, "mt-3 line-clamp-4 text-muted-foreground")}>{excerpt}</p>
      )}
      <TimeStamp date={article.pubDate} />
    </button>
  );
};

const GridCard = ({
  article,
  onClick,
  compact = false,
}: {
  article: NewsArticle;
  onClick: (a: NewsArticle) => void;
  compact?: boolean;
}) => (
  <button
    type="button"
    onClick={() => onClick(article)}
    className="group w-full text-left"
  >
    <NewsImage
      article={article}
      className={cn(
        "w-full rounded-lg object-cover transition group-hover:opacity-95",
        compact ? "aspect-[4/3]" : "aspect-[16/10]",
      )}
      iconClassName="h-10 w-10"
    />
    <h3
      className={cn(
        "mt-3 font-bold leading-snug text-foreground group-hover:text-[#C61418]",
        compact ? "text-base md:text-lg" : "text-lg md:text-xl",
      )}
    >
      <span className="line-clamp-2">{article.title}</span>
    </h3>
    <TimeStamp date={article.pubDate} />
  </button>
);

const HeroCarousel = ({
  slides,
  onClick,
}: {
  slides: NewsArticle[];
  onClick: (a: NewsArticle) => void;
}) => {
  const [active, setActive] = useState(0);
  const hero = slides[active] ?? slides[0];
  const side = slides.filter((_, i) => i !== active).slice(0, 2);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % Math.min(slides.length, 5)), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!hero) return null;

  const category = hero.categoryNames?.find((c) => c !== "top") ?? "News";

  return (
    <div className="mb-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
      <button
        type="button"
        onClick={() => onClick(hero)}
        className="group relative col-span-12 overflow-hidden rounded-xl lg:col-span-8"
      >
        <NewsImage
          article={hero}
          className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          iconClassName="h-16 w-16"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <span className="inline-block rounded bg-[#C61418] px-3 py-1 text-xs font-semibold uppercase text-white">
            {category}
          </span>
          <h2 className="mt-3 text-xl font-bold leading-snug text-white md:text-2xl lg:text-[26px] line-clamp-3">
            {hero.title}
          </h2>
          <span className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
            <Clock className="h-3.5 w-3.5" />
            {formatFigmaTime(hero.pubDate)}
          </span>
        </div>
        {slides.length > 1 && (
          <div className="absolute bottom-5 right-5 flex gap-1.5 md:bottom-7 md:right-7">
            {slides.slice(0, 5).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-[#C61418]" : "w-1.5 bg-white/70",
                )}
              />
            ))}
          </div>
        )}
      </button>

      <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
        {side.map((article) => {
          const cat = article.categoryNames?.find((c) => c !== "top") ?? "News";
          return (
            <button
              key={article.article_id}
              type="button"
              onClick={() => onClick(article)}
              className="group relative flex-1 overflow-hidden rounded-xl"
            >
              <NewsImage
                article={article}
                className="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-[calc(50%-8px)] lg:min-h-[180px]"
                iconClassName="h-10 w-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs font-semibold uppercase text-[#C61418]">{cat}</span>
                <p className="mt-1 line-clamp-2 text-sm font-bold text-white md:text-base">
                  {article.title}
                </p>
              </div>
              <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow">
                <ChevronRight className="h-4 w-4" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const LatestUpdatesSidebar = ({
  articles,
  onClick,
}: {
  articles: NewsArticle[];
  onClick: (a: NewsArticle) => void;
}) => (
  <aside className="w-full shrink-0 lg:w-[280px] xl:w-[300px]">
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div
        className="flex items-center gap-2 px-4 py-3 text-white"
        style={{ background: GRADIENT }}
      >
        <Rocket className="h-5 w-5" />
        <span className="font-['Inria_Serif'] text-lg font-bold">Latest Updates</span>
      </div>
      <ul className="divide-y divide-border p-2">
        {articles.map((article) => (
          <li key={article.article_id}>
            <button
              type="button"
              onClick={() => onClick(article)}
              className="flex w-full gap-3 rounded-lg p-2 text-left hover:bg-secondary/60"
            >
              <NewsImage
                article={article}
                className="h-16 w-16 shrink-0 rounded-md object-cover"
                iconClassName="h-6 w-6"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-bold text-foreground">{article.title}</p>
                <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatFigmaTime(article.pubDate)}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-border py-3 text-center">
        <ViewAllLink />
      </div>
    </div>
  </aside>
);

const TrendingSidebar = ({
  articles,
  onClick,
}: {
  articles: NewsArticle[];
  onClick: (a: NewsArticle) => void;
}) => (
  <aside className="w-full shrink-0 lg:w-[280px] xl:w-[300px]">
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div
        className="flex items-center gap-2 px-4 py-3 text-white"
        style={{ background: GRADIENT }}
      >
        <TrendingUp className="h-5 w-5" />
        <span className="font-['Inria_Serif'] text-lg font-bold">Trending Now</span>
      </div>
      <ol className="p-3">
        {articles.map((article, index) => {
          const cat = article.categoryNames?.find((c) => c !== "top") ?? "News";
          return (
            <li key={article.article_id}>
              <button
                type="button"
                onClick={() => onClick(article)}
                className="flex w-full items-start gap-3 border-b border-border py-3 text-left last:border-0 hover:opacity-90"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "#C61418" }}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-bold text-foreground">{article.title}</p>
                  <span className="mt-0.5 text-xs capitalize text-muted-foreground">{cat}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="border-t border-border py-3 text-center">
        <ViewAllLink />
      </div>
    </div>
  </aside>
);

const AdSlot = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 p-3",
      className,
    )}
  >
    <AdSense format="horizontal" className="w-full" style={{ minHeight: 90, minWidth: 320 }} />
  </div>
);

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="mt-10 flex flex-col items-center justify-between gap-6 rounded-xl px-6 py-8 md:flex-row md:px-10"
      style={{ background: GRADIENT }}
    >
      <div className="flex items-start gap-4 text-white">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/15">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-['Inria_Serif'] text-xl font-bold md:text-2xl">
            Stay updated with the latest news
          </h3>
          <p className="mt-1 text-sm text-white/85">
            Subscribe to our newsletter and never miss an update
          </p>
        </div>
      </div>
      <form
        className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) setSubmitted(true);
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your mail"
          required
          className="flex-1 rounded-lg border-0 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
        <Button
          type="submit"
          className="shrink-0 bg-white px-8 font-semibold text-black hover:bg-white/90"
        >
          {submitted ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

/* ─── Section layouts ─── */

const PoliticsSportsSection = ({
  section,
  articles,
  sidebarArticles,
  onClick,
}: {
  section: FeedSectionConfig;
  articles: NewsArticle[];
  sidebarArticles: NewsArticle[];
  onClick: (a: NewsArticle) => void;
}) => {
  const [featured, ...rest] = articles;
  const grid = rest.slice(0, 4);
  if (!featured) return null;

  return (
    <section id={`feed-${section.key}`} className="scroll-mt-32 mb-12">
      <CategoryRibbon label={section.label} icon={section.icon} />
      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="grid min-w-0 flex-1 gap-6 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <FeaturedCard article={featured} onClick={onClick} />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {grid.map((article) => (
              <GridCard key={article.article_id} article={article} onClick={onClick} />
            ))}
          </div>
        </div>
        {section.sidebar === "latest" && (
          <LatestUpdatesSidebar articles={sidebarArticles} onClick={onClick} />
        )}
        {section.sidebar === "trending" && (
          <TrendingSidebar articles={sidebarArticles} onClick={onClick} />
        )}
      </div>
    </section>
  );
};

const MoviesMotivationSection = ({
  section,
  articles,
  onClick,
  showNewsletter,
}: {
  section: FeedSectionConfig;
  articles: NewsArticle[];
  onClick: (a: NewsArticle) => void;
  showNewsletter?: boolean;
}) => {
  const [featured, ...rest] = articles;
  const grid = rest.slice(0, 6);
  if (!featured) return null;

  return (
    <section id={`feed-${section.key}`} className="scroll-mt-32 mb-12">
      <CategoryRibbon label={section.label} icon={section.icon} />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <FeaturedCard article={featured} onClick={onClick} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {grid.map((article) => (
            <GridCard key={article.article_id} article={article} onClick={onClick} compact />
          ))}
        </div>
      </div>
      {showNewsletter && <NewsletterBanner />}
    </section>
  );
};

/* ─── Main feed ─── */

const NewsFeedSection = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { debouncedSearch, activeCategory } = useNewsBrowse();
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const { data, isLoading, isFetching, refetch } = useGetWebsiteNewsQuery({
    page,
    limit: 40,
    language,
    search: debouncedSearch || undefined,
  });

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [language, debouncedSearch]);

  useEffect(() => {
    if (!data?.data) return;
    setArticles((prev) => {
      if (page === 1) return data.data;
      const ids = new Set(prev.map((a) => a.article_id));
      const next = data.data.filter((a) => !ids.has(a.article_id));
      return next.length ? [...prev, ...next] : prev;
    });
  }, [data, page]);

  const openArticle = useCallback(
    (article: NewsArticle) => {
      cacheArticle(article);
      navigate(`/article/${article.article_id}`, { state: { article } });
    },
    [navigate],
  );

  const { heroSlides, sectionData } = useMemo(() => {
    const politics = articles.filter((a) => articleMatchesCategory(a, ["politics"]));
    const heroSlides = (politics.length >= 3 ? politics : articles).slice(0, 5);
    const heroIds = new Set(heroSlides.map((a) => a.article_id));

    const used = new Set<string>(heroIds);
    const pool = articles.filter((a) => !heroIds.has(a.article_id));

    const sectionData = FEED_SECTIONS.map((section) => {
      const need = section.layout === "politics" || section.layout === "sports" ? 5 : 7;
      const sectionArticles = pickArticlesForSection(pool, section, used, need);
      const sidebarArticles = pool
        .filter((a) => !used.has(a.article_id))
        .slice(0, 5);
      sidebarArticles.forEach((a) => used.add(a.article_id));
      return { section, articles: sectionArticles, sidebarArticles };
    });

    return { heroSlides, sectionData };
  }, [articles]);

  const visibleSections = useMemo(() => {
    if (activeCategory === "all") return sectionData;
    return sectionData.filter(({ section }) => section.key === activeCategory);
  }, [sectionData, activeCategory]);

  const hasMore = data?.pagination ? page < data.pagination.totalPages : false;

  return (
    <section id="news" className="scroll-mt-32 bg-background py-8 md:py-10">
      <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
        {/* Top toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C61418]">
              Live Feed
            </p>
            <h1 className={cn(TITLE_CLASS, "mt-1")}>Latest News &amp; Stories</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPage(1);
                setArticles([]);
                refetch();
              }}
              disabled={isFetching}
              className="border-border text-foreground hover:bg-secondary"
            >
              <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", isFetching && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Ad — leaderboard */}
        <AdSlot className="mb-8" />

        {isLoading && page === 1 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-[#C61418]" />
            <p className="mt-4 text-muted-foreground">Loading latest news…</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 font-medium text-foreground">No news found</p>
            <p className="text-muted-foreground">
              {debouncedSearch ? `No results for "${debouncedSearch}"` : "Try another language or refresh"}
            </p>
          </div>
        ) : (
          <>
            {(activeCategory === "all" || activeCategory === "politics") && (
              <HeroCarousel slides={heroSlides} onClick={openArticle} />
            )}

            {visibleSections.map(({ section, articles: sectionArticles, sidebarArticles }, index) => (
              <div key={section.key}>
                {section.layout === "politics" || section.layout === "sports" ? (
                  <PoliticsSportsSection
                    section={section}
                    articles={sectionArticles}
                    sidebarArticles={sidebarArticles}
                    onClick={openArticle}
                  />
                ) : (
                  <MoviesMotivationSection
                    section={section}
                    articles={sectionArticles}
                    onClick={openArticle}
                    showNewsletter={section.layout === "motivation"}
                  />
                )}

                {/* Ad slot between sections — ready for future placements */}
                {(index === 0 || index === 2) && <AdSlot className="mb-12" />}
              </div>
            ))}

            {hasMore && (
              <div className="mt-4 flex justify-center pb-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={isFetching}
                  className="border-[#C61418] px-8 font-semibold text-[#C61418] hover:bg-[#C61418]/10 dark:hover:bg-[#C61418]/20"
                >
                  {isFetching ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  Load more stories
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NewsFeedSection;
