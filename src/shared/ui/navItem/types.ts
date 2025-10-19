import { icons } from 'lucide-react';

export interface NavItemProps {
  id: string;
  label: string;
  icon: keyof typeof icons;
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}
