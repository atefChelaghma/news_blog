import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoriteActions } from '../FavoriteActions';
import { Article } from '../../../../features/article-card/ui/types';
import { IconBookmark, IconHash, IconGlobe } from '@tabler/icons-react';

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  description: 'Test description',
  source: 'Test Source',
  author: 'Test Author',
  category: 'Test Category',
  publishedAt: '2024-01-01',
  imageUrl: 'test.jpg',
  url: 'https://test.com',
};

const mockFavoriteTypes = [
  { key: 'authors', icon: IconBookmark },
  { key: 'categories', icon: IconHash },
  { key: 'sources', icon: IconGlobe },
] as const;

describe('FavoriteActions', () => {
  it('renders all favorite type buttons', () => {
    const mockToggle = jest.fn();
    const favoritesMap = {
      authors: [],
      categories: [],
      sources: [],
    };

    render(
      <FavoriteActions
        article={mockArticle}
        favoriteTypes={mockFavoriteTypes}
        favoritesMap={favoritesMap}
        activeTab="feed"
        onToggleFavorite={mockToggle}
      />
    );

    expect(
      screen.getByLabelText('Toggle favorite: authors')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Toggle favorite: categories')
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Toggle favorite: sources')
    ).toBeInTheDocument();
  });

  it('applies favorited class when article is in favorites', () => {
    const mockToggle = jest.fn();
    const favoritesMap = {
      authors: [mockArticle],
      categories: [],
      sources: [],
    };

    render(
      <FavoriteActions
        article={mockArticle}
        favoriteTypes={mockFavoriteTypes}
        favoritesMap={favoritesMap}
        activeTab="feed"
        onToggleFavorite={mockToggle}
      />
    );

    const authorsBtn = screen.getByLabelText('Toggle favorite: authors');
    expect(authorsBtn).toHaveClass('article-card__action--favorited');
  });

  it('applies active-tab class when activeTab matches button type', () => {
    const mockToggle = jest.fn();
    const favoritesMap = {
      authors: [],
      categories: [],
      sources: [],
    };

    render(
      <FavoriteActions
        article={mockArticle}
        favoriteTypes={mockFavoriteTypes}
        favoritesMap={favoritesMap}
        activeTab="authors"
        onToggleFavorite={mockToggle}
      />
    );

    const authorsBtn = screen.getByLabelText('Toggle favorite: authors');
    expect(authorsBtn).toHaveClass('article-card__action--active-tab');
  });

  it('applies default class when not favorited and not active tab', () => {
    const mockToggle = jest.fn();
    const favoritesMap = {
      authors: [],
      categories: [],
      sources: [],
    };

    render(
      <FavoriteActions
        article={mockArticle}
        favoriteTypes={mockFavoriteTypes}
        favoritesMap={favoritesMap}
        activeTab="feed"
        onToggleFavorite={mockToggle}
      />
    );

    const authorsBtn = screen.getByLabelText('Toggle favorite: authors');
    expect(authorsBtn).toHaveClass('article-card__action--default');
  });

  it('calls onToggleFavorite with correct type when button is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = jest.fn();
    const favoritesMap = {
      authors: [],
      categories: [],
      sources: [],
    };

    render(
      <FavoriteActions
        article={mockArticle}
        favoriteTypes={mockFavoriteTypes}
        favoritesMap={favoritesMap}
        activeTab="feed"
        onToggleFavorite={mockToggle}
      />
    );

    const authorsBtn = screen.getByLabelText('Toggle favorite: authors');
    await user.click(authorsBtn);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith('authors', expect.any(Object));
  });

  it('prioritizes favorited class over active-tab class', () => {
    const mockToggle = jest.fn();
    const favoritesMap = {
      authors: [mockArticle],
      categories: [],
      sources: [],
    };

    render(
      <FavoriteActions
        article={mockArticle}
        favoriteTypes={mockFavoriteTypes}
        favoritesMap={favoritesMap}
        activeTab="authors"
        onToggleFavorite={mockToggle}
      />
    );

    const authorsBtn = screen.getByLabelText('Toggle favorite: authors');
    expect(authorsBtn).toHaveClass('article-card__action--favorited');
    expect(authorsBtn).not.toHaveClass('article-card__action--active-tab');
  });
});
