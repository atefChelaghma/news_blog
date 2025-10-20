import { render } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders logo link', () => {
    const { container } = render(<Logo />);
    const logoLink = container.querySelector('.logo');
    expect(logoLink).toBeTruthy();
    expect(logoLink?.tagName).toBe('A');
  });

  it('has correct href attribute', () => {
    const { container } = render(<Logo />);
    const logoLink = container.querySelector('.logo');
    expect(logoLink?.getAttribute('href')).toBe('/');
  });
});
