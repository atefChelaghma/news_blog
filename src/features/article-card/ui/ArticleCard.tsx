import { format } from 'date-fns';
import { cn } from '../../../shared/lib/utils';
import { ArticleCardProps, FAVORITE_TYPES } from './types';
import { toggleFavorite } from '../../../redux/modules/news';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { ImageWithFallback } from '../../../shared/ui/image';
import { FavoriteActions } from '../../../shared/ui/favorite-actions';

export function ArticleCard({
  article,
  featured,
  activeTab,
}: ArticleCardProps) {
  const dispatch = useAppDispatch();
  const { favoriteAuthors, favoriteCategories, favoriteSources } =
    useAppSelector(s => s.news);

  const favoritesMap = {
    authors: favoriteAuthors,
    categories: favoriteCategories,
    sources: favoriteSources,
  };

  const handleToggleFavorite = (
    type: keyof typeof favoritesMap,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    dispatch(toggleFavorite({ type, article }));
  };

  return (
    <article
      className={cn('article-card', featured && 'article-card--featured')}
    >
      <div className="article-card__media">
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.title}
          className="article-card__img"
          loading="lazy"
        />
        <FavoriteActions
          article={article}
          favoriteTypes={FAVORITE_TYPES}
          favoritesMap={favoritesMap}
          activeTab={activeTab}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-card__link"
      >
        <div className="article-card__body">
          <div className="article-card__badges">
            <span className="article-card__badge article-card__badge--category">
              {article.category}
            </span>
            <span className="article-card__badge article-card__badge--source">
              {article.source}
            </span>
          </div>

          <h2
            className={cn(
              'article-card__title',
              featured ? 'article-card__title--lg' : 'article-card__title--md'
            )}
          >
            {article.title}
          </h2>
          <div className="article-card__meta">
            <span className="article-card__author">
              <span className="article-card__avatar" />
              {article.author ?? 'Unknown'}
            </span>
            <time className="article-card__date">
              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </a>
    </article>
  );
}
