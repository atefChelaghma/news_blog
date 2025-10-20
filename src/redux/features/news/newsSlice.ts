import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  STORAGE_KEYS,
  TABS,
  TabType,
  FavoriteType,
  NewsState,
  NewsFilters,
  NewsSource,
  Category,
} from './types';
import { Article } from '../../../features/article-card/ui/types';
import { API_FETCHERS, getMockArticles } from './api';

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

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (filters: NewsFilters, { rejectWithValue }) => {
    try {
      const promises = filters.sources
        .filter(source => API_FETCHERS[source as keyof typeof API_FETCHERS])
        .map(async source => {
          try {
            const fetcher = API_FETCHERS[source as keyof typeof API_FETCHERS];
            return await fetcher(filters);
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
