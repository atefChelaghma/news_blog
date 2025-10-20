import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

jest.mock('../../../../shared/hooks', () => ({
  useDebounce: (value: string) => value,
}));

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../../redux/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockUseAppSelector(),
}));

jest.mock('../../../../redux/modules/news', () => ({
  setSearch: (value: string) => ({ type: 'news/setSearch', payload: value }),
  fetchNews: () => ({ type: 'news/fetchNews' }),
}));

jest.mock('../../../../redux/modules/news/newsSlice', () => ({
  clearSearch: () => ({ type: 'news/clearSearch' }),
  fetchNews: () => ({ type: 'news/fetchNews' }),
}));

jest.mock('../../../../shared/ui/logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

jest.mock('../../../../shared/ui/navItem', () => ({
  NavItems: () => <div data-testid="nav-items">Nav</div>,
}));

jest.mock('../../../../shared/ui/search', () => ({
  SearchInput: ({
    value,
    onChange,
    onClear,
  }: {
    value: string;
    onChange: (v: string) => void;
    onClear: () => void;
  }) => (
    <div data-testid="search-input">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search"
      />
      <button onClick={onClear}>Clear</button>
    </div>
  ),
}));

jest.mock('../../../../features/news-filter', () => ({
  NewsFilters: () => <div data-testid="news-filters">Filters</div>,
}));

describe('Header', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseAppSelector.mockReturnValue({
      filters: {
        search: '',
        sources: ['newsapi'],
        categories: ['general'],
      },
    });
  });

  it('renders header elements', () => {
    render(<Header />);
    expect(screen.getByTestId('logo')).toBeTruthy();
    expect(screen.getByTestId('search-input')).toBeTruthy();
    expect(screen.getByTestId('nav-items')).toBeTruthy();
    expect(screen.getByTestId('news-filters')).toBeTruthy();
  });

  it('displays search value from Redux state', () => {
    mockUseAppSelector.mockReturnValue({
      filters: { search: 'test query' },
    });
    render(<Header />);
    expect(screen.getByDisplayValue('test query')).toBeTruthy();
  });

  it('dispatches setSearch when typing in search', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const input = screen.getByPlaceholderText('Search');
    await user.type(input, 'react');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches clearSearch when clicking clear button', async () => {
    const user = userEvent.setup();
    mockUseAppSelector.mockReturnValue({
      filters: { search: 'test' },
    });
    render(<Header />);
    const clearBtn = screen.getByRole('button', { name: /clear/i });
    await user.click(clearBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
