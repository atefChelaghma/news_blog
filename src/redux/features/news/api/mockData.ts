import { Article } from '../../../../features/article-card/ui/types';

/**
 * Generate mock articles for fallback when API calls fail
 * @param source - The news source (newsapi, guardian, nytimes)
 * @param category - The news category
 * @returns Array of mock articles
 */
export function getMockArticles(source: string, category: string): Article[] {
  const mockData: Record<string, Article[]> = {
    newsapi: [
      {
        id: 'mock-newsapi-1',
        title: 'Breaking: Technology Advances Continue to Shape Modern World',
        description:
          'Latest developments in technology are transforming how we live and work in unprecedented ways.',
        url: 'https://example.com/tech-news',
        imageUrl:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
        source: 'NewsAPI',
        category,
        author: 'Tech Reporter',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'mock-newsapi-2',
        title: 'Global Markets Show Resilience Amid Economic Uncertainty',
        description:
          'Financial markets continue to demonstrate stability despite ongoing global challenges.',
        url: 'https://example.com/finance-news',
        imageUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
        source: 'NewsAPI',
        category,
        author: 'Financial Analyst',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    guardian: [
      {
        id: 'mock-guardian-1',
        title: 'Environmental Initiatives Gain Momentum Worldwide',
        description:
          'Countries around the globe are implementing new policies to address climate change challenges.',
        url: 'https://example.com/environment-news',
        imageUrl:
          'https://images.unsplash.com/photo-1569163139382-de56a4d3154a?w=800',
        source: 'The Guardian',
        category,
        author: 'Environmental Correspondent',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ],
    nytimes: [
      {
        id: 'mock-nyt-1',
        title: 'Cultural Trends Reshape Modern Society',
        description:
          'New cultural movements are influencing art, entertainment, and social interactions across demographics.',
        url: 'https://example.com/culture-news',
        imageUrl:
          'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800',
        source: 'The New York Times',
        category,
        author: 'Culture Editor',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
      },
    ],
  };

  return mockData[source] || [];
}
