import { setActiveTab, toggleMobileMenu } from '../../../redux/modules/news';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { NavItem } from './NavItem';

const navItems = [
  { icon: 'IconNews', label: 'feed', id: 'feed' },
  { icon: 'IconBookmark', label: 'favorite authors', id: 'authors' },
  { icon: 'IconHash', label: 'favorite categories', id: 'categories' },
  { icon: 'IconGlobe', label: 'favorite sources', id: 'sources' },
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
