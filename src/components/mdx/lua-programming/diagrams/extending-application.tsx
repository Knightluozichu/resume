"use client";

import { LuaOfficialLab } from "./official-lab";

const hostCases = [
  { label: "Load", fields: [["Host action", "Compile and protected-call a configuration chunk"], ["Stack", "Chunk/error is consumed or handled"], ["Boundary", "Only the intended environment is available"]] },
  { label: "Lookup", fields: [["Host action", "Push a named global or table field"], ["Stack", "+1 value"], ["Boundary", "Missing and wrong-type values are distinct"]] },
  { label: "Convert", fields: [["Host action", "Read with a checked conversion"], ["Stack", "0 delta"], ["Boundary", "Copy strings that outlive their stack value"]] },
  { label: "Restore", fields: [["Host action", "Pop temporary values or reset saved top"], ["Stack", "Returns to entry top"], ["Boundary", "Success and failure satisfy the same helper contract"]], alert: "Configuration is executable Lua code. Its environment and resource limits define the authority granted by the host." },
] as const;

const tableCases = [
  { label: "gettable", fields: [["Inputs", "Table plus key on top"], ["Effect", "Pops key, pushes value"], ["Semantics", "May invoke __index"]] },
  { label: "getfield", fields: [["Inputs", "Table index plus C string key"], ["Effect", "Pushes value"], ["Semantics", "Convenience lookup, may invoke __index"]] },
  { label: "geti", fields: [["Inputs", "Table index plus integer key"], ["Effect", "Pushes value"], ["Semantics", "Convenience numeric lookup"]] },
  { label: "rawget", fields: [["Inputs", "Table and key, or raw integer shortcut"], ["Effect", "Pushes stored value"], ["Semantics", "Bypasses metamethod dispatch"]], alert: "Choose ordinary or raw access intentionally. The difference is observable behavior, not only a shorter spelling." },
] as const;

const callCases = [
  { label: "Function", fields: [["Action", "Push and validate the Lua callable"], ["Stack", "+1"], ["Failure", "Missing/non-function value is a host contract error"]] },
  { label: "Arguments", fields: [["Action", "Push n arguments in call order"], ["Stack", "+n"], ["Failure", "Capacity or conversion policy fails before the call"]] },
  { label: "pcall", fields: [["Action", "Protected call with explicit nargs/nresults"], ["Stack", "Consumes function/args; pushes results or error"], ["Failure", "Preserve traceback before restoring top"]] },
  { label: "Results", fields: [["Action", "Validate and copy result values"], ["Stack", "Restore saved base"], ["Failure", "Wrong result shape is reported like any boundary error"]], alert: "A generic call helper is a tiny foreign-function interface. Parse its signature first and make all output ownership explicit." },
] as const;

export function PilHostConfigLab() {
  return <LuaOfficialLab cases={hostCases} caption="Loading, looking up, converting, and restoring define a balanced host configuration read." tone="cyan" />;
}

export function PilTableApiLab() {
  return <LuaOfficialLab cases={tableCases} caption="Table APIs differ in key placement, stack effects, and whether metamethods are honored." tone="amber" />;
}

export function PilHostCallLab() {
  return <LuaOfficialLab cases={callCases} caption="Host-to-Lua calls push a function and arguments, cross pcall, validate results, and restore the stack." tone="emerald" />;
}
