"use client";

import { LuaOfficialLab } from "./official-lab";

const representationCases = [
  { label: "Timestamp", fields: [["Shape", "An os.time-compatible scalar"], ["Meaning", "An instant on the host time scale"], ["Risk", "Range, precision, and epoch representation are platform-dependent"]] },
  { label: "Local table", fields: [["Shape", "year/month/day/hour/min/sec plus calendar fields"], ["Meaning", "Broken-down time under current local timezone rules"], ["Risk", "DST can make a wall time ambiguous or nonexistent"]] },
  { label: "UTC table", fields: [["Shape", "os.date(\"!*t\", timestamp)"], ["Meaning", "UTC breakdown for display or fields"], ["Risk", "os.time does not portably interpret this table as UTC"]] },
  { label: "CPU clock", fields: [["Shape", "os.clock() numeric reading"], ["Meaning", "Approximate process CPU time"], ["Risk", "Not wall time and not a portable monotonic deadline clock"]], alert: "A formatted date, a local calendar table, an instant, and a duration are different data types even when Lua represents several of them as numbers or tables." },
] as const;

const dateCases = [
  { label: "Default", fields: [["Call", "os.date()"], ["Result", "Locale-dependent date/time string"], ["Contract", "Useful for humans, unsuitable as a stable wire format"]] },
  { label: "Format", fields: [["Call", "os.date(format, timestamp)"], ["Result", "strftime-style formatted local time"], ["Contract", "Directive support and text can depend on C library and locale"]] },
  { label: "*t", fields: [["Call", "os.date(\"*t\", timestamp)"], ["Result", "Local broken-down table with wday/yday/isdst"], ["Contract", "Field ranges and DST state belong to host rules"]] },
  { label: "!*t", fields: [["Call", "os.date(\"!*t\", timestamp)"], ["Result", "UTC broken-down table"], ["Contract", "Leading ! selects UTC for os.date only"]], alert: "The default and many format directives are locale-dependent. Persist an instant or a versioned explicit format, not os.date() output." },
] as const;

const arithmeticCases = [
  { label: "Elapsed seconds", fields: [["Question", "How much instant time passed?"], ["Operation", "os.difftime(end_time, start_time)"], ["Boundary", "Wall-clock adjustments still make os.time unsuitable for precise deadlines"]] },
  { label: "Fixed duration", fields: [["Question", "Exactly 24 hours later?"], ["Operation", "Add 24 * 60 * 60 when the timestamp model permits"], ["Boundary", "Local wall-clock hour may change across DST"]] },
  { label: "Calendar day", fields: [["Question", "Same local schedule on the next date?"], ["Operation", "Increment table.day then normalize with os.time"], ["Boundary", "Resulting elapsed seconds may not equal 86400"]] },
  { label: "Named zone", fields: [["Question", "Apply Europe/Shanghai/etc. historical rules?"], ["Operation", "Use a timezone database library"], ["Boundary", "Lua standard os library exposes only host local time and UTC formatting"]], alert: "Calendar arithmetic is rule-based normalization, while duration arithmetic operates on instants. Substituting one for the other creates DST and month-boundary bugs." },
] as const;

export function PilTimeRepresentationLab() {
  return <LuaOfficialLab cases={representationCases} caption="Timestamp, local/UTC calendar tables, and CPU-clock readings answer different questions and have different portability limits." tone="cyan" />;
}

export function PilOsDateLab() {
  return <LuaOfficialLab cases={dateCases} caption="os.date selects local or UTC breakdown, then returns either locale-sensitive text or a calendar table." tone="violet" />;
}

export function PilCalendarArithmeticLab() {
  return <LuaOfficialLab cases={arithmeticCases} caption="Elapsed duration, fixed seconds, calendar movement, and named-zone scheduling require separate operations." tone="amber" />;
}
