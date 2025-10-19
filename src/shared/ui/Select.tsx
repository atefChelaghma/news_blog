import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <div className="select-container">
        <select className={cn('select', className)} {...props}>
          {children}
        </select>
        <ChevronDown className="select-icon" size={16} />
      </div>
    </div>
  );
}
