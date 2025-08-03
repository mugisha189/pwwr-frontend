import { addMilliseconds, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  range?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
}

export default function DateRangePicker({ className, range, onValueChange }: Props) {
  // const [date, setDate] = React.useState<DateRange | undefined>(range);
  const date = React.useMemo(() => {
    return range;
  }, [range]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-fit justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="">Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              // change range.to to range.to + current hour
              const milliSecsFromTodayMidnight =
                new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;
              console.log('milliSecsFromTodayMidnight', milliSecsFromTodayMidnight);
              console.log('range', range);
              // const toIsBig = range?.to && range.to.getTime() >= new Date().getTime();
              // from is always from midnight
              const _from = range?.from;
              const from = _from && new Date(_from?.getFullYear(), _from?.getMonth(), range?.from?.getDate());
              const to = from || range?.to ? addMilliseconds(range.to ?? from!, milliSecsFromTodayMidnight) : range?.to;
              const _range = {
                from,
                to: to ?? (range?.from && addMilliseconds(range.from, milliSecsFromTodayMidnight)),
              } as DateRange;
              // setDate(_range);
              onValueChange?.(_range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
