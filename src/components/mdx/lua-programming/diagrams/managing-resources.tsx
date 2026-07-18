"use client";

import { LuaOfficialLab } from "./official-lab";

const lifecycleCases = [
  { label: "Acquire", fields: [["State", "Native handle obtained but not yet published"], ["Owner", "Current C scope"], ["Failure rule", "Release locally before raising"]] },
  { label: "Publish", fields: [["State", "Initialized userdata/closure becomes Lua-reachable"], ["Owner", "Lua object plus explicit close protocol"], ["Failure rule", "Metatable and finalizer must already be valid"]] },
  { label: "Use", fields: [["State", "Open resource checked on every operation"], ["Owner", "Exactly one logical handle owner"], ["Failure rule", "Do not hold invalid native state across Lua callbacks"]] },
  { label: "Close", fields: [["State", "Handle released and marked closed"], ["Owner", "No remaining native capability"], ["Failure rule", "Explicit close and __gc are idempotent"]], alert: "Finalization is a fallback for reachability, not a deterministic scheduling mechanism. Expose explicit close when timely release matters." },
] as const;

const directoryCases = [
  { label: "Open", fields: [["Object", "DIR* stored in full userdata"], ["Reachability", "Iterator closure captures the userdata"], ["Cleanup", "Open failure releases before Lua publication"]] },
  { label: "Next", fields: [["Object", "readdir advances native cursor"], ["Reachability", "Each iterator call retains the captured owner"], ["Cleanup", "Copy entry name before the next native call"]] },
  { label: "EOF", fields: [["Object", "No further directory entry"], ["Reachability", "Iterator may still be referenced"], ["Cleanup", "Close immediately, mark closed, return no values"]] },
  { label: "Break", fields: [["Object", "Loop stops before EOF"], ["Reachability", "Closure may keep DIR* live"], ["Cleanup", "Caller invokes close; __gc is only fallback"]], alert: "A generic-for iterator does not receive a notification when the loop breaks. Resource-bearing iterators need an explicit owner/close path." },
] as const;

const parserCases = [
  { label: "Feed", fields: [["C parser", "Consumes a bounded input chunk"], ["Lua bridge", "Handler table remains anchored"], ["Invariant", "Input and nesting budgets are enforced"]] },
  { label: "Callback", fields: [["C parser", "Invokes start/text/end callback"], ["Lua bridge", "Protected-call the selected Lua handler"], ["Invariant", "Text fragments may be split arbitrarily"]] },
  { label: "Record error", fields: [["C parser", "Stops further parsing"], ["Lua bridge", "Copies error without long-jumping through the library"], ["Invariant", "Only the first failure wins"]] },
  { label: "Unwind", fields: [["C parser", "Returns to the owning C function"], ["Lua bridge", "Free parser and unref handlers, then raise"], ["Invariant", "Every path releases exactly once"]], alert: "Do not call lua_error through an arbitrary foreign-library callback stack. Defer the Lua error until native cleanup and control return are safe." },
] as const;

export function PilResourceLifecycleLab() {
  return <LuaOfficialLab cases={lifecycleCases} caption="Native resources move from local acquisition to Lua publication, checked use, and idempotent close." tone="cyan" />;
}

export function PilDirectoryIteratorLab() {
  return <LuaOfficialLab cases={directoryCases} caption="A directory iterator owns DIR* across open, next, EOF, and early-break paths." tone="amber" />;
}

export function PilXmlCallbackLab() {
  return <LuaOfficialLab cases={parserCases} caption="An XML bridge feeds chunks, protects callbacks, records failure, and unwinds native state before raising." tone="rose" />;
}
