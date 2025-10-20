import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from '../ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image with provided src', () => {
    render(
      <ImageWithFallback
        src="https://example.com/image.jpg"
        alt="Test Image"
        className="test-class"
      />
    );
    const img = screen.getByAltText('Test Image');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/image.jpg');
    expect(img).toHaveClass('test-class');
  });

  it('renders fallback placeholder when no src provided', () => {
    const { container } = render(
      <ImageWithFallback alt="Test Image" className="test-class" />
    );
    const placeholder = container.querySelector('.article-card__placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder?.getAttribute('aria-hidden')).toBe('true');

    const img = screen.getByAltText('Test Image');
    expect(img.getAttribute('src')).toBe('/fallback-article.png');
    expect(img).toHaveClass('article-card__img--fallback');
  });

  it('uses custom fallback src when provided', () => {
    render(
      <ImageWithFallback alt="Test Image" fallbackSrc="/custom-fallback.png" />
    );
    const img = screen.getByAltText('Test Image');
    expect(img.getAttribute('src')).toBe('/custom-fallback.png');
  });

  it('applies lazy loading by default', () => {
    render(
      <ImageWithFallback src="https://example.com/image.jpg" alt="Test" />
    );
    const img = screen.getByAltText('Test');
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('supports eager loading when specified', () => {
    render(
      <ImageWithFallback
        src="https://example.com/image.jpg"
        alt="Test"
        loading="eager"
      />
    );
    const img = screen.getByAltText('Test');
    expect(img.getAttribute('loading')).toBe('eager');
  });

  it('handles image error by switching to fallback', () => {
    render(
      <ImageWithFallback
        src="https://example.com/broken.jpg"
        alt="Test Image"
      />
    );
    const img = screen.getByAltText('Test Image') as HTMLImageElement;

    fireEvent.error(img);

    expect(img.src).toContain('fallback-article.png');
  });
});
