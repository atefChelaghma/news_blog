import { Button } from '../../../shared/ui/button/Button';
import { Select } from '../../../shared/ui/select/Select';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { useRef, useEffect, useState } from 'react';
import { Category, NewsSource } from '../../../redux/features/news/types';
import {
  resetFilters,
  setDateRange,
  toggleCategory,
  toggleSource,
} from '../../../redux/features/news';
import { IconX } from '@tabler/icons-react';

const sources: { id: NewsSource; label: string }[] = [
  { id: 'newsapi', label: 'NewsAPI' },
  { id: 'guardian', label: 'The Guardian' },
  { id: 'nytimes', label: 'The New York Times' },
];

const categories: { id: Category; label: string }[] = [
  { id: 'general', label: 'All Categories' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
];

export function NewsFilters() {
  const dispatch = useAppDispatch();
  const { filters, activeTab } = useAppSelector(state => state.news);
  const dateFromRef = useRef<HTMLInputElement | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const iOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);
  }, []);

  const openDateFromPicker = () => {
    const el = dateFromRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      el.focus();
    }
  };

  if (activeTab !== 'feed') {
    return null;
  }

  return (
    <div className="news-filters">
      <div className="filters-container">
        <Select
          value={filters.categories[0]}
          onChange={e => dispatch(toggleCategory(e.target.value as Category))}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Select>

        <Select
          value={filters.sources[0]}
          onChange={e => dispatch(toggleSource(e.target.value as NewsSource))}
        >
          {sources.map(source => (
            <option key={source.id} value={source.id}>
              {source.label}
            </option>
          ))}
        </Select>

        <div
          className={`date-input-wrapper${isIOS ? ' date-input-wrapper--ios' : ''}`}
          onClick={openDateFromPicker}
          role="button"
          aria-label="Select start date"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openDateFromPicker();
            }
          }}
        >
          {isIOS && !filters.dateFrom && (
            <span className="date-input-placeholder">From date</span>
          )}
          <input
            ref={dateFromRef}
            type="date"
            value={filters.dateFrom || ''}
            onChange={e =>
              dispatch(
                setDateRange({ from: e.target.value, to: filters.dateTo })
              )
            }
            className="date-input"
            placeholder="From date"
            aria-placeholder="From date"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(resetFilters())}
          className="clear-filters-btn"
        >
          Clear Filters
          <IconX size={16} />
        </Button>
      </div>
    </div>
  );
}
