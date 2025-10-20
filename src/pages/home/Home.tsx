import { Header } from '../../widgets/header';
import { NewsFeed } from '../../widgets/news-feed';

export function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <NewsFeed />
      </main>
    </>
  );
}
