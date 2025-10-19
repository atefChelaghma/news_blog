import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { fetchNews } from '../../../entities/news';
import { ArticleCard } from '../../../entities/news/ui/ArticleCard';
import { ArticleCardSkeleton } from '../../../entities/news/ui/ArticleCardSkeleton';

export function NewsFeed() {
  const dispatch = useAppDispatch();
  const {
    filters,
    activeTab,
    favoriteAuthors,
    favoriteCategories,
    favoriteSources,
    articles,
    isLoading,
    error,
  } = useAppSelector(state => state.news);

  useEffect(() => {
    if (activeTab === 'feed') {
      dispatch(fetchNews(filters));
    }
  }, [dispatch, filters, activeTab]);

  if (activeTab !== 'feed') {
    const favoritesMap = {
      authors: favoriteAuthors,
      categories: favoriteCategories,
      sources: favoriteSources,
    };

    const favorites = favoritesMap[activeTab as keyof typeof favoritesMap];

    if (!favorites?.length) {
      return (
        <div className="feed-message feed-message--empty">
          <p>No favorite {activeTab} yet.</p>
        </div>
      );
    }

    return (
      <div className="news-feed">
        {favorites.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            activeTab={activeTab as 'authors' | 'categories' | 'sources'}
          />
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="news-feed">
        <ArticleCardSkeleton featured />
        {[...Array(5)].map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-message feed-message--error">
        <p>Error loading news articles. Please try again later.</p>
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="feed-message feed-message--empty">
        <p>No articles found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="news-feed">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          featured={index === 0}
        />
      ))}
    </div>
  );
}
