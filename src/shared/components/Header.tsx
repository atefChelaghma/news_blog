import { useState, useEffect } from 'react';
import { NavItems } from '../ui/navItem';
import { Logo } from '../ui/logo';
import { SearchInput } from '../ui/search';

import { setSearch, toggleMobileMenu } from '../../redux/features/news';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { clearSearch } from '../../redux/features/news/newsSlice';
import { IconMenu2, IconX } from '@tabler/icons-react';

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
  const { isMobileMenuOpen, isSearchOpen, filters } = useAppSelector(
    state => state.news
  );

  const { search } = filters;

  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);
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
                // onChange={value => setSearchTerm(value)}
                onClear={() => dispatch(clearSearch())}
              />
            </div>

            {/* <button
              onClick={() => dispatch(toggleSearch())}
              className="search-toggle-btn"
            >
              <Search size={24} />
            </button> */}

            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mobile-search">
            <SearchInput
              value={search}
              onChange={value => setSearchTerm(value)}
              onClear={() => dispatch(clearSearch())}
              // isMobile={true}
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <IconMenu2 />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
