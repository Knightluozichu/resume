"use client";

import { LuaOfficialLab } from "./official-lab";

const dispatchCases = [
  { label: "Arithmetic", fields: [["Hook", "__add, __sub, __mul, __unm and peers"], ["Dispatch", "Use an operand metatable when primitive arithmetic cannot finish"], ["Invariant", "Coerce/check both operands and return the documented domain type"]] },
  { label: "Equality", fields: [["Hook", "__eq under Lua's compatible-metatable rules"], ["Dispatch", "Raw identity wins before metamethod comparison"], ["Invariant", "Reflexive, symmetric, and consistent with domain identity"]] },
  { label: "Ordering", fields: [["Hook", "__lt and __le"], ["Dispatch", "<= can use a language-defined fallback when __le is absent"], ["Invariant", "Comparator is strict/transitive and rejects incompatible domains"]] },
  { label: "Library hooks", fields: [["Hook", "__tostring, __pairs, __metatable"], ["Dispatch", "Called by cooperating base-library operations"], ["Invariant", "Formatting/traversal do not leak hidden mutable state"]], alert: "Metamethods are protocol hooks, not arbitrary operator overloading. Unsupported mixed operands should fail clearly instead of guessing a coercion." },
] as const;

const indexCases = [
  { label: "Raw hit", fields: [["Read", "rawget(table, key) is non-nil"], ["Action", "Return it without calling __index"], ["Risk", "Stored false is still a hit; stored nil is impossible"]] },
  { label: "Index table", fields: [["Read", "Missing key and __index is a table"], ["Action", "Repeat lookup in the fallback/prototype table"], ["Risk", "Long/cyclic chains and shared mutable defaults"]] },
  { label: "Index function", fields: [["Read", "Missing key and __index is a function"], ["Action", "Call with table and key"], ["Risk", "A read can execute code, allocate, log, or fail"]] },
  { label: "Default", fields: [["Read", "Missing key under a default-value policy"], ["Action", "Return a constant or compute one"], ["Risk", "Returning a default does not insert the key unless done explicitly"]], alert: "__index is consulted only after a raw miss. It cannot distinguish 'never assigned' from 'assigned nil and therefore removed' without extra state." },
] as const;

const writeCases = [
  { label: "Raw existing", fields: [["Write", "The key already exists in the target"], ["Action", "Assign directly; __newindex is bypassed"], ["Risk", "A metatable on a populated table cannot observe every update"]] },
  { label: "Newindex table", fields: [["Write", "Missing key and __newindex is a table"], ["Action", "Redirect assignment to that table"], ["Risk", "Ownership and visibility split across two tables"]] },
  { label: "Newindex function", fields: [["Write", "Missing key and __newindex is a function"], ["Action", "Validate/log then rawset an intended backing table"], ["Risk", "Normal assignment inside the hook can recurse"]] },
  { label: "Proxy", fields: [["Write", "Public proxy stays raw-empty"], ["Action", "All ordinary reads/writes route to hidden storage hooks"], ["Risk", "rawset and leaked backing references bypass policy"]], alert: "To track or reject every ordinary write, expose an empty proxy. Putting __newindex on the storage table misses assignments to keys already present." },
] as const;

export function PilMetamethodDispatchLab() {
  return <LuaOfficialLab cases={dispatchCases} caption="Arithmetic, relational, and library-defined metamethods each have specific dispatch and algebraic contracts." tone="cyan" />;
}

export function PilIndexDefaultLab() {
  return <LuaOfficialLab cases={indexCases} caption="Table reads return raw hits first, then delegate a miss to an __index table or function for prototypes and defaults." tone="violet" />;
}

export function PilNewIndexProxyLab() {
  return <LuaOfficialLab cases={writeCases} caption="__newindex sees only raw misses; an empty proxy is required to mediate every ordinary assignment." tone="rose" />;
}
