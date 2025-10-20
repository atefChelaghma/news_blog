import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { SearchInput } from '../Search';

describe('SearchInput', () => {
  it('renders placeholder', () => {
    render(<SearchInput onSearch={() => {}} onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search articles/i)).toBeInTheDocument();
  });

  it('calls onChange as user types accumulating value', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <SearchInput
          value={value}
          onChange={v => {
            setValue(v);
            handleChange(v);
          }}
          onSearch={() => {}}
        />
      );
    };
    render(<Wrapper />);
    const input = screen.getByPlaceholderText(/search articles/i);
    await user.type(input, 'react');
    const allValues = handleChange.mock.calls.map(c => c[0]);
    expect(allValues).toContain('react');
    expect(allValues[allValues.length - 1]).toBe('react');
  });

  it('disables search button when empty', () => {
    render(<SearchInput onSearch={() => {}} onChange={() => {}} value="" />);
    expect(
      screen.getByRole('button', { name: /submit search/i })
    ).toBeDisabled();
  });

  it('fires search on Enter with current value', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <SearchInput
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
        />
      );
    };
    render(<Wrapper />);
    const input = screen.getByPlaceholderText(/search articles/i);
    await user.type(input, 'redux{enter}');
    expect(handleSearch).toHaveBeenCalledWith('redux');
  });

  it('shows and clears with clear button', async () => {
    const user = userEvent.setup();
    const handleClear = jest.fn();
    render(
      <SearchInput
        value="abc"
        onSearch={() => {}}
        onChange={() => {}}
        onClear={handleClear}
      />
    );
    const clear = screen.getByRole('button', { name: /clear search/i });
    await user.click(clear);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
