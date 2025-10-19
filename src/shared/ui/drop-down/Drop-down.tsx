import { IconChevronDown } from '@tabler/icons-react';

export const FilterDropdown: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}> = ({ icon, label, value, options, onChange }) => (
  <div className="feed__dropdown">
    <label className="feed__label">
      {icon}
      {label}
    </label>
    <select
      className="feed__select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <IconChevronDown className="feed__chevron" size={16} />
  </div>
);
