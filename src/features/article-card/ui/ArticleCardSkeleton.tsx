import { cn } from '../../../lib/utils';
import { ArticleCardSkeletonProps } from './types';

export function ArticleCardSkeleton({ featured }: ArticleCardSkeletonProps) {
  return (
    <div className={cn('skeleton', featured ? 'skeleton--featured' : '')}>
      <div className="skeleton-content">
        <div className="skeleton-image" />

        <div className="skeleton-text">
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-line skeleton-line--medium" />

          <div
            className={cn(
              'skeleton-title',
              featured ? 'skeleton-title--featured' : ''
            )}
          />

          {featured && (
            <>
              <div className="skeleton-line skeleton-line--full" />
              <div className="skeleton-line skeleton-line--medium" />
            </>
          )}

          <div className="skeleton-meta">
            <div className="skeleton-meta-item" />
            <div className="skeleton-meta-item" />
          </div>
        </div>
      </div>
    </div>
  );
}
