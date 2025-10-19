import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { setSearch, setActiveTab, toggleMobileMenu, toggleSearch } from "../../entities/news";
import { cn } from "../../lib/utils";

const navItems = [
  { icon: "Newspaper", label: "feed", id: "feed" },
  { icon: "Bookmark", label: "favorite authors", id: "authors" },
  { icon: "Hash", label: "favorite categories", id: "categories" },
  { icon: "Globe", label: "favorite sources", id: "sources" },
] as const;

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function NavItem({
  id,
  label,
  icon: IconName,
  isActive,
  onClick,
  isMobile = false,
}: {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}) {
  const Icon = Icons[IconName] as React.ElementType;
  return (
    <button
      key={id}
      onClick={onClick}
      className={cn(
        isMobile ? 'mobile-nav-item' : 'nav-item',
        isActive ? (isMobile ? 'mobile-nav-item--active' : 'nav-item--active') : (isMobile ? 'mobile-nav-item--inactive' : 'nav-item--inactive')
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function SearchInput({
  value,
  onChange,
  isMobile = false,
}: {
  value: string;
  onChange: (value: string) => void;
  isMobile?: boolean;
}) {
  return (
    <div className={isMobile ? "mobile-search-container" : "search-container"}>
      <Icons.Search className={isMobile ? "mobile-search-icon" : "search-icon"} size={20} />
      <input
        type="text"
        placeholder="Search the news..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={isMobile ? "mobile-search-input" : "search-input"}
      />
    </div>
  );
}

export function Header() {
  const dispatch = useAppDispatch();
  const { activeTab, isMobileMenuOpen, isSearchOpen } = useAppSelector((state) => state.news);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      dispatch(setSearch(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-container">
          <div className="header-left">
            <a href="/" className="logo">
              <Icons.Newspaper size={24} />
              Innoscripta
            </a>

            <nav className="nav">
              {navItems.map(({ icon, label, id }) => (
                <NavItem
                  key={id}
                  id={id}
                  label={label}
                  icon={icon}
                  isActive={activeTab === id}
                  onClick={() => dispatch(setActiveTab(id))}
                />
              ))}
            </nav>
          </div>

          <div className="header-right">
            <div className="search-container">
              <SearchInput
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
              />
            </div>

            <button
              onClick={() => dispatch(toggleSearch())}
              className="search-toggle-btn"
            >
              <Icons.Search size={24} />
            </button>

            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? (
                <Icons.X size={24} />
              ) : (
                <Icons.Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mobile-search">
            <SearchInput
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              isMobile={true}
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              {navItems.map(({ icon, label, id }) => (
                <NavItem
                  key={id}
                  id={id}
                  label={label}
                  icon={icon}
                  isActive={activeTab === id}
                  isMobile={true}
                  onClick={() => {
                    dispatch(setActiveTab(id));
                    dispatch(toggleMobileMenu());
                  }}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
