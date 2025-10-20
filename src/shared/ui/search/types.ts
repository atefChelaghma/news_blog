export interface SearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onClear?: () => void;
}
