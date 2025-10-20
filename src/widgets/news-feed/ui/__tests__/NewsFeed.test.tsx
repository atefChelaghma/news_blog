import { render, screen } from '@testing-library/react';
import { NewsFeed } from '../NewsFeed';

interface Article {
  id: string;
  title: string;
  description: string | null;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  author?: string;
}

jest.mock('../../../../redux/features/news/api', () => ({
  newsApiService: {},
  guardianApiService: {},
  nytApiService: {},
  API_CONFIG: {},
}));

const mockUseAppSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('../../../../redux/store/hooks', () => ({
  useAppSelector: () => mockUseAppSelector(),
  useAppDispatch: () => mockDispatch,
}));

jest.mock('../../../../redux/features/news/newsSlice', () => ({
  fetchNews: jest.fn(() => ({ type: 'news/fetchNews' })),
}));

jest.mock('../../../../features/article-card', () => ({
  ArticleCard: ({ article }: { article: Article }) => (
    <div data-testid="article-card">{article.title}</div>
  ),
  ArticleCardSkeleton: () => <div data-testid="skeleton" />,
}));

describe('NewsFeed', () => {
  beforeEach(() => {
    mockUseAppSelector.mockReturnValue({
      articles: [],
      isLoading: false,
      error: null,
      activeTab: 'feed',
      favoriteAuthors: [],
      favoriteCategories: [],
      favoriteSources: [],
      filters: {},
    });
  });

  it('renders loading skeletons when loading', () => {
    mockUseAppSelector.mockReturnValue({
      articles: [],
      isLoading: true,
      error: null,
      activeTab: 'feed',
      favoriteAuthors: [],
      favoriteCategories: [],
      favoriteSources: [],
      filters: {},
    });

    render(<NewsFeed />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders error message when error exists', () => {
    mockUseAppSelector.mockReturnValue({
      articles: [],
      isLoading: false,
      error: 'Failed to load',
      activeTab: 'feed',
      favoriteAuthors: [],
      favoriteCategories: [],
      favoriteSources: [],
      filters: {},
    });

    render(<NewsFeed />);
    expect(screen.getByText(/error loading news articles/i)).toBeTruthy();
  });

  it('renders empty message when no articles', () => {
    mockUseAppSelector.mockReturnValue({
      articles: [],
      isLoading: false,
      error: null,
      activeTab: 'feed',
      favoriteAuthors: [],
      favoriteCategories: [],
      favoriteSources: [],
      filters: {},
    });

    render(<NewsFeed />);
    expect(screen.getByText(/no articles found/i)).toBeTruthy();
  });

  it('renders articles when available', () => {
    const articles: Article[] = [
      {
        id: '1',
        title: 'Article 1',
        description: 'Desc',
        url: 'https://example.com/1',
        source: 'newsapi',
        category: 'general',
        publishedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Article 2',
        description: 'Desc',
        url: 'https://example.com/2',
        source: 'guardian',
        category: 'business',
        publishedAt: new Date().toISOString(),
      },
    ];

    mockUseAppSelector.mockReturnValue({
      articles,
      isLoading: false,
      error: null,
      activeTab: 'feed',
      favoriteAuthors: [],
      favoriteCategories: [],
      favoriteSources: [],
      filters: {},
    });

    render(<NewsFeed />);
    expect(screen.getByText('Article 1')).toBeTruthy();
    expect(screen.getByText('Article 2')).toBeTruthy();
  });
});
