"use client";

import { LuaOfficialLab } from "./official-lab";

const scopeCases = [
  { label: "Local initializer", fields: [["Form", "local x = x"], ["Lookup", "The initializer sees the previous outer x"], ["Boundary", "The new local begins after its declaration"]] },
  { label: "do block", fields: [["Form", "do local x = value ... end"], ["Lookup", "x is visible only inside the explicit block"], ["Boundary", "Use it to shorten lifetime and isolate names"]] },
  { label: "Repeat scope", fields: [["Form", "repeat local x = read() until valid(x)"], ["Lookup", "x remains visible in the until condition"], ["Boundary", "The condition is part of the repeat block"]] },
  { label: "Forward local", fields: [["Form", "local f; f = function() return f() end"], ["Lookup", "The function closes over the predeclared local"], ["Boundary", "Avoid accidental global or nil self-reference"]], alert: "A local name does not retroactively cover its own initializer; declaration placement changes which binding a closure or expression captures." },
] as const;

const loopCases = [
  { label: "while", fields: [["Test", "Before every iteration"], ["Minimum runs", "Zero"], ["Best fit", "Unknown count with a precondition"]] },
  { label: "repeat", fields: [["Test", "After every iteration"], ["Minimum runs", "One"], ["Best fit", "Read/attempt once, then validate"]] },
  { label: "Numerical for", fields: [["Test", "Initial, limit, and step evaluated once"], ["Minimum runs", "Depends on step direction and bounds"], ["Best fit", "Bounded arithmetic progression"]] },
  { label: "Generic for", fields: [["Test", "Iterator returns the next control value"], ["Minimum runs", "Until first returned control value is nil"], ["Best fit", "Traversal defined by iterator/state/control"]], alert: "Zero and empty strings are true in Lua; a loop condition stops only for false or nil, not for numeric or textual emptiness." },
] as const;

const exitCases = [
  { label: "break", fields: [["Target", "Innermost enclosing loop"], ["Data", "No result value"], ["Review", "Ensure cleanup happens after the loop"]] },
  { label: "return", fields: [["Target", "Current function"], ["Data", "Zero or more adjusted results"], ["Review", "All owned resources need a prior close path"]] },
  { label: "goto outward", fields: [["Target", "Visible label in the same function"], ["Data", "Control only"], ["Review", "May leave local scopes but cannot enter a new one"]] },
  { label: "loop label", fields: [["Target", "A label near the end of one iteration"], ["Data", "Continue-like control"], ["Review", "Wrap locals in a block so the jump does not enter scope"]], alert: "goto is constrained by lexical scope, not indentation; a legal-looking jump can fail to compile when it enters the lifetime of a local." },
] as const;

export function PilScopeBlockLab() {
  return <LuaOfficialLab cases={scopeCases} caption="Local visibility starts at a precise declaration boundary, while repeat conditions remain inside the loop block." tone="cyan" />;
}

export function PilLoopControlLab() {
  return <LuaOfficialLab cases={loopCases} caption="Choose a loop by test timing, bound evaluation, and iterator protocol instead of surface syntax." tone="emerald" />;
}

export function PilExitGotoLab() {
  return <LuaOfficialLab cases={exitCases} caption="break, return, and goto leave different control regions and therefore carry different cleanup obligations." tone="amber" />;
}
