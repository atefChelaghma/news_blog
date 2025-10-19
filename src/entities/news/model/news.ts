export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  author?: string;
  publishedAt: string;
}

export type NewsSource = 'newsapi' | 'guardian' | 'nytimes';
export type Category = 'general' | 'business' | 'technology' | 'sports' | 'entertainment' | 'science' | 'health';

export interface NewsFilters {
  search: string;
  sources: NewsSource[];
  categories: Category[];
  dateFrom?: string;
  dateTo?: string;
}