// UI Components
export { ArticleCard } from './ui/ArticleCard';
export { ArticleCardSkeleton } from './ui/ArticleCardSkeleton';
export type { Article, NewsFilters, NewsSource, Category } from './model/news';
export {
  fetchNews,
  setSearch,
  toggleSource,
  toggleCategory,
  setDateRange,
  resetFilters,
  setActiveTab,
  toggleFavorite,
  toggleMobileMenu,
  toggleSearch,
} from './model/newsSlice';
export { default as newsReducer } from './model/newsSlice';
