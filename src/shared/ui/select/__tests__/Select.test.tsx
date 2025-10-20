import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';

describe('Select', () => {
  it('renders label when provided', () => {
    render(
      <Select label="Category" value="general" onChange={() => {}}>
        <option value="general">General</option>
        <option value="business">Business</option>
      </Select>
    );
    expect(screen.getByText(/category/i)).toBeInTheDocument();
  });

  it('changes value on selection', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Select label="Category" value="general" onChange={handleChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
      </Select>
    );
    const select = screen.getByDisplayValue(/general/i);
    await user.selectOptions(select, 'business');
    expect(handleChange).toHaveBeenCalled();
  });
});
