import {
  IconBookmark,
  IconGlobe,
  IconHash,
  IconNews,
} from '@tabler/icons-react';

export const ICONS = {
  IconNews,
  IconBookmark,
  IconHash,
  IconGlobe,
} as const;

export type IconKey = keyof typeof ICONS;

export interface NavItemProps {
  id: string;
  label: string;
  icon: keyof typeof ICONS;
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}
