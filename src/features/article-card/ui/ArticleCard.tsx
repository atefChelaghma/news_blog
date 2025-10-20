import { format } from 'date-fns';
import { cn } from '../../../shared/lib/utils';
import { Article, ArticleCardProps, FAVORITE_TYPES } from './types';
import { toggleFavorite } from '../../../redux/modules/news';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';

export function ArticleCard({
  article,
  featured,
  activeTab,
}: ArticleCardProps) {
  const FALLBACK_IMG = '/fallback-article.png';
  const INLINE_SVG_FALLBACK =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial,sans-serif" font-size="24">No Image</text></svg>';

  function handleImgError(img: HTMLImageElement) {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';
    img.src = FALLBACK_IMG;
    setTimeout(() => {
      if (!img.complete || img.naturalWidth === 0) {
        img.src = INLINE_SVG_FALLBACK;
      }
    }, 100);
  }
  const dispatch = useAppDispatch();
  const { favoriteAuthors, favoriteCategories, favoriteSources } =
    useAppSelector(s => s.news);

  const favoritesMap = {
    authors: favoriteAuthors,
    categories: favoriteCategories,
    sources: favoriteSources,
  };

  const isFavorite = (type: keyof typeof favoritesMap) =>
    favoritesMap[type].some((it: Article) => it.id === article.id);

  const handleToggleFavorite = (
    type: keyof typeof favoritesMap,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    dispatch(toggleFavorite({ type, article }));
  };

  const favBtnClass = (type: keyof typeof favoritesMap, isFav: boolean) =>
    cn(
      'article-card__action',
      isFav
        ? 'article-card__action--favorited'
        : activeTab === type
          ? 'article-card__action--active-tab'
          : 'article-card__action--default'
    );

  return (
    <article
      className={cn('article-card', featured && 'article-card--featured')}
    >
      <div className="article-card__media">
        {article.imageUrl ? (
          <img
            className="article-card__img"
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            onError={e => handleImgError(e.currentTarget)}
          />
        ) : (
          <div className="article-card__placeholder" aria-hidden>
            <img
              className="article-card__img article-card__img--fallback"
              src={FALLBACK_IMG}
              alt="Fallback"
              loading="lazy"
              onError={e => handleImgError(e.currentTarget)}
            />
          </div>
        )}
        <div className="article-card__actions">
          {FAVORITE_TYPES.map(({ key, icon: Icon }) => (
            <button
              key={key}
              className={favBtnClass(
                key as keyof typeof favoritesMap,
                isFavorite(key as keyof typeof favoritesMap)
              )}
              onClick={e =>
                handleToggleFavorite(key as keyof typeof favoritesMap, e)
              }
              aria-label={`Toggle favorite: ${key}`}
            >
              <Icon className="article-card__action-icon" />
            </button>
          ))}
        </div>
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
