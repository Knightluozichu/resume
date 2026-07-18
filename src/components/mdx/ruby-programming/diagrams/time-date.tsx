"use client";

import { RubyOfficialLab } from "./official-lab";

const clockCases = [
  { label: "Time.now", fields: [["Meaning", "Wall-clock date/time"], ["Use", "Timestamps for users/audit"], ["Risk", "Can jump with clock adjustments"]] },
  { label: "Monotonic", fields: [["Meaning", "Ever-increasing process/system clock"], ["Use", "Elapsed time, deadlines, timeout budgets"], ["Limit", "Not convertible to calendar timestamp"]] },
  { label: "UTC", fields: [["Meaning", "Instant represented at UTC offset"], ["Use", "Storage and cross-system exchange"], ["Rule", "Preserve original zone separately if business-relevant"]] },
  { label: "Local", fields: [["Meaning", "Instant shown in process/local zone"], ["Use", "Display under explicit user zone"], ["Risk", "DST ambiguity and environment-dependent default"]] },
] as const;

const formatCases = [
  { label: "Format", fields: [["API", "strftime"], ["Input", "Time/Date plus explicit pattern"], ["Boundary", "Locale, zone, precision, offset"]] },
  { label: "Parse", fields: [["API", "Time.strptime / Date.strptime"], ["Input", "Text plus explicit pattern"], ["Boundary", "Reject trailing/missing/ambiguous fields"]] },
  { label: "ISO 8601", fields: [["API", "iso8601 where available"], ["Input", "Standardized timestamp/date text"], ["Boundary", "Offset, fractional seconds, strictness"]] },
  { label: "Epoch", fields: [["API", "Time.at / to_i / to_f"], ["Input", "Seconds from epoch"], ["Boundary", "Unit seconds vs millis, range and precision"]] },
] as const;

const calendarCases = [
  { label: "Duration", fields: [["Type", "Seconds between instants"], ["Use", "Timeout and elapsed time"], ["Rule", "Use monotonic source for measurement"]] },
  { label: "Calendar day", fields: [["Type", "Date + Rational/Integer days"], ["Use", "Next date/business calendar"], ["Rule", "A local day may not equal 86,400 seconds"]] },
  { label: "Month/year", fields: [["API", "Date#>>, Date#<<"], ["Use", "Calendar month shifts"], ["Boundary", "End-of-month clamping policy"]] },
  { label: "Conversion", fields: [["API", "to_date, to_time or constructors"], ["Use", "Move between calendar date and instant"], ["Boundary", "Requires zone/time-of-day policy"]], alert: "Converting a Date to Time invents a time and zone; those defaults are business decisions, not neutral facts." },
] as const;

export function RubyClockSemanticsLab() {
  return <RubyOfficialLab cases={clockCases} caption="Wall, monotonic, UTC, and local time answer different timestamp, elapsed, storage, and display questions." tone="cyan" />;
}

export function RubyTimeFormatLab() {
  return <RubyOfficialLab cases={formatCases} caption="Formatting, parsing, ISO text, and epoch numbers require explicit pattern, offset, unit, precision, and strictness." tone="violet" />;
}

export function RubyCalendarArithmeticLab() {
  return <RubyOfficialLab cases={calendarCases} caption="Durations, calendar days, month shifts, and Date-Time conversion preserve different invariants." tone="amber" />;
}
