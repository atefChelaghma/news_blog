import { setActiveTab, toggleMobileMenu } from '../../../redux/features/news';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { NavItem } from './NavItem';

const navItems = [
  { icon: 'Newspaper', label: 'feed', id: 'feed' },
  { icon: 'Bookmark', label: 'favorite authors', id: 'authors' },
  { icon: 'Hash', label: 'favorite categories', id: 'categories' },
  { icon: 'Globe', label: 'favorite sources', id: 'sources' },
] as const;

interface NavItemsProps {
  isMobile?: boolean;
}

export function NavItems({ isMobile = false }: NavItemsProps) {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector(state => state.news);

  return (
    <>
      {navItems.map(({ icon, label, id }) => (
        <NavItem
          key={id}
          id={id}
          label={label}
          icon={icon}
          isActive={activeTab === id}
          isMobile={isMobile}
          onClick={() => {
            dispatch(setActiveTab(id));
            if (isMobile) {
              dispatch(toggleMobileMenu());
            }
          }}
        />
      ))}
    </>
  );
}
