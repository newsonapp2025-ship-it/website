export interface NewsCategory {
  _id: string;
  categoryName: string;
  name: string;
}

export interface NewsArticle {
  _id: string;
  article_id: string;
  title: string;
  description: string | null;
  content: string | null;
  link: string;
  image_url: string | null;
  video_url: string | null;
  language: string;
  pubDate: string;
  source_id: string;
  source_name: string;
  source_icon: string | null;
  categoryNames?: string[];
  category?: NewsCategory[];
}

export interface NewsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface WebsiteNewsResponse {
  success: boolean;
  message: string;
  pagination: NewsPagination;
  data: NewsArticle[];
}

export interface WebsiteNewsParams {
  page?: number;
  limit?: number;
  language?: string;
  search?: string;
}
