import React from 'react';
import { cn } from '../../lib/utils';
import { IconChevronDown } from '@tabler/icons-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <div className="select">
      {label && <label className="select__label">{label}</label>}
      <div className="select__container">
        <select className={cn('select__control', className)} {...props}>
          {children}
        </select>
        <IconChevronDown className="select__icon" size={16} />
      </div>
    </div>
  );
}
