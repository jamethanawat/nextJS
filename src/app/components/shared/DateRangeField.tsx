'use client'
import React, { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Icon } from "@iconify/react"
import { DateRange } from "react-day-picker"
import { endOfMonth, format, startOfDay, startOfMonth, subDays, subMonths } from "date-fns"

type DateRangeFieldProps = {
  label?: string
  formatString?: string
  placeholder?: string
  numberOfMonths?: number
  value?: DateRange | undefined
  onChange?: (range: DateRange | undefined) => void
}

const DateRangeField = React.memo(({
  label = "วันที่",
  formatString = "dd-MM-yyyy",
  placeholder = "DD-MM-YYYY",
  numberOfMonths = 2,
  value,
  onChange,
}: DateRangeFieldProps) => {
  const [internalRange, setInternalRange] = useState<DateRange | undefined>(undefined)
  const dateRange = value ?? internalRange
  const setDateRange = onChange ?? setInternalRange

  const today = startOfDay(new Date())
  const presets = useMemo(() => ([
    { label: "Today", range: { from: today, to: today } },
    { label: "Yesterday", range: { from: subDays(today, 1), to: subDays(today, 1) } },
    { label: "Last 7 days", range: { from: subDays(today, 6), to: today } },
    { label: "Last 30 days", range: { from: subDays(today, 29), to: today } },
    { label: "This month", range: { from: startOfMonth(today), to: endOfMonth(today) } },
    { label: "Last month", range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
  ]), [today])

  const dateLabel = dateRange?.from
    ? `${format(dateRange.from, formatString)} - ${dateRange.to ? format(dateRange.to, formatString) : placeholder}`
    : `${placeholder} - ${placeholder}`

  return (
    <div className="space-y-1">
      <Label htmlFor="date" className="text-xs">{label}</Label>
      <div className="flex w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left font-normal h-8 text-xs rounded-lg border-ld bg-transparent text-ld px-3 hover:bg-transparent hover:text-ld"
            >
              <Icon
                icon="solar:calendar-linear"
                className={`mr-2 h-4 w-4 ${!dateRange?.from ? "text-muted-foreground" : "text-ld"}`}
              />
              <span className={`truncate ${!dateRange?.from ? "text-muted-foreground" : "text-ld"}`}>
                {dateLabel}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-[90vw] p-0" align="start">
            <div className="inline-flex flex-col md:flex-row overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg">
              <div className="min-w-[140px] w-[140px] shrink-0 border-b md:border-b-0 md:border-r border-border p-3 space-y-1">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    type="button"
                    variant="ghost"
                    className="w-full justify-start h-7 px-2 text-[11px]"
                    onClick={() => setDateRange(preset.range)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
              <div className="p-3 max-h-[65vh] overflow-y-auto">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={numberOfMonths}
                  initialFocus
                  className="[--cell-size:--spacing(7)]"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
})

DateRangeField.displayName = 'DateRangeField'

export default DateRangeField
