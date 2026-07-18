"use client";

import { LuaOfficialLab } from "./official-lab";

const introspectionCases = [
  { label: "Function info", fields: [["Question", "Where was this function defined and what kind of function is it?"], ["API", "debug.getinfo(function, what)"], ["Boundary", "Metadata is selected explicitly to avoid unnecessary work"]] },
  { label: "Stack frame", fields: [["Question", "Which function is executing at this stack level?"], ["API", "debug.getinfo([thread,] level, what)"], ["Boundary", "Level 0 is getinfo itself; caller levels move outward"]] },
  { label: "Local", fields: [["Question", "Which named slot and value exist in a live frame?"], ["API", "debug.getlocal / debug.setlocal"], ["Boundary", "Indexes are frame-specific and temporary"]] },
  { label: "Upvalue", fields: [["Question", "Which captured cell belongs to a closure?"], ["API", "debug.getupvalue / setupvalue / upvalueid"], ["Boundary", "Mutating or joining cells changes program semantics"]], alert: "The debug library crosses normal abstraction boundaries: treat every read and write as privileged instrumentation." },
] as const;

const hookCases = [
  { label: "Call", fields: [["Mask", "c"], ["Signal", "A Lua or C function is entered"], ["Use", "Build call counts or a shadow stack"]] },
  { label: "Return", fields: [["Mask", "r"], ["Signal", "A function returns, including tail-call-related events"], ["Use", "Close timing spans without assuming ordinary stack shape"]] },
  { label: "Line", fields: [["Mask", "l"], ["Signal", "Execution reaches a new source line"], ["Use", "Debugger breakpoints and coverage"]] },
  { label: "Count", fields: [["Mask", "count parameter"], ["Signal", "A configured number of VM instructions elapsed"], ["Use", "Sampling or cooperative instruction budgets"]], alert: "A hook runs inside the observed VM. Keep it bounded, non-blocking, allocation-light, and protected against re-entry." },
] as const;

const sandboxCases = [
  { label: "Environment", fields: [["Control", "Expose an allowlist instead of the host global table"], ["Stops", "Direct access to ordinary dangerous globals"], ["Does not stop", "Leaked closures, debug powers, CPU or memory exhaustion"]] },
  { label: "Debug", fields: [["Control", "Do not expose debug or helpers that return it"], ["Stops", "Stack, local, upvalue, registry, and hook manipulation"], ["Does not stop", "Capabilities already captured by allowed values"]] },
  { label: "Budget", fields: [["Control", "Instruction hook plus wall-clock and memory policy"], ["Stops", "Many unbounded Lua bytecode loops"], ["Does not stop", "A blocking C call or every native-resource failure"]] },
  { label: "Isolation", fields: [["Control", "Separate state/process with narrow IPC and OS limits"], ["Stops", "Failure propagation beyond the chosen boundary"], ["Does not stop", "Incorrect protocol authorization or excessive granted capability"]], alert: "For hostile code, a reduced global environment is only one layer. The security boundary must include capabilities, resource limits, and host isolation." },
] as const;

export function PilDebugIntrospectionLab() {
  return <LuaOfficialLab cases={introspectionCases} caption="Function metadata, stack frames, locals, and upvalues expose progressively stronger reflective powers." tone="cyan" />;
}

export function PilDebugHookLab() {
  return <LuaOfficialLab cases={hookCases} caption="Call, return, line, and count events trade observability for runtime overhead and re-entry risk." tone="amber" />;
}

export function PilSandboxBoundaryLab() {
  return <LuaOfficialLab cases={sandboxCases} caption="A sandbox needs an environment allowlist, no debug escape, bounded resources, and an isolation boundary." tone="rose" />;
}
