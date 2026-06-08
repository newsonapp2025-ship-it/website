import type { NewsArticle } from "@/types/news";

const PLACEHOLDER_GRADIENTS = [
  "from-red-600/40 via-rose-900/30 to-zinc-900",
  "from-orange-600/40 via-amber-900/30 to-zinc-900",
  "from-blue-600/40 via-indigo-900/30 to-zinc-900",
  "from-violet-600/40 via-purple-900/30 to-zinc-900",
];

export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function getArticleSummary(article: NewsArticle, maxLength = 160): string {
  const raw = article.description || article.content || "";
  const text = stripHtml(raw);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

export function getPlaceholderGradient(article: NewsArticle): string {
  const seed = article.article_id.charCodeAt(0) + article.article_id.charCodeAt(1);
  return PLACEHOLDER_GRADIENTS[seed % PLACEHOLDER_GRADIENTS.length];
}

export function cacheArticle(article: NewsArticle): void {
  sessionStorage.setItem(`newson_article_${article.article_id}`, JSON.stringify(article));
}

export function getCachedArticle(articleId: string): NewsArticle | null {
  try {
    const raw = sessionStorage.getItem(`newson_article_${articleId}`);
    return raw ? (JSON.parse(raw) as NewsArticle) : null;
  } catch {
    return null;
  }
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
