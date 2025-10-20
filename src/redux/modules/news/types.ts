import { Article } from '../../../features/article-card';

export type NewsSource = 'newsapi' | 'guardian' | 'nytimes';
export type Category =
  | 'general'
  | 'business'
  | 'technology'
  | 'sports'
  | 'entertainment'
  | 'science'
  | 'health';

export interface NewsFilters {
  search: string;
  sources: NewsSource[];
  categories: Category[];
  dateFrom?: string;
  dateTo?: string;
}

export const STORAGE_KEYS = {
  AUTHORS: 'favoriteAuthors',
  CATEGORIES: 'favoriteCategories',
  SOURCES: 'favoriteSources',
} as const;

export const TABS = {
  FEED: 'feed',
  AUTHORS: 'authors',
  CATEGORIES: 'categories',
  SOURCES: 'sources',
} as const;

export type TabType = (typeof TABS)[keyof typeof TABS];
export type FavoriteType = 'authors' | 'categories' | 'sources';

export interface NewsState {
  filters: NewsFilters;
  activeTab: TabType;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  favoriteAuthors: Article[];
  favoriteCategories: Article[];
  favoriteSources: Article[];
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}

export type NewsApiArticle = {
  url: string;
  title: string;
  description: string;
  urlToImage?: string;
  author?: string;
  publishedAt: string;
};

export type GuardianApiArticle = {
  id: string;
  webTitle: string;
  fields?: {
    trailText?: string;
    thumbnail?: string;
    byline?: string;
  };
  webUrl: string;
  webPublicationDate: string;
};

export type NYTApiArticle = {
  _id: string;
  headline: { main: string };
  abstract: string;
  web_url: string;
  multimedia?: {
    caption: string;
    credit: string;
    default: {
      url: string;
      height: number;
      width: number;
    };
  };
  byline?: { original?: string };
  pub_date: string;
};
