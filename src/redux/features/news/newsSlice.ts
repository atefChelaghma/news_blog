import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  STORAGE_KEYS,
  TABS,
  TabType,
  FavoriteType,
  NewsState,
  NewsApiArticle,
  GuardianApiArticle,
  NYTApiArticle,
  NewsFilters,
  NewsSource,
  Category,
} from './types';
import { Article } from '../../../features/article-card/ui/types';

const initialFilters: NewsFilters = {
  search: '',
  sources: ['newsapi', 'guardian', 'nytimes'],
  categories: ['general'],
  dateFrom: undefined,
  dateTo: undefined,
};

const loadFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const saveToStorage = (key: string, data: Article[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// API configuration
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const isDev = import.meta.env.DEV;

const getBaseURL = (service: string, originalURL: string) => {
  if (isDev) {
    return `/api/${service}`;
  }
  return originalURL;
};

// API helper functions using fetch
async function fetchFromAPI(
  url: string,
  params: Record<string, string>
): Promise<unknown> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });

  const fullUrl = `${url}?${searchParams.toString()}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function fetchFromNewsApi(filters: NewsFilters): Promise<Article[]> {
  const query = [
    filters.search,
    filters.categories[0] !== 'general' ? filters.categories[0] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const baseURL = getBaseURL('newsapi', 'https://newsapi.org/v2');
  const data = (await fetchFromAPI(`${baseURL}/everything`, {
    apiKey: NEWS_API_KEY || '',
    q: query || 'news',
    from: filters.dateFrom || '',
    to: filters.dateTo || '',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: '100',
  })) as { articles: NewsApiArticle[] };

  return data.articles.map(
    (article: NewsApiArticle): Article => ({
      id: `newsapi-${article.url}`,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: 'NewsAPI',
      category: filters.categories[0],
      author: article.author,
      publishedAt: article.publishedAt,
    })
  );
}

async function fetchFromGuardian(filters: NewsFilters): Promise<Article[]> {
  const query = [
    filters.search,
    filters.categories[0] !== 'general' ? filters.categories[0] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const baseURL = getBaseURL('guardian', 'https://content.guardianapis.com');
  const data = (await fetchFromAPI(`${baseURL}/search`, {
    'api-key': GUARDIAN_API_KEY || '',
    q: query,
    'from-date': filters.dateFrom || '',
    'to-date': filters.dateTo || '',
    'show-fields': 'all',
    'page-size': '100',
  })) as {
    response: {
      results: GuardianApiArticle[];
    };
  };

  return data.response.results.map(
    (article: GuardianApiArticle): Article => ({
      id: `guardian-${article.id}`,
      title: article.webTitle,
      description: article.fields?.trailText ?? '',
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      source: 'The Guardian',
      category: filters.categories[0],
      author: article.fields?.byline,
      publishedAt: article.webPublicationDate,
    })
  );
}

async function fetchFromNYT(filters: NewsFilters): Promise<Article[]> {
  const query = [
    filters.search,
    filters.categories[0] !== 'general' ? filters.categories[0] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const baseURL = getBaseURL('nyt', 'https://api.nytimes.com/svc/search/v2');
  const data = (await fetchFromAPI(`${baseURL}/articlesearch.json`, {
    'api-key': NYT_API_KEY || '',
    q: query,
    begin_date: filters.dateFrom?.replace(/-/g, '') || '',
    end_date: filters.dateTo?.replace(/-/g, '') || '',
  })) as {
    response: {
      docs: NYTApiArticle[];
    };
  };

  return data.response.docs.slice(0, 10).map(
    (article: NYTApiArticle): Article => ({
      id: `nyt-${article._id}`,
      title: article.headline.main,
      description: article.abstract,
      url: article.web_url,
      imageUrl: article.multimedia[0]?.url
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : undefined,
      source: 'The New York Times',
      category: filters.categories[0],
      author: article.byline?.original,
      publishedAt: article.pub_date,
    })
  );
}

// Mock data for fallback
function getMockArticles(source: string, category: string): Article[] {
  const mockData: Record<string, Article[]> = {
    newsapi: [
      {
        id: 'mock-newsapi-1',
        title: 'Breaking: Technology Advances Continue to Shape Modern World',
        description:
          'Latest developments in technology are transforming how we live and work in unprecedented ways.',
        url: 'https://example.com/tech-news',
        imageUrl:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
        source: 'NewsAPI',
        category,
        author: 'Tech Reporter',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'mock-newsapi-2',
        title: 'Global Markets Show Resilience Amid Economic Uncertainty',
        description:
          'Financial markets continue to demonstrate stability despite ongoing global challenges.',
        url: 'https://example.com/finance-news',
        imageUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
        source: 'NewsAPI',
        category,
        author: 'Financial Analyst',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    guardian: [
      {
        id: 'mock-guardian-1',
        title: 'Environmental Initiatives Gain Momentum Worldwide',
        description:
          'Countries around the globe are implementing new policies to address climate change challenges.',
        url: 'https://example.com/environment-news',
        imageUrl:
          'https://images.unsplash.com/photo-1569163139382-de56a4d3154a?w=800',
        source: 'The Guardian',
        category,
        author: 'Environmental Correspondent',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ],
    nytimes: [
      {
        id: 'mock-nyt-1',
        title: 'Cultural Trends Reshape Modern Society',
        description:
          'New cultural movements are influencing art, entertainment, and social interactions across demographics.',
        url: 'https://example.com/culture-news',
        imageUrl:
          'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800',
        source: 'The New York Times',
        category,
        author: 'Culture Editor',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
      },
    ],
  };

  return mockData[source] || [];
}

// Async thunk for fetching news
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (filters: NewsFilters, { rejectWithValue }) => {
    try {
      const fetchers: Record<
        string,
        (filters: NewsFilters) => Promise<Article[]>
      > = {
        newsapi: fetchFromNewsApi,
        guardian: fetchFromGuardian,
        nytimes: fetchFromNYT,
      };

      const promises = filters.sources
        .filter(source => fetchers[source])
        .map(async source => {
          try {
            return await fetchers[source](filters);
          } catch (error) {
            console.warn(`Failed to fetch from ${source}:`, error);
            return getMockArticles(source, filters.categories[0]);
          }
        });

      const results = await Promise.all(promises);
      return results.flat();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch news'
      );
    }
  },
  {
    condition: filters => {
      const q = (filters.search ?? '').trim();
      return q === '' || q.length >= 3;
    },
  }
);

const initialState: NewsState = {
  filters: initialFilters,
  activeTab: TABS.FEED,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  favoriteAuthors: loadFromStorage<Article>(STORAGE_KEYS.AUTHORS),
  favoriteCategories: loadFromStorage<Article>(STORAGE_KEYS.CATEGORIES),
  favoriteSources: loadFromStorage<Article>(STORAGE_KEYS.SOURCES),
  articles: [],
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearSearch: state => {
      state.filters.search = '';
    },
    toggleSource: (state, action: PayloadAction<NewsSource>) => {
      state.filters.sources = [action.payload];
    },
    toggleCategory: (state, action: PayloadAction<Category>) => {
      state.filters.categories = [action.payload];
    },
    setDateRange: (
      state,
      action: PayloadAction<{ from?: string; to?: string }>
    ) => {
      state.filters.dateFrom = action.payload.from;
      state.filters.dateTo = action.payload.to;
    },
    resetFilters: state => {
      state.filters = initialFilters;
    },
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
    toggleFavorite: (
      state,
      action: PayloadAction<{ type: FavoriteType; article: Article }>
    ) => {
      const { type, article } = action.payload;
      const favoriteKey =
        `favorite${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof NewsState;
      const favorites = state[favoriteKey] as Article[];

      const existingIndex = favorites.findIndex(a => a.id === article.id);
      if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
      } else {
        favorites.push(article);
      }

      const storageKey =
        STORAGE_KEYS[type.toUpperCase() as keyof typeof STORAGE_KEYS];
      saveToStorage(storageKey, favorites);
    },
    toggleMobileMenu: state => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleSearch: state => {
      state.isSearchOpen = !state.isSearchOpen;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch news';
        state.articles = [];
      });
  },
});

export const {
  setSearch,
  clearSearch,
  toggleSource,
  toggleCategory,
  setDateRange,
  resetFilters,
  setActiveTab,
  toggleFavorite,
  toggleMobileMenu,
  toggleSearch,
} = newsSlice.actions;

export default newsSlice.reducer;
