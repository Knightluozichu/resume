"use client";

import { LuaOfficialLab } from "./official-lab";

const classCases = [
  { label: "Class table", fields: [["Role", "Stores shared methods and class defaults"], ["Lookup", "Instance __index delegates missing fields to the class"], ["Risk", "Mutable defaults on the class are shared by every instance"]] },
  { label: "Instance", fields: [["Role", "Stores per-object state and identity"], ["Lookup", "Raw fields shadow class methods/defaults"], ["Risk", "A data field can accidentally replace a method name"]] },
  { label: "Colon call", fields: [["Role", "obj:method(x) passes obj as self"], ["Lookup", "Method is resolved before the call"], ["Risk", "Dot/colon mismatch shifts every argument"]] },
  { label: "Constructor", fields: [["Role", "Allocates, validates, and attaches the class metatable"], ["Lookup", "Returned identity owns its state"], ["Risk", "Calling the wrong class/super constructor can attach the wrong prototype"]], alert: "Lua has no privileged class keyword. A class pattern is a table/metatable/constructor contract that ordinary code can mutate unless the API controls access." },
] as const;

const inheritanceCases = [
  { label: "Single", fields: [["Graph", "Instance -> subclass -> base"], ["Dispatch", "First raw method found along __index links"], ["Invariant", "Subclass overrides do not copy base methods"]] },
  { label: "Super call", fields: [["Graph", "Subclass method names the chosen base implementation"], ["Dispatch", "Call base.method(self, ...) explicitly"], ["Invariant", "self stays the most-derived instance"]] },
  { label: "Multiple", fields: [["Graph", "Class searches an ordered parent list"], ["Dispatch", "First matching parent wins by declared policy"], ["Invariant", "Conflicts and diamonds are rejected or resolved deterministically"]] },
  { label: "Cached lookup", fields: [["Graph", "Resolved parent method is copied into the child class"], ["Dispatch", "Later calls become raw hits"], ["Invariant", "Parent mutation needs invalidation or immutable class definitions"]], alert: "Multiple inheritance is a search policy over parent tables. Parent order is observable API and must not depend on pairs traversal." },
] as const;

const privacyCases = [
  { label: "Closure privacy", fields: [["Interface", "Methods close over a private state table"], ["Capability", "Only returned functions can reach state"], ["Tradeoff", "Each object may allocate distinct closures"]] },
  { label: "Single method", fields: [["Interface", "One closure receives an operation and arguments"], ["Capability", "The closure is the object identity"], ["Tradeoff", "Operation names and result shapes need one dispatch protocol"]] },
  { label: "Dual representation", fields: [["Interface", "Public object and private state are separate identities"], ["Capability", "Methods map public self to hidden state"], ["Tradeoff", "Mapping lifecycle and leaks must be controlled"]] },
  { label: "Facade", fields: [["Interface", "Expose only narrow methods or snapshots"], ["Capability", "Callers cannot directly mutate hidden fields"], ["Tradeoff", "Debug/raw/C capabilities can still bypass cooperative conventions"]], alert: "Privacy in Lua is reachability control. If the private table, backing map, or privileged closure leaks, the boundary is gone." },
] as const;

export function PilClassDispatchLab() {
  return <LuaOfficialLab cases={classCases} caption="A Lua class pattern separates shared method storage, per-instance state, colon dispatch, and validated construction." tone="cyan" />;
}

export function PilInheritanceLab() {
  return <LuaOfficialLab cases={inheritanceCases} caption="Inheritance is an ordered prototype lookup graph with explicit override, super-call, conflict, and caching policies." tone="violet" />;
}

export function PilObjectPrivacyLab() {
  return <LuaOfficialLab cases={privacyCases} caption="Closure privacy, single-method objects, dual representation, and facades control which references carry mutation capability." tone="emerald" />;
}
