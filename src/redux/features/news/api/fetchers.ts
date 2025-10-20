import { fetchFromAPI, getBaseURL } from './http';
import { API_KEYS, API_BASE_URLS, API_CONFIG } from './config';
import {
  NewsFilters,
  NewsApiArticle,
  GuardianApiArticle,
  NYTApiArticle,
} from '../types';
import { Article } from '../../../../features/article-card/ui/types';

function buildQuery(filters: NewsFilters): string {
  return [
    filters.search,
    filters.categories[0] !== 'general' ? filters.categories[0] : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export async function fetchFromNewsApi(
  filters: NewsFilters
): Promise<Article[]> {
  const query = buildQuery(filters);
  const baseURL = getBaseURL('newsapi', API_BASE_URLS.newsApi);

  const data = (await fetchFromAPI(`${baseURL}/everything`, {
    apiKey: API_KEYS.newsApi || '',
    q: query || 'news',
    from: filters.dateFrom || '',
    to: filters.dateTo || '',
    language: API_CONFIG.defaultLanguage,
    sortBy: API_CONFIG.defaultSortBy,
    pageSize: String(API_CONFIG.defaultPageSize),
  })) as { articles: NewsApiArticle[] };

  return data.articles.map(
    (article: NewsApiArticle): Article => ({
      id: `newsapi-${article.url}`,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: 'NewsAPI',
      category: filters.categories[0],
      author: article.author,
      publishedAt: article.publishedAt,
    })
  );
}

export async function fetchFromGuardian(
  filters: NewsFilters
): Promise<Article[]> {
  const query = buildQuery(filters);
  const baseURL = getBaseURL('guardian', API_BASE_URLS.guardian);

  const data = (await fetchFromAPI(`${baseURL}/search`, {
    'api-key': API_KEYS.guardian || '',
    q: query,
    'from-date': filters.dateFrom || '',
    'to-date': filters.dateTo || '',
    'show-fields': 'all',
    'page-size': String(API_CONFIG.defaultPageSize),
  })) as {
    response: {
      results: GuardianApiArticle[];
    };
  };

  return data.response.results.map(
    (article: GuardianApiArticle): Article => ({
      id: `guardian-${article.id}`,
      title: article.webTitle,
      description: article.fields?.trailText ?? '',
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      source: 'The Guardian',
      category: filters.categories[0],
      author: article.fields?.byline,
      publishedAt: article.webPublicationDate,
    })
  );
}

export async function fetchFromNYT(filters: NewsFilters): Promise<Article[]> {
  const query = buildQuery(filters);
  const baseURL = getBaseURL('nyt', API_BASE_URLS.nyt);

  const data = (await fetchFromAPI(`${baseURL}/articlesearch.json`, {
    'api-key': API_KEYS.nyt || '',
    q: query,
    begin_date: filters.dateFrom?.replace(/-/g, '') || '',
    end_date: filters.dateTo?.replace(/-/g, '') || '',
  })) as {
    response: {
      docs: NYTApiArticle[];
    };
  };

  return data.response.docs
    .slice(0, 10)
    .map((article: NYTApiArticle): Article => {
      const imageUrl = article.multimedia?.find(item => item.url)?.url;

      return {
        id: `nyt-${article._id}`,
        title: article.headline.main,
        description: article.abstract,
        url: article.web_url,
        imageUrl: imageUrl ? `https://www.nytimes.com/${imageUrl}` : undefined,
        source: 'The New York Times',
        category: filters.categories[0],
        author: article.byline?.original,
        publishedAt: article.pub_date,
      };
    });
}

export const API_FETCHERS = {
  newsapi: fetchFromNewsApi,
  guardian: fetchFromGuardian,
  nytimes: fetchFromNYT,
} as const;
