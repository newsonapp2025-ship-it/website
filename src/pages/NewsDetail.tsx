import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ExternalLink, Loader2, Share2 } from "lucide-react";
import {
  useGetWebsiteNewsQuery,
  useLazyGetWebsiteNewsByIdQuery,
  useLazyGetWebsiteNewsQuery,
} from "@/features/api/userapi";
import type { NewsArticle } from "@/types/news";
import { NEWS_LANGUAGES } from "@/config/languages";
import { useLanguage } from "@/context/LanguageContext";
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

type LoadStatus = "loading" | "ready" | "not_found" | "error";

const NewsDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { language: preferredLanguage } = useLanguage();

  const stateArticle = (location.state as { article?: NewsArticle } | null)?.article;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [fetchNewsById] = useLazyGetWebsiteNewsByIdQuery();
  const [fetchNews] = useLazyGetWebsiteNewsQuery();

  const { data: relatedData } = useGetWebsiteNewsQuery(
    { page: 1, limit: 8, language: article?.language || preferredLanguage },
    { skip: !article },
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
    if (!articleId) {
      setArticle(null);
      setLoadStatus("not_found");
      return;
    }

    let cancelled = false;

    const resolveArticle = async () => {
      setLoadStatus("loading");
      setErrorMessage(null);

      // A. Router state from in-app navigation
      if (stateArticle && stateArticle.article_id === articleId) {
        cacheArticle(stateArticle);
        if (!cancelled) {
          setArticle(stateArticle);
          setLoadStatus("ready");
        }
        return;
      }

      // B. sessionStorage cache
      const cached = getCachedArticle(articleId);
      if (cached) {
        if (!cancelled) {
          setArticle(cached);
          setLoadStatus("ready");
        }
        return;
      }

      // C. Public get-by-id endpoint
      try {
        const byId = await fetchNewsById(articleId).unwrap();
        if (cancelled) return;
        cacheArticle(byId);
        setArticle(byId);
        setLoadStatus("ready");
        navigate(`/article/${articleId}`, { replace: true, state: { article: byId } });
        return;
      } catch {
        // Continue to legacy list scan (backend may still gate by-id on audio)
      }

      // Legacy fallback: scan recent list pages so cold loads keep working
      try {
        const searchLanguages = [
          preferredLanguage,
          ...NEWS_LANGUAGES.map((lang) => lang.id).filter((id) => id !== preferredLanguage),
        ];

        for (const lang of searchLanguages) {
          for (let page = 1; page <= 5; page++) {
            const result = await fetchNews({ page, limit: 20, language: lang }).unwrap();
            if (cancelled) return;
            const found = result.data.find((a) => a.article_id === articleId);
            if (found) {
              cacheArticle(found);
              setArticle(found);
              setLoadStatus("ready");
              navigate(`/article/${articleId}`, { replace: true, state: { article: found } });
              return;
            }
            if (page >= result.pagination.totalPages) break;
          }
        }

        if (!cancelled) {
          setArticle(null);
          setLoadStatus("not_found");
        }
      } catch (err) {
        if (cancelled) return;
        setArticle(null);
        setLoadStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Failed to load article");
      }
    };

    void resolveArticle();

    return () => {
      cancelled = true;
    };
  }, [articleId, stateArticle, fetchNewsById, fetchNews, navigate, preferredLanguage]);

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

  if (loadStatus === "loading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading article…</p>
      </div>
    );
  }

  if (loadStatus === "not_found" || !article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          This story may have been removed or the link is no longer valid.
        </p>
        <Button asChild variant="outline" className="mt-6 border-border">
          <Link to="/#news">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to news
          </Link>
        </Button>
      </div>
    );
  }

  if (loadStatus === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <h1 className="text-2xl font-bold text-foreground">Unable to load article</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {errorMessage || "Something went wrong while fetching this story. Please try again."}
        </p>
        <Button asChild variant="outline" className="mt-6 border-border">
          <Link to="/#news">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to news
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="min-h-screen pb-16 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-3">
          <AdSense className="min-h-[90px]" />
        </div>

        <div className="flex gap-8">
          <div className="min-w-0 mx-auto max-w-4xl flex-1 xl:mx-0">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link to="/#news">
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back to news
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="border-border">
                <Share2 className="mr-1.5 h-3.5 w-3.5" />
                Share
              </Button>
              {article.link && (
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-border">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Original source
                  </Button>
                </a>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
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

                <div className="my-8 rounded-xl border border-border bg-secondary/20 p-3">
                  <AdSense label={false} />
                </div>

                <div className="prose dark:prose-invert max-w-none">
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
                      onNavigate={(a) => cacheArticle(a)}
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
