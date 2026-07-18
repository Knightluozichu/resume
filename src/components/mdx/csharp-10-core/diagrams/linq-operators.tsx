"use client";

import { CtcOfficialLab } from "./official-lab";

const shapeCases = [
  { label: "filter", fields: [["shape", "Sequence -> subset sequence"], ["risk", "Deferred predicate and order preserved"]] },
  { label: "select", fields: [["shape", "Sequence<A> -> Sequence<B>"], ["risk", "One output per input unless flattened"]] },
  { label: "select many", fields: [["shape", "Sequence<Sequence<B>> -> Sequence<B>"], ["risk", "Cardinality multiplication"]] },
  { label: "join", fields: [["shape", "Two keyed sequences -> pairs/groups"], ["risk", "Duplicate keys and empty sides"]] },
] as const;

const orderCases = [
  { label: "order", fields: [["contract", "Primary plus secondary comparer"], ["gate", "Deterministic tie-breaker"]] },
  { label: "group", fields: [["contract", "Key -> sequence of members"], ["gate", "Comparer and buffering behavior"]] },
  { label: "set", fields: [["contract", "Distinct/union/intersect/except"], ["gate", "Equality comparer and output order"]] },
  { label: "zip", fields: [["contract", "Pair by position"], ["gate", "Stops at shorter source"]] },
] as const;

const terminalCases = [
  { label: "element", fields: [["result", "First/Single/ElementAt"], ["empty/many", "Throw/default policy differs"]] },
  { label: "aggregate", fields: [["result", "Count/Sum/Aggregate"], ["empty/many", "Seed, overflow, precision"]] },
  { label: "quantifier", fields: [["result", "Any/All/Contains"], ["empty/many", "Short-circuit and vacuous truth"]] },
  { label: "materialize", fields: [["result", "Array/List/Dictionary/Lookup"], ["empty/many", "Snapshot, allocation, duplicate keys"]] },
] as const;

export function CtcOperatorShapeLab() { return <CtcOfficialLab cases={shapeCases} caption="Filtering, projection, flattening, and joining transform sequence shape and cardinality differently." tone="cyan" />; }
export function CtcOrderingSetLab() { return <CtcOfficialLab cases={orderCases} caption="Ordering, grouping, set algebra, and positional pairing depend on comparer and duplicate semantics." tone="violet" />; }
export function CtcTerminalOperatorLab() { return <CtcOfficialLab cases={terminalCases} caption="Element, aggregate, quantifier, and materialization operators define different empty, duplicate, and evaluation contracts." tone="amber" />; }
