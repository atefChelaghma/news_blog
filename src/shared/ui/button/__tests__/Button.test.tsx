import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="secondary" size="lg">
        Action
      </Button>
    );
    const btn = screen.getByRole('button', { name: /action/i });
    expect(btn.className).toMatch(/button--secondary/);
    expect(btn.className).toMatch(/button--lg/);
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handler = jest.fn();
    render(<Button onClick={handler}>Press</Button>);
    await user.click(screen.getByRole('button', { name: /press/i }));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
