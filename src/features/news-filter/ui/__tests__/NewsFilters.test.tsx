import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsFilters } from '../NewsFilters';

// Mock Redux hooks
const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('../../../../redux/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockUseAppSelector(),
}));

// Mock Redux actions
jest.mock('../../../../redux/features/news', () => ({
  resetFilters: () => ({ type: 'news/resetFilters' }),
  setDateRange: (payload: unknown) => ({ type: 'news/setDateRange', payload }),
  toggleCategory: (payload: unknown) => ({
    type: 'news/toggleCategory',
    payload,
  }),
  toggleSource: (payload: unknown) => ({ type: 'news/toggleSource', payload }),
}));

describe('NewsFilters', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockUseAppSelector.mockReturnValue({
      filters: {
        search: '',
        sources: ['newsapi'],
        categories: ['general'],
        dateFrom: undefined,
        dateTo: undefined,
      },
      activeTab: 'feed',
    });
  });

  it('renders category and source selects', () => {
    render(<NewsFilters />);
    expect(screen.getByDisplayValue(/all categories/i)).toBeTruthy();
    expect(screen.getByDisplayValue(/newsapi/i)).toBeTruthy();
  });

  it('renders date input button', () => {
    render(<NewsFilters />);
    const dateButton = screen.getByRole('button', {
      name: /select start date/i,
    });
    expect(dateButton).toBeTruthy();
  });

  it('renders clear filters button', () => {
    render(<NewsFilters />);
    const clearBtn = screen.getByRole('button', { name: /clear filters/i });
    expect(clearBtn).toBeTruthy();
  });

  it('dispatches resetFilters when clear button clicked', async () => {
    const user = userEvent.setup();
    render(<NewsFilters />);
    const clearBtn = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('does not render when activeTab is not feed', () => {
    mockUseAppSelector.mockReturnValue({
      filters: {
        sources: ['newsapi'],
        categories: ['general'],
      },
      activeTab: 'authors',
    });
    const { container } = render(<NewsFilters />);
    expect(container.firstChild).toBeNull();
  });
});
