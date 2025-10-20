import { cn } from '../utils';

describe('cn utility', () => {
  it('combines multiple class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });

  it('handles conditional classes', () => {
    const isHidden = false;
    const isVisible = true;
    const result = cn('base', isHidden && 'hidden', isVisible && 'visible');
    expect(result).toContain('base');
    expect(result).toContain('visible');
    expect(result).not.toContain('hidden');
  });

  it('filters falsy values', () => {
    const result = cn('valid', null, undefined, false, '', 'another');
    expect(result).toContain('valid');
    expect(result).toContain('another');
  });

  it('returns empty string for no arguments', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles objects with clsx', () => {
    const result = cn('base', { active: true, disabled: false });
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
  });
});
