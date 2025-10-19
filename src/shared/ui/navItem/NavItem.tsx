import * as Icons from 'lucide-react';
import { cn } from '../../../lib/utils';
import { NavItemProps } from './types';

export function NavItem({
  id,
  label,
  icon: IconName,
  isActive,
  onClick,
  isMobile = false,
}: NavItemProps) {
  const Icon = Icons[IconName] as React.ElementType;
  return (
    <button
      key={id}
      onClick={onClick}
      className={cn(
        isMobile ? 'mobile-nav-item' : 'nav-item',
        isActive
          ? isMobile
            ? 'mobile-nav-item--active'
            : 'nav-item--active'
          : isMobile
            ? 'mobile-nav-item--inactive'
            : 'nav-item--inactive'
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
