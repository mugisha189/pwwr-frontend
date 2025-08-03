import * as React from 'react';
import { Checkbox } from './checkbox';

interface CheckboxRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function CheckboxRadioGroup({ value, onValueChange, children, className }: CheckboxRadioGroupProps) {
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<CheckboxRadioGroupItemProps>(child)) return child;
        return React.cloneElement(child, {
          selectedValue: value,
          onSelect: onValueChange,
        } as Partial<CheckboxRadioGroupItemProps>);
      })}
    </div>
  );
}

interface CheckboxRadioGroupItemProps {
  value: string;
  children: React.ReactNode;
  selectedValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export function CheckboxRadioGroupItem({ value, children, selectedValue, onSelect, className }: CheckboxRadioGroupItemProps) {
  const checked = value === selectedValue;
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className || ''}`}>
      <Checkbox checked={checked} onCheckedChange={() => onSelect?.(value)} />
      <span>{children}</span>
    </label>
  );
}
