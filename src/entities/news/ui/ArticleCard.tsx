import { format } from 'date-fns';
import { Bookmark, Hash, Globe } from 'lucide-react';
import { Article } from '../model/news';
import { cn } from '../../../lib/utils';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { toggleFavorite } from '../model/newsSlice';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  activeTab?: 'authors' | 'categories' | 'sources';
}

const FAVORITE_TYPES = [
  { key: 'authors', icon: Bookmark },
  { key: 'categories', icon: Hash },
  { key: 'sources', icon: Globe },
];

export function ArticleCard({
  article,
  featured,
  activeTab,
}: ArticleCardProps) {
  const dispatch = useAppDispatch();
  const { favoriteAuthors, favoriteCategories, favoriteSources } =
    useAppSelector(state => state.news);

  const favoritesMap = {
    authors: favoriteAuthors,
    categories: favoriteCategories,
    sources: favoriteSources,
  };

  const isFavorite = (type: keyof typeof favoritesMap) => {
    return favoritesMap[type].some((item: Article) => item.id === article.id);
  };

  const handleToggleFavorite = (
    type: keyof typeof favoritesMap,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    dispatch(toggleFavorite({ type, article }));
  };

  const getButtonClass = (type: keyof typeof favoritesMap, isFav: boolean) => {
    const isActiveTab = activeTab === type;
    if (isFav) return 'favorite-button favorite-button--favorited';
    if (isActiveTab) return 'favorite-button favorite-button--active-tab';
    return 'favorite-button favorite-button--default';
  };

  return (
    <article
      className={cn('article-card', featured ? 'article-card--featured' : '')}
    >
      <div className="favorite-buttons">
        {FAVORITE_TYPES.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={e =>
              handleToggleFavorite(key as keyof typeof favoritesMap, e)
            }
            className={getButtonClass(
              key as keyof typeof favoritesMap,
              isFavorite(key as keyof typeof favoritesMap)
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        <div className="article-image">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} />
          ) : (
            <div className="placeholder" />
          )}
          <div className="gradient-overlay" />
        </div>

        <div className="article-content">
          <div className="metadata">
            <span className="category-badge">{article.category}</span>
            <span className="source">{article.source}</span>
          </div>

          <h2
            className={cn(
              'article-title',
              featured ? 'article-title--featured' : 'article-title--normal'
            )}
          >
            {article.title}
          </h2>

          {featured && (
            <p className="article-description">{article.description}</p>
          )}

          <div className="article-meta">
            {article.author && (
              <span className="author">
                <span className="author-avatar" />
                {article.author}
              </span>
            )}
            <time>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</time>
          </div>
        </div>
      </a>
    </article>
  );
}
