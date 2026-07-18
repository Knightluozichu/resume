"use client";

import { LuaOfficialLab } from "./official-lab";

const closureCases = [
  { label: "Factory", fields: [["Action", "Create the iterator closure and private state"], ["Ownership", "Each factory call owns an independent state"], ["Risk", "Reusing one iterator interleaves consumption"]] },
  { label: "Yield value", fields: [["Action", "Advance state and return one or more values"], ["Ownership", "The closure controls the next position"], ["Risk", "A false first value still means continue"]] },
  { label: "Finish", fields: [["Action", "Return nil as the first result"], ["Ownership", "The generic for stops"], ["Risk", "Resources captured by an abandoned iterator may remain open"]] },
  { label: "Reset/reuse", fields: [["Action", "Create a new iterator rather than rewinding hidden state"], ["Ownership", "State lifecycle stays explicit"], ["Risk", "Stateful iterators are usually not reentrant"]], alert: "An iterator closure is a consumable state machine. Saving the function does not imply it can be restarted or shared between loops." },
] as const;

const protocolCases = [
  { label: "Evaluate", fields: [["Phase", "Evaluate the expression list once"], ["State", "iterator function, invariant state, initial control"], ["Invariant", "Changing source expressions later does not rebuild the triple"]] },
  { label: "Call", fields: [["Phase", "iterator(state, control)"], ["State", "Returns next control and loop values"], ["Invariant", "Arguments are supplied by the loop, not by the body"]] },
  { label: "Update", fields: [["Phase", "Set internal control to the first result"], ["State", "Expose returned values as fresh loop locals"], ["Invariant", "Body assignment does not rewrite the hidden control"]] },
  { label: "Terminate", fields: [["Phase", "Stop when the first result is nil"], ["State", "False and zero are valid control values"], ["Invariant", "The iterator must eventually make progress to nil"]], alert: "Only the first iterator result controls termination. Additional nil results are data, while a first false result does not stop the loop." },
] as const;

const styleCases = [
  { label: "Stateless", fields: [["Example", "next or an ipairs-style iterator"], ["State", "All state comes from invariant state and control"], ["Tradeoff", "Reentrant when the underlying collection policy permits"]] },
  { label: "Ordered", fields: [["Example", "Collect keys, sort, then iterate the key sequence"], ["State", "Snapshot of key order plus position"], ["Tradeoff", "O(n) memory and O(n log n) sort"]] },
  { label: "Generator", fields: [["Example", "Generic-for iterator returns each value"], ["State", "Caller owns break and loop body"], ["Tradeoff", "One call/result transition per item"]] },
  { label: "True iterator", fields: [["Example", "Traversal calls a callback for each item"], ["State", "Traversal owns the loop"], ["Tradeoff", "Early stop, errors, and multiple loops need an explicit callback protocol"]], alert: "Ordered traversal is a snapshot policy. Mutating the source after key collection can remove values or introduce keys that the iterator will not visit." },
] as const;

export function PilIteratorClosureLab() {
  return <LuaOfficialLab cases={closureCases} caption="Closure iterators are independently created, stateful, consumable machines that finish by returning nil first." tone="cyan" />;
}

export function PilGenericForProtocolLab() {
  return <LuaOfficialLab cases={protocolCases} caption="Generic for evaluates an iterator triple once, calls it with state/control, updates control, and stops on first-result nil." tone="violet" />;
}

export function PilIteratorStyleLab() {
  return <LuaOfficialLab cases={styleCases} caption="Stateless, ordered, generator, and callback-driven iterators trade state ownership, ordering cost, and control flow." tone="emerald" />;
}
