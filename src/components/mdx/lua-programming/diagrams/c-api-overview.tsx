"use client";

import { LuaOfficialLab } from "./official-lab";

const lifecycleCases = [
  { label: "Create", fields: [["API", "luaL_newstate or lua_newstate"], ["Stack", "Empty on success"], ["Host duty", "Check NULL and establish state ownership"]] },
  { label: "Load", fields: [["API", "luaL_loadfile / luaL_loadbuffer"], ["Stack", "Pushes compiled chunk or error object"], ["Host duty", "Separate compile status from runtime status"]] },
  { label: "Call", fields: [["API", "lua_pcall"], ["Stack", "Consumes function/arguments and pushes results or error"], ["Host duty", "Declare result count and protected boundary"]] },
  { label: "Close", fields: [["API", "lua_close"], ["Stack", "State and all owned Lua objects become invalid"], ["Host duty", "Release once after host references are detached"]], alert: "Every C API call participates in a stack contract: document the entry top, consumed values, produced values, and error shape." },
] as const;

const stackCases = [
  { label: "Index", fields: [["Positive", "1 starts at the frame base"], ["Negative", "-1 is the current top"], ["Invariant", "Resolve relative indexes before stack mutation when needed"]] },
  { label: "Push", fields: [["Operation", "Append a Lua value"], ["Top delta", "+1 per pushed value"], ["Invariant", "Ensure stack capacity for larger batches"]] },
  { label: "Query", fields: [["Operation", "Test type and convert a value"], ["Top delta", "Usually 0"], ["Invariant", "Distinguish failed conversion from a valid zero"]] },
  { label: "Rotate", fields: [["Operation", "Reorder a stack segment"], ["Top delta", "0"], ["Invariant", "Track absolute positions and final order"]], alert: "The virtual stack is not a bag of values. Position, top delta, and lifetime form the ABI between host code and Lua." },
] as const;

const boundaryCases = [
  { label: "Load error", fields: [["Origin", "Parser or binary-chunk loader"], ["Signal", "Non-OK status plus error object on stack"], ["Recovery", "Read/pop error and keep state usable"]] },
  { label: "Runtime error", fields: [["Origin", "Lua code or C library called by Lua"], ["Signal", "lua_pcall status and error object"], ["Recovery", "Attach message handler/traceback, restore stack contract"]] },
  { label: "Panic", fields: [["Origin", "Unprotected error crosses the host boundary"], ["Signal", "Panic function is called"], ["Recovery", "Treat as boundary design failure, not routine control flow"]] },
  { label: "Memory", fields: [["Origin", "Allocator cannot satisfy growth"], ["Signal", "Memory-error status or state-creation failure"], ["Recovery", "Keep allocator bookkeeping valid and shed host work"]], alert: "lua_error and luaL_error do not return normally. Native cleanup must be arranged before raising or outside the protected call." },
] as const;

export function PilCApiLifecycleLab() {
  return <LuaOfficialLab cases={lifecycleCases} caption="Create, load, protected call, and close define the host-owned lua_State lifecycle." tone="cyan" />;
}

export function PilCApiStackLab() {
  return <LuaOfficialLab cases={stackCases} caption="Indexes, pushes, queries, and rotations are governed by explicit stack-top deltas." tone="violet" />;
}

export function PilCApiBoundaryLab() {
  return <LuaOfficialLab cases={boundaryCases} caption="Load, runtime, panic, and memory failures cross different host recovery boundaries." tone="rose" />;
}
