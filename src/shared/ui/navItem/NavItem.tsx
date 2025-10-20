import { cn } from '../../../lib/utils';
import { ICONS, NavItemProps } from './types';

export function NavItem({
  id,
  label,
  icon: IconName,
  isActive,
  onClick,
  isMobile = false,
}: NavItemProps) {
  const Icon = ICONS[IconName] as React.ElementType;

  return (
    <button
      key={id}
      onClick={onClick}
      className={cn(
        'nav-item',
        isMobile && 'nav-item--mobile',
        isActive ? 'nav-item--active' : 'nav-item--inactive'
      )}
    >
      <Icon className="nav-item__icon" />
      <span className="nav-item__label">{label}</span>
    </button>
  );
}
