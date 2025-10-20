import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockToggleFavorite = jest.fn();
jest.mock('../../../../redux/features/news', () => ({
  toggleFavorite: mockToggleFavorite,
}));

const mockDispatch = jest.fn();
jest.mock('../../../../redux/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (fn: (s: { news: any }) => any) =>
    fn({
      news: {
        favoriteAuthors: [],
        favoriteCategories: [],
        favoriteSources: [],
        activeTab: 'authors',
      },
    }),
}));

import { ArticleCard } from '../ArticleCard';

const baseArticle = {
  id: '1',
  title: 'Test Article',
  description: 'Desc',
  url: 'https://example.com',
  source: 'newsapi',
  author: 'Jane Doe',
  category: 'general',
  publishedAt: new Date().toISOString(),
  imageUrl: undefined as string | undefined,
};

const renderCard = (overrides: Partial<typeof baseArticle> = {}) =>
  render(
    <ArticleCard
      article={{ ...baseArticle, ...overrides }}
      featured={false}
      activeTab="authors"
    />
  );

describe('ArticleCard', () => {
  it('renders fallback image when imageUrl missing', () => {
    renderCard();
    const fallbackImg = screen.getByAltText(/fallback/i);
    expect(fallbackImg).toBeInTheDocument();
  });

  it('renders title, badges, and date', () => {
    renderCard();
    expect(screen.getByText(/test article/i)).toBeInTheDocument();
    expect(screen.getByText(/general/i)).toBeInTheDocument();
    expect(screen.getByText(/newsapi/i)).toBeInTheDocument();
  });

  it('renders favorite action buttons', () => {
    renderCard();
    const buttons = screen.getAllByRole('button', { name: /toggle favorite/i });
    expect(buttons).toHaveLength(3);
  });

  it('displays article date formatted', () => {
    renderCard();
    expect(
      screen.getByText(new RegExp(new Date().getFullYear().toString()))
    ).toBeInTheDocument();
  });

  it('renders provided imageUrl when available', () => {
    renderCard({ imageUrl: 'https://example.com/img.jpg' });
    const img = screen.getByRole('img', { name: /test article/i });
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg');
  });

  it('falls back when image error fires', () => {
    renderCard({ imageUrl: 'https://broken-url.example/img.jpg' });
    const img = screen.getByRole('img', {
      name: /test article/i,
    }) as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toMatch(/fallback-article\.png|data:image\/svg\+xml/);
  });

  it('invokes toggleFavorite when favorite button clicked', () => {
    mockDispatch.mockClear();
    renderCard();
    const btn = screen.getAllByRole('button', {
      name: /toggle favorite/i,
    })[0];
    fireEvent.click(btn);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
