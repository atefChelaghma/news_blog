import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavItem } from '../NavItem';

describe('NavItem', () => {
  it('renders label and icon', () => {
    render(
      <NavItem
        id="feed"
        label="feed"
        icon="IconNews"
        isActive={false}
        onClick={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /feed/i })).toBeInTheDocument();
  });

  it('applies active class when active', () => {
    render(
      <NavItem
        id="feed"
        label="feed"
        icon="IconNews"
        isActive={true}
        onClick={() => {}}
      />
    );
    const btn = screen.getByRole('button', { name: /feed/i });
    expect(btn.className).toMatch(/nav-item--active/);
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handler = jest.fn();
    render(
      <NavItem
        id="feed"
        label="feed"
        icon="IconNews"
        isActive={false}
        onClick={handler}
      />
    );
    await user.click(screen.getByRole('button', { name: /feed/i }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
