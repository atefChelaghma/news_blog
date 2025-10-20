import { render } from '@testing-library/react';
import { ArticleCardSkeleton } from '../ArticleCardSkeleton';

describe('ArticleCardSkeleton', () => {
  it('renders skeleton structure', () => {
    const { container } = render(<ArticleCardSkeleton />);
    const skeleton = container.querySelector('.article-card-skel');
    expect(skeleton).toBeTruthy();
  });

  it('renders media placeholder', () => {
    const { container } = render(<ArticleCardSkeleton />);
    const media = container.querySelector('.article-card-skel__media');
    expect(media).toBeTruthy();
  });

  it('renders body placeholder elements', () => {
    const { container } = render(<ArticleCardSkeleton />);
    const badges = container.querySelector('.article-card-skel__badges');
    const title = container.querySelector('.article-card-skel__title');
    const meta = container.querySelector('.article-card-skel__meta');

    expect(badges).toBeTruthy();
    expect(title).toBeTruthy();
    expect(meta).toBeTruthy();
  });

  it('renders badge placeholders', () => {
    const { container } = render(<ArticleCardSkeleton />);
    const badges = container.querySelectorAll('.article-card-skel__badge');
    expect(badges.length).toBe(2);
  });

  it('renders line placeholders', () => {
    const { container } = render(<ArticleCardSkeleton />);
    const lines = container.querySelectorAll('.article-card-skel__line');
    expect(lines.length).toBeGreaterThan(0);
  });
});
