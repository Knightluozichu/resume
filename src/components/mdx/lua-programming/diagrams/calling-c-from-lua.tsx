"use client";

import { LuaOfficialLab } from "./official-lab";

const functionCases = [
  { label: "Arguments", fields: [["Lua side", "Calls a registered C closure"], ["C stack", "Arguments occupy indexes 1..n"], ["Contract", "Validate count, type, range, and length"]] },
  { label: "Work", fields: [["Lua side", "Waits for the call result"], ["C stack", "May push temporary values"], ["Contract", "Own native resources and preserve cleanup paths"]] },
  { label: "Results", fields: [["Lua side", "Receives the declared result values"], ["C stack", "Top n values are returned"], ["Contract", "C return value is the number of Lua results"]] },
  { label: "Error", fields: [["Lua side", "Receives a Lua error through its protected caller"], ["C stack", "Error object becomes the non-local result"], ["Contract", "Release native resources before luaL_error/lua_error"]], alert: "The C function's integer return is a result count, not a status code. Raise errors with the Lua error protocol." },
] as const;

const continuationCases = [
  { label: "Enter", fields: [["Execution", "C function starts in a yieldable Lua call"], ["State", "Validate inputs and store durable resume context"], ["Rule", "Do not depend on automatic continuation of C locals"]] },
  { label: "Yield", fields: [["Execution", "lua_yieldk returns control to the resumer"], ["State", "lua_KContext and Lua-owned values identify the operation"], ["Rule", "Native resource ownership remains explicit"]] },
  { label: "Resume", fields: [["Execution", "Lua invokes the continuation function"], ["State", "status reports LUA_YIELD or protected-call outcome"], ["Rule", "Revalidate handles and consume resume arguments"]] },
  { label: "Finish", fields: [["Execution", "Continuation pushes final values and returns count"], ["State", "Operation registration is removed"], ["Rule", "Success, error, and cancel close exactly once"]], alert: "A continuation is a new C invocation with explicit context. The original automatic C stack frame is not a resumable storage area." },
] as const;

const moduleCases = [
  { label: "Search", fields: [["Loader", "package.searchers chooses a Lua or C search path"], ["Artifact", "Shared library compatible with this Lua ABI"], ["Risk", "Untrusted paths can load arbitrary native code"]] },
  { label: "Symbol", fields: [["Loader", "Resolves luaopen_modname"], ["Artifact", "Exported C entry point"], ["Risk", "Name, visibility, and linkage must match"]] },
  { label: "Open", fields: [["Loader", "Calls the entry point as a Lua C function"], ["Artifact", "luaL_Reg functions become closures in a table"], ["Risk", "Initialization can raise and must be idempotent by policy"]] },
  { label: "Cache", fields: [["Loader", "require records the returned module value"], ["Artifact", "One explicit API table"], ["Risk", "Hidden globals and mutable shared state complicate reload/tests"]], alert: "A C module is native code with process authority. package.cpath and module provenance are security policy, not mere convenience." },
] as const;

export function PilCFunctionFrameLab() {
  return <LuaOfficialLab cases={functionCases} caption="Lua arguments, C work, returned stack values, and raised errors form one C-function frame contract." tone="cyan" />;
}

export function PilContinuationLab() {
  return <LuaOfficialLab cases={continuationCases} caption="Enter, yield, continuation resume, and finish preserve state without relying on the discarded C frame." tone="violet" />;
}

export function PilCModuleLab() {
  return <LuaOfficialLab cases={moduleCases} caption="C-module loading searches an artifact, resolves luaopen, returns an API table, and caches it." tone="amber" />;
}
