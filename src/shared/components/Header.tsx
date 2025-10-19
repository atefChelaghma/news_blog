import { useState, useEffect } from 'react';
import { NavItems } from '../ui/navItem';
import { Logo } from '../ui/logo';
import { SearchInput } from '../ui/search';

import { setSearch, toggleMobileMenu } from '../../redux/features/news';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { clearSearch } from '../../redux/features/news/newsSlice';
import { IconFilter, IconMenu2, IconX } from '@tabler/icons-react';
import { NewsFeed } from '../../widgets/news-feed';
import { NewsFilters } from '../../features/news-filter';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function Header() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.news);

  const { search } = filters;

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      dispatch(setSearch(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-container">
          <div className="header-left">
            <Logo />
            <nav className="nav">
              <NavItems />
            </nav>
          </div>

          <div className="header-right">
            <div className="search-container">
              <SearchInput
                value={search}
                onChange={value => dispatch(setSearch(value))}
                onClear={() => dispatch(clearSearch())}
              />
            </div>

            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="mobile-menu-btn"
            >
              <IconFilter size={24} />
            </button>
          </div>
        </div>
        <NewsFilters />
      </div>
    </header>
  );
}

export default Header;
