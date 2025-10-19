import { Bookmark, Hash, Globe } from 'lucide-react';

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
  { key: 'authors', icon: Bookmark },
  { key: 'categories', icon: Hash },
  { key: 'sources', icon: Globe },
] as const;

export interface ArticleCardSkeletonProps {
  featured?: boolean;
}
