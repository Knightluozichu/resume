"use client";

import { LuaOfficialLab } from "./official-lab";

const globalCases = [
  { label: "Free name", fields: [["Source", "value = answer + 1"], ["Resolution", "Equivalent environment indexing for non-local names"], ["Risk", "A typo silently creates/reads a different global unless checked"]] },
  { label: "Dynamic name", fields: [["Source", "environment[name]"], ["Resolution", "The string is data, not source code"], ["Risk", "Validate allowed names and value ownership"]] },
  { label: "_G", fields: [["Source", "_G[name]"], ["Resolution", "Conventional reference to the global table"], ["Risk", "Rebinding _G does not magically rebind lexical _ENV"]] },
  { label: "Declaration", fields: [["Source", "declare(name, initial)"], ["Resolution", "Record permission then rawset the environment"], ["Risk", "Metamethod-only checks miss writes to already-existing raw keys"]], alert: "Global-name checking is a development contract, not isolation. Any code with rawset, debug, or the backing environment can bypass it." },
] as const;

const lexicalCases = [
  { label: "Outer _ENV", fields: [["Scope", "Chunk or enclosing function environment"], ["Lookup", "Free names use the captured _ENV binding"], ["Invariant", "Ordinary locals still win before environment lookup"]] },
  { label: "Local _ENV", fields: [["Scope", "From local declaration to block end"], ["Lookup", "Following free names use the new table"], ["Invariant", "Initializer reads the previous outer _ENV"]] },
  { label: "Nested function", fields: [["Scope", "Closure captures the visible _ENV upvalue"], ["Lookup", "Later calls keep that lexical environment"], ["Invariant", "Caller locals do not dynamically replace it"]] },
  { label: "Module scope", fields: [["Scope", "A module-local environment or explicit M table"], ["Lookup", "Exports and imported dependencies are deliberately separated"], ["Invariant", "No accidental fallback to all globals"]], alert: "_ENV follows lexical scope like another local/upvalue. It is not dynamically selected from the caller's environment." },
] as const;

const loadCases = [
  { label: "Compile", fields: [["Input", "Text source, chunk name, mode, environment"], ["Result", "A function or syntax error"], ["Boundary", "No chunk code has run yet"]] },
  { label: "Execute", fields: [["Input", "Call the compiled function"], ["Result", "Chunk results or runtime error"], ["Boundary", "Globals resolve through the supplied environment"]] },
  { label: "Capability", fields: [["Input", "Values reachable from environment entries"], ["Result", "Chunk can call or mutate everything it reaches"], ["Boundary", "Expose narrow wrappers, not whole powerful libraries"]] },
  { label: "Resource", fields: [["Input", "Loops, allocations, recursion"], ["Result", "Can consume CPU/memory without any globals"], ["Boundary", "Use a separate state/process and hard budgets"]], alert: "An empty load environment removes names, not computation. Arbitrary source remains executable and must not be treated as passive configuration." },
] as const;

export function PilGlobalNameLab() {
  return <LuaOfficialLab cases={globalCases} caption="Free names, dynamic indexing, _G, and declaration helpers all operate on environment tables with different bypass risks." tone="cyan" />;
}

export function PilLexicalEnvironmentLab() {
  return <LuaOfficialLab cases={lexicalCases} caption="_ENV is a lexical binding: blocks and closures capture a specific environment while ordinary locals remain direct bindings." tone="violet" />;
}

export function PilLoadEnvironmentLab() {
  return <LuaOfficialLab cases={loadCases} caption="load separates compilation from execution and injects a name environment, but resource and reachable-capability isolation remain external." tone="rose" />;
}
