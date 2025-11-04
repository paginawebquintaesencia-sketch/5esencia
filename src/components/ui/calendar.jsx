import * as React from "react"
import { DayPicker } from "react-day-picker"
import "./calendar.css"

function Calendar({
  className = "",
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar-container ${className}`}
      classNames={{
        months: "calendar-months",
        month: "calendar-month",
        month_caption: "calendar-caption",
        caption_label: "calendar-caption-label",
        nav: "calendar-nav",
        button_previous: "calendar-nav-button calendar-nav-button-previous",
        button_next: "calendar-nav-button calendar-nav-button-next",
        month_grid: "calendar-table",
        weekdays: "calendar-head",
        weekday: "calendar-head-cell",
        weeks: "calendar-body",
        week: "calendar-row",
        day: "calendar-cell",
        day_button: "calendar-day-button",
        selected: "calendar-day-selected",
        today: "calendar-day-today",
        outside: "calendar-day-outside",
        disabled: "calendar-day-disabled",
        range_middle: "calendar-day-range-middle",
        hidden: "calendar-day-hidden",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            )
          }
          return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
