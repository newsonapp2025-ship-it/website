import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Loader2, Newspaper, RefreshCw } from "lucide-react";
import { useGetWebsiteNewsQuery } from "@/features/api/userapi";
import type { NewsArticle } from "@/types/news";
import { useLanguage } from "@/context/LanguageContext";
import { cacheArticle } from "@/lib/news";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import AdSense from "@/components/ads/AdSense";
import NewsCard from "./NewsCard";

const NewsFeedSection = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const { data, isLoading, isFetching, refetch } = useGetWebsiteNewsQuery({
    page,
    limit: 20,
    language,
  });

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [language]);

  useEffect(() => {
    if (!data?.data) return;

    setArticles((prev) => {
      if (page === 1) return data.data;

      const ids = new Set(prev.map((a) => a.article_id));
      const next = data.data.filter((a) => !ids.has(a.article_id));
      return next.length ? [...prev, ...next] : prev;
    });
  }, [data, page]);

  const handleLoadMore = () => setPage((p) => p + 1);

  const openArticle = useCallback(
    (article: NewsArticle) => {
      cacheArticle(article);
      navigate(`/article/${article.article_id}`, { state: { article } });
    },
    [navigate],
  );

  const featured = articles[0];
  const secondary = articles.slice(1, 4);
  const rest = articles.slice(4);
  const hasMore = data?.pagination ? page < data.pagination.totalPages : false;

  return (
    <section id="news" className="relative scroll-mt-24 bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 flex justify-center rounded-xl border border-border bg-secondary/30 p-3">
          <AdSense
            format="horizontal"
            className="w-full max-w-[970px]"
            style={{ minHeight: 90, minWidth: 320 }}
          />
        </div>

        <div className="flex gap-6 xl:gap-8">
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-primary"
                >
                  <Newspaper className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Live Feed
                  </span>
                </motion.div>
                <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
                  Latest News & Stories
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Curated headlines in your language — tap any story to read more
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <LanguageSelector
                  variant="pills"
                  className="md:hidden"
                />
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPage(1);
                      setArticles([]);
                      refetch();
                    }}
                    disabled={isFetching}
                    className="border-border"
                  >
                    <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            {isLoading && page === 1 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">Loading latest news…</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border py-20 text-center">
                <Newspaper className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 font-medium">No news found</p>
                <p className="text-sm text-muted-foreground">Try another language or refresh</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
                  {featured && (
                    <div className="lg:col-span-7">
                      <NewsCard
                        article={featured}
                        variant="featured"
                        onClick={openArticle}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-4 lg:col-span-5">
                    {secondary.map((article) => (
                      <NewsCard
                        key={article.article_id}
                        article={article}
                        variant="horizontal"
                        onClick={openArticle}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <NewsCard key={article.article_id} article={article} onClick={openArticle} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLoadMore}
                      disabled={isFetching}
                      className="border-border px-8"
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

          <aside className="hidden shrink-0 xl:block xl:w-[300px]">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5">
                <h3 className="text-lg font-bold text-foreground">Listen on NewsOn</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Get the same stories as audio — headlines first, then the full report.
                </p>
                <Button
                  variant="hero"
                  className="mt-4 w-full"
                  onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Try audio news
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default NewsFeedSection;
