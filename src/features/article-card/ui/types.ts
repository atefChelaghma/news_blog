import { IconBookmark, IconGlobe, IconHash } from '@tabler/icons-react';

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

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  activeTab?: 'authors' | 'categories' | 'sources';
}

export const FAVORITE_TYPES = [
  { key: 'authors', icon: IconBookmark },
  { key: 'categories', icon: IconHash },
  { key: 'sources', icon: IconGlobe },
] as const;
