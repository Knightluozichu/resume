"use client";

import { CtcOfficialLab } from "./official-lab";

const capabilityCases = [
  { label: "enumerable", fields: [["capability", "Sequential iteration"], ["not promised", "Count, indexing, repeatability"]] },
  { label: "collection", fields: [["capability", "Count plus add/remove/contains shape"], ["not promised", "Stable order or random access"]] },
  { label: "list", fields: [["capability", "Index-based ordered sequence"], ["not promised", "Cheap middle insert"]] },
  { label: "readonly", fields: [["capability", "Consumer cannot mutate via interface"], ["not promised", "Underlying source is immutable snapshot"]] },
] as const;

const structureCases = [
  { label: "array/list", fields: [["strength", "Cache-friendly indexed sequence"], ["cost", "Resize/middle insertion"]] },
  { label: "queue/stack", fields: [["strength", "FIFO/LIFO endpoint operations"], ["cost", "No arbitrary semantic search"]] },
  { label: "hash set/map", fields: [["strength", "Expected O(1) lookup"], ["cost", "Hash/equality and memory overhead"]] },
  { label: "sorted", fields: [["strength", "Ordered traversal/range"], ["cost", "O(log n), comparer consistency"]] },
] as const;

const immutableCases = [
  { label: "snapshot", fields: [["operation", "Publish immutable value"], ["evidence", "Old versions remain stable"]] },
  { label: "sharing", fields: [["operation", "Copy changed path only"], ["evidence", "Reference sharing without write alias"]] },
  { label: "builder", fields: [["operation", "Batch local mutations then freeze"], ["evidence", "Builder never escapes"]] },
  { label: "comparer", fields: [["operation", "Equality/order is construction state"], ["evidence", "Preserved across versions"]] },
] as const;

export function CtcCollectionCapabilityLab() { return <CtcOfficialLab cases={capabilityCases} caption="Collection interfaces promise capabilities, not hidden performance, ordering, or snapshot semantics." tone="cyan" />; }
export function CtcDataStructureChoiceLab() { return <CtcOfficialLab cases={structureCases} caption="Choose arrays, sequences, queues, hash collections, or sorted collections from workload and invariant evidence." tone="amber" />; }
export function CtcImmutableCollectionLab() { return <CtcOfficialLab cases={immutableCases} caption="Immutable collections combine versioned snapshots, structural sharing, local builders, and stable comparers." tone="emerald" />; }
