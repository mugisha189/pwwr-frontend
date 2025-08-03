import { Check, ChevronsUpDown, Search } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SelectData } from '.';

interface ComboBoxProps {
  data: SelectData[];
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function ComboBox(props: ComboBoxProps) {
  const { data, onChange, value: defaultValue, placeholder, className, disabled } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? '');
  const [search, setSearch] = React.useState('');

  const _data = React.useMemo(() => {
    if (search.trim() === '') return data;
    return data.filter((dt) => dt.label?.toLowerCase().includes(search?.toLocaleLowerCase()));
  }, [data, search]);
  // console.log('_data', _data);

  const onValueChange = (val: string) => {
    console.log('onValueChange', val);
    const _value = value === val ? '' : val;
    setValue(_value);
    onChange?.(_value);
    setOpen(false);
  };

  React.useEffect(() => {
    if (defaultValue !== value) {
      console.log('set value ==>', defaultValue, value);
      setValue(defaultValue?.toString() ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const onSearchChange = (val: string) => {
    setSearch(val);
  };

  const onOpenChange = (open: boolean) => {
    if (disabled) return;
    setOpen(open);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className, {
            'opacity-50': disabled,
            'cursor-not-allowed': disabled,
          })}
        >
          {value ? _data.find((dt) => dt.value.toString() === value)?.label : (placeholder ?? 'Select')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-[51]" style={{ zIndex: '51 !important' }}>
        <Command>
          <div className="flex px-1 flex-1 bg-card items-center border-b duration-200">
            <Search className="h-4 w-4 mx-1 opacity-50" />
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full p-0 shadow-none border-none focus-visible:ring-0"
            />
          </div>
          {/* <Input value={search} onValueChange={onSearchChange} placeholder="Search..." /> */}
          {/* <CommandInput /> */}
          <CommandList>
            <CommandEmpty>No Data found.</CommandEmpty>
            <CommandGroup>
              {_data.map((dt) => (
                <CommandItem disabled={dt.disabled} key={dt.value} value={dt.value?.toString()} onSelect={onValueChange}>
                  {dt.label ?? dt.value}
                  <Check className={cn('mr-2 h-4 w-4', value === dt.value?.toString() ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
