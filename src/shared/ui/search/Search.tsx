import { useCallback, ChangeEvent, KeyboardEvent } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { SearchProps } from './types';

export const SearchInput = ({
  onSearch,
  placeholder = 'Search articles...',
  value,
  onChange,
  className = '',
  onClear,
}: SearchProps) => {
  const searchValue = value ?? '';

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleSearch = useCallback(() => {
    const q = searchValue.trim();
    if (q) onSearch?.(q);
  }, [searchValue, onSearch]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch();
    },
    [handleSearch]
  );

  const showClearButton = searchValue.length > 0;

  return (
    <div className={`search ${className}`}>
      <div className="search__container">
        <div className="search__input-wrapper">
          <button
            type="button"
            className="search__search-btn"
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            aria-label="Submit search"
          >
            <IconSearch
              className="search__icon search__icon--search"
              size={20}
            />
          </button>

          <input
            type="text"
            className="search__input"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
          />

          {showClearButton && (
            <button
              type="button"
              className="search__clear-btn"
              onClick={() => onClear?.()}
              aria-label="Clear search"
            >
              <IconX className="search__icon search__icon--clear" size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
