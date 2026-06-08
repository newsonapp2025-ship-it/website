import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ExternalLink, Loader2, Share2 } from "lucide-react";
import { useGetWebsiteNewsQuery, useLazyGetWebsiteNewsQuery } from "@/features/api/userapi";
import type { NewsArticle } from "@/types/news";
import {
  cacheArticle,
  formatRelativeTime,
  getArticleSummary,
  getCachedArticle,
  stripHtml,
} from "@/lib/news";
import { Button } from "@/components/ui/button";
import AdSense from "@/components/ads/AdSense";
import NewsCard from "@/components/news/NewsCard";
import NewsImage from "@/components/news/NewsImage";

const NewsDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const stateArticle = (location.state as { article?: NewsArticle } | null)?.article;
  const cachedArticle = articleId ? getCachedArticle(articleId) : null;
  const initialArticle = stateArticle || cachedArticle;

  const [fetchNews, { isFetching: isSearching }] = useLazyGetWebsiteNewsQuery();

  const { data: relatedData } = useGetWebsiteNewsQuery(
    { page: 1, limit: 8, language: initialArticle?.language || "tamil" },
    { skip: !initialArticle },
  );

  const related = useMemo(
    () =>
      (relatedData?.data ?? []).filter((item) => item.article_id !== articleId).slice(0, 4),
    [relatedData?.data, articleId],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [articleId]);

  useEffect(() => {
    if (initialArticle || !articleId) return;

    const findArticle = async () => {
      for (let page = 1; page <= 5; page++) {
        const result = await fetchNews({ page, limit: 20, language: "tamil" }).unwrap();
        const found = result.data.find((a) => a.article_id === articleId);
        if (found) {
          cacheArticle(found);
          navigate(`/article/${articleId}`, { replace: true, state: { article: found } });
          return;
        }
        if (page >= result.pagination.totalPages) break;
      }
    };

    findArticle();
  }, [articleId, initialArticle, fetchNews, navigate]);

  const article = initialArticle;
  const bodyText = stripHtml(article?.content || article?.description || "");
  const summary = article ? getArticleSummary(article, 280) : "";

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: article?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">
          {isSearching ? "Finding article…" : "Loading…"}
        </p>
      </div>
    );
  }

  return (
    <article className="min-h-screen pb-16 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 rounded-xl border border-white/5 bg-secondary/30 p-3">
          <AdSense className="min-h-[90px]" />
        </div>

        <div className="flex gap-8">
          <div className="min-w-0 flex-1 max-w-4xl mx-auto xl:mx-0">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/#news")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to news
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="border-white/10">
                <Share2 className="mr-1.5 h-3.5 w-3.5" />
                Share
              </Button>
              {article.link && (
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-white/10">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Original source
                  </Button>
                </a>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card">
              <NewsImage article={article} className="aspect-[21/9] w-full" iconClassName="w-16 h-16" />

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  {article.source_icon && (
                    <img
                      src={article.source_icon}
                      alt=""
                      className="h-8 w-8 rounded-full ring-2 ring-white/10"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">{article.source_name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatRelativeTime(article.pubDate)}
                    </p>
                  </div>
                  {article.categoryNames?.[0] && (
                    <span className="ml-auto rounded-full bg-primary/15 px-3 py-1 text-xs font-medium capitalize text-primary">
                      {article.categoryNames[0]}
                    </span>
                  )}
                </div>

                <h1 className="mt-6 text-2xl font-bold leading-tight text-foreground md:text-4xl">
                  {article.title}
                </h1>

                {summary && (
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{summary}</p>
                )}

                <div className="my-8 rounded-xl border border-white/5 bg-secondary/20 p-3">
                  <AdSense label={false} />
                </div>

                <div className="prose prose-invert max-w-none">
                  {bodyText.split("\n").filter(Boolean).map((paragraph, i) => (
                    <p key={i} className="mb-4 text-base leading-8 text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {article.link && (
                  <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <p className="text-sm text-muted-foreground">
                      This story is sourced from {article.source_name}. Read the full article on
                      their website.
                    </p>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Continue reading at {article.source_name}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-xl font-bold">More stories</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((item) => (
                    <NewsCard
                      key={item.article_id}
                      article={item}
                      variant="horizontal"
                      onClick={(a) => {
                        cacheArticle(a);
                        navigate(`/article/${a.article_id}`, { state: { article: a } });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </article>
  );
};

export default NewsDetail;
