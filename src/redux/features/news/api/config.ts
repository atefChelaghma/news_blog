/**
 * API Configuration and Keys
 */
export const API_KEYS = {
  newsApi: import.meta.env.VITE_NEWS_API_KEY,
  guardian: import.meta.env.VITE_GUARDIAN_API_KEY,
  nyt: import.meta.env.VITE_NYT_API_KEY,
} as const;

/**
 * API Base URLs
 */
export const API_BASE_URLS = {
  newsApi: 'https://newsapi.org/v2',
  guardian: 'https://content.guardianapis.com',
  nyt: 'https://api.nytimes.com/svc/search/v2',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  defaultPageSize: 100,
  defaultLanguage: 'en',
  defaultSortBy: 'publishedAt',
  minSearchLength: 3,
} as const;
