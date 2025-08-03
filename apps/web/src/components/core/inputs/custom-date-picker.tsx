'use client';

import { format } from 'date-fns';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Props = {
  value?: Date;
  onValueChange?: (value: Date | undefined) => void;
  min?: Date;
  max?: Date;
};

export function CustomDatePicker({ value, onValueChange, max, min }: Props) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [month, setMonth] = React.useState<number>(new Date().getMonth());
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [dateValue, setDateValue] = React.useState<Date | undefined>(value);

  // Update the calendar view when month/year changes
  React.useEffect(() => {
    if (month !== undefined && year !== undefined) {
      const newDate = !date && value ? new Date(year, month, value.getDate()) : new Date(year, month, 1);
      setDate(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // Years from 1925 - (today + 75 years), or min-max
  const years = React.useMemo(() => {
    const minYear = min ? min.getFullYear() : 1925;
    const maxYear = max ? max.getFullYear() : new Date().getFullYear() + 75;
    return Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index);
  }, [min, max]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          {dateValue ? format(dateValue, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex gap-2 p-3 bg-popover">
          <Select value={month.toString()} onValueChange={(value) => setMonth(Number.parseInt(value))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue>{months[month]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year.toString()} onValueChange={(value) => setYear(Number.parseInt(value))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue>{year}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={(newDate) => {
            console.log('selected', newDate);

            setDateValue(newDate);
            onValueChange?.(newDate);
            if (newDate) {
              setMonth(newDate.getMonth());
              setYear(newDate.getFullYear());
              setIsOpen(false);
            }
          }}
          month={new Date(year, month)}
          className="rounded-t-none"
          classNames={{ caption: 'hidden' }}
        />
      </PopoverContent>
    </Popover>
  );
}
