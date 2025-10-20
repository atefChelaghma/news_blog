export function ArticleCardSkeleton() {
  return (
    <div className="article-card-skel">
      <div className="article-card-skel__media" />

      <div className="article-card-skel__body">
        <div className="article-card-skel__badges">
          <span className="article-card-skel__badge" />
          <span className="article-card-skel__badge" />
        </div>

        <div className="article-card-skel__title" />

        <div className="article-card-skel__line article-card-skel__line--full" />
        <div className="article-card-skel__line article-card-skel__line--md" />

        <div className="article-card-skel__meta">
          <div className="article-card-skel__author">
            <span className="article-card-skel__avatar" />
            <span className="article-card-skel__line article-card-skel__line--sm" />
          </div>
          <div className="article-card-skel__line article-card-skel__line--date" />
        </div>
      </div>
    </div>
  );
}
