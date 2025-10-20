import { cn } from '../../lib/utils';
import { Article } from '../../../features/article-card/ui/types';

interface FavoriteType {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FavoriteActionsProps {
  article: Article;
  favoriteTypes: readonly FavoriteType[];
  favoritesMap: {
    authors: Article[];
    categories: Article[];
    sources: Article[];
  };
  activeTab?: string;
  onToggleFavorite: (
    type: keyof FavoriteActionsProps['favoritesMap'],
    e: React.MouseEvent
  ) => void;
}

export function FavoriteActions({
  article,
  favoriteTypes,
  favoritesMap,
  activeTab,
  onToggleFavorite,
}: FavoriteActionsProps) {
  const isFavorite = (type: keyof typeof favoritesMap) =>
    favoritesMap[type].some((it: Article) => it.id === article.id);

  const getFavBtnClass = (type: keyof typeof favoritesMap, isFav: boolean) =>
    cn(
      'article-card__action',
      isFav
        ? 'article-card__action--favorited'
        : activeTab === type
          ? 'article-card__action--active-tab'
          : 'article-card__action--default'
    );

  return (
    <div className="article-card__actions">
      {favoriteTypes.map(({ key, icon: Icon }) => (
        <button
          key={key}
          className={getFavBtnClass(
            key as keyof typeof favoritesMap,
            isFavorite(key as keyof typeof favoritesMap)
          )}
          onClick={e => onToggleFavorite(key as keyof typeof favoritesMap, e)}
          aria-label={`Toggle favorite: ${key}`}
        >
          <Icon className="article-card__action-icon" />
        </button>
      ))}
    </div>
  );
}
