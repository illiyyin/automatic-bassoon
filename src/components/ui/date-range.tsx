"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import dayjs from "dayjs"
import { CalendarIcon, CircleIcon } from "lucide-react"
import { DateRange as DateRangeType } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { cn } from "@/lib/utils"

import { Calendar } from "./calendar"

export const initialDate = {
  from: new Date(dayjs().year(), dayjs().month(), dayjs().date() - 30),
  to: new Date(dayjs().year(), dayjs().month(), dayjs().date()),
}
export function DateRange({
  className,
  date = initialDate,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date?: DateRangeType
  setDate?: React.Dispatch<React.SetStateAction<DateRangeType>>
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CircleIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(value) => value && setDate?.(value)}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
