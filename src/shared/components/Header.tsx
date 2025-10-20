import { useEffect } from 'react';
import { NavItems } from '../ui/navItem';
import { Logo } from '../ui/logo';
import { SearchInput } from '../ui/search';
import { useDebounce } from '../hooks';

import { setSearch } from '../../redux/features/news';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { clearSearch, fetchNews } from '../../redux/features/news/newsSlice';
import { NewsFilters } from '../../features/news-filter';

export function Header() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.news);
  const { search } = filters;

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    const q = debouncedSearchTerm.trim();

    if (q === '' || q.length >= 3) {
      dispatch(fetchNews({ ...filters, search: q }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, dispatch]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-container">
          <div className="header-left">
            <Logo />
            <SearchInput
              value={search}
              onChange={value => dispatch(setSearch(value))}
              onClear={() => dispatch(clearSearch())}
            />
          </div>

          <div className="header-right">
            <div className="search-container">
              <nav className="nav">
                <NavItems />
              </nav>
            </div>
          </div>
        </div>
        <NewsFilters />
      </div>
    </header>
  );
}

export default Header;
