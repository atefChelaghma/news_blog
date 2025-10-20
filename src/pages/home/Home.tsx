import { Header } from '../../shared/components';
import { NewsFeed } from '../../widgets/news-feed';

export function Home() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <NewsFeed />
        </div>
      </main>
    </div>
  );
}
