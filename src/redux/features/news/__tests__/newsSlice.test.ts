jest.mock('../api', () => ({
  API_FETCHERS: {},
  getMockArticles: () => [],
}));
import reducer, {
  setSearch,
  clearSearch,
  toggleSource,
  toggleCategory,
  setDateRange,
  resetFilters,
  setActiveTab,
  toggleFavorite,
} from '../newsSlice';
import { TABS } from '../types';

const baseArticle = {
  id: '1',
  title: 'A',
  url: 'https://example.com',
  source: 'newsapi',
  author: 'Jane',
  category: 'general',
  publishedAt: new Date().toISOString(),
  imageUrl: undefined,
  description: 'Desc',
};

describe('newsSlice reducers', () => {
  it('sets and clears search', () => {
    let state = reducer(undefined, setSearch('hello'));
    expect(state.filters.search).toBe('hello');
    state = reducer(state, clearSearch());
    expect(state.filters.search).toBe('');
  });

  it('toggles source', () => {
    const state = reducer(undefined, toggleSource('guardian'));
    expect(state.filters.sources).toEqual(['guardian']);
  });

  it('toggles category', () => {
    const state = reducer(undefined, toggleCategory('business'));
    expect(state.filters.categories).toEqual(['business']);
  });

  it('sets date range', () => {
    const state = reducer(
      undefined,
      setDateRange({ from: '2025-01-01', to: '2025-01-31' })
    );
    expect(state.filters.dateFrom).toBe('2025-01-01');
    expect(state.filters.dateTo).toBe('2025-01-31');
  });

  it('resets filters', () => {
    let state = reducer(undefined, setSearch('x'));
    state = reducer(state, resetFilters());
    expect(state.filters.search).toBe('');
    expect(state.filters.categories).toEqual(['general']);
  });

  it('sets active tab', () => {
    const state = reducer(undefined, setActiveTab(TABS.SOURCES));
    expect(state.activeTab).toBe(TABS.SOURCES);
  });

  it('toggles favorite add/remove', () => {
    let state = reducer(
      undefined,
      toggleFavorite({ type: 'authors', article: baseArticle })
    );
    expect(state.favoriteAuthors.length).toBe(1);
    state = reducer(
      state,
      toggleFavorite({ type: 'authors', article: baseArticle })
    );
    expect(state.favoriteAuthors.length).toBe(0);
  });
});
