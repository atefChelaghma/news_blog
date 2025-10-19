import { Button } from '../../../shared/ui/button/Button';
import { Select } from '../../../shared/ui/select/Select';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
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

        <div className="date-input-wrapper">
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={e =>
              dispatch(
                setDateRange({ from: e.target.value, to: filters.dateTo })
              )
            }
            className="date-input"
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
