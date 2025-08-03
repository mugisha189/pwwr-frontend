'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';

export interface SelectItem {
  value: string;
  label: string;
}

export type SelectItemOrString = SelectItem | string;

const normalizeItem = (item: SelectItemOrString): SelectItem => {
  if (typeof item === 'string') {
    return { value: item, label: item };
  }
  return item;
};

const normalizeItems = (items: SelectItemOrString[]): SelectItem[] => {
  return items.map(normalizeItem);
};

export interface MultiSelectProps {
  items: SelectItemOrString[];
  value: SelectItemOrString[];
  onValueChange: (value: SelectItem[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxItems?: number;
}

export function MultiSelect({
  items: rawItems,
  value: rawValue,
  onValueChange,
  placeholder = 'Select items...',
  className,
  disabled = false,
  maxItems,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  // Normalize items and value to SelectItem[]
  const items = React.useMemo(() => normalizeItems(rawItems), [rawItems]);
  const value = React.useMemo(() => normalizeItems(rawValue), [rawValue]);

  const handleUnselect = React.useCallback(
    (item: SelectItem) => {
      onValueChange(value.filter((v) => v.value !== item.value));
    },
    [onValueChange, value],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            onValueChange(value.slice(0, -1));
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [onValueChange, value],
  );

  const selectables = items.filter((item) => !value.some((selected) => selected.value === item.value));

  const handleSelect = React.useCallback(
    (item: SelectItem) => {
      if (maxItems && value.length >= maxItems) {
        return;
      }
      setInputValue('');
      onValueChange([...value, item]);
    },
    [maxItems, onValueChange, value],
  );

  return (
    <Command onKeyDown={handleKeyDown} className={cn('overflow-visible bg-transparent', className)}>
      <div
        className={cn(
          'group flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
          'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        )}
      >
        <div className="flex w-full flex-wrap gap-1">
          {value.map((item) => (
            <Badge key={item.value} variant="secondary">
              {item.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            disabled={disabled || (maxItems !== undefined && value.length >= maxItems)}
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item) => (
                  <CommandItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(item)}
                    className="cursor-pointer"
                    disabled={disabled || (maxItems !== undefined && value.length >= maxItems)}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
