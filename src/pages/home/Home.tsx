import { Header } from '../../shared/components';
import { NewsFilters } from '../../features/news-filter';
import { NewsFeed } from '../../widgets/news-feed';

export function Home() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <NewsFilters />
          <NewsFeed />
        </div>
      </main>
    </div>
  );
}
