"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const TimePickerList = ({
  value,
  onChange,
  data,
}: {
  value: number;
  onChange: (value: number) => void;
  data: number[];
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const selectedElement = ref.current.children[value];
      selectedElement?.scrollIntoView({ block: "center" });
    }
  }, [value]);

  return (
    <div
      ref={ref}
      className={cn(
        "h-48 overflow-y-auto w-16",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:bg-transparent",
        "group-hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30"
      )}
    >
      {data.map((item) => (
        <Button
          key={item}
          variant={item === value ? "default" : "ghost"}
          className="w-full justify-center px-1"
          size={"sm"}
          onClick={() => onChange(item)}
        >
          {String(item).padStart(2, "0")}
        </Button>
      ))}
    </div>
  );
};

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!date) {
      const newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      setDate(newDate);
    }
  }, [date, setDate]);

  const handleHourChange = (hour: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(hour);
      setDate(newDate);
    }
  };

  const handleMinuteChange = (minute: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMinutes(minute);
      setDate(newDate);
    }
  };

  const handleSecondChange = (second: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setSeconds(second);
      setDate(newDate);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? (
            new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            }).format(date)
          ) : (
            <span>Pick a time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex p-1">
          <div className="group">
            <p className="text-sm font-medium text-center mb-2">Hour</p>
            <TimePickerList
              value={date?.getHours() || 0}
              onChange={handleHourChange}
              data={hours}
            />
          </div>
          <div className="group px-2">
            <p className="text-sm font-medium text-center mb-2">Minute</p>
            <TimePickerList
              value={date?.getMinutes() || 0}
              onChange={handleMinuteChange}
              data={minutes}
            />
          </div>
          <div className="group px-2">
            <p className="text-sm font-medium text-center mb-2">Second</p>
            <TimePickerList
              value={date?.getSeconds() || 0}
              onChange={handleSecondChange}
              data={seconds}
            />
          </div>
        </div>
        <div className="flex justify-between p-2 border-t">
          <Button variant="ghost" onClick={() => setDate(new Date())}>
            Now
          </Button>
          <Button onClick={() => setIsOpen(false)}>OK</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
