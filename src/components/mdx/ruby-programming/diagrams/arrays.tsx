"use client";

import { RubyOfficialLab } from "./official-lab";

const creationCases = [
  { label: "Literal", fields: [["Code", "[1, 2, 3]"], ["Use", "Known elements"], ["Ownership", "Stores references to the listed objects"]] },
  { label: "Array.new", fields: [["Code", "Array.new(3) { |i| i * 2 }"], ["Use", "Generated independent values"], ["Risk", "Static mutable default is shared"]] },
  { label: "%w / %i", fields: [["Code", "%w[red green] / %i[red green]"], ["Use", "Whitespace-separated Strings/Symbols"], ["Boundary", "No spaces inside an item without escaping"]] },
  { label: "Conversion", fields: [["Code", "range.to_a or text.split(',')"], ["Use", "Materialize another shape"], ["Risk", "Memory and parsing semantics"]] },
] as const;

const operationCases = [
  { label: "Index", fields: [["Read", "array[index], fetch, values_at"], ["Write", "array[index] = value"], ["Boundary", "Negative, range, missing, sparse growth"]] },
  { label: "Set", fields: [["Ops", "&, |, -"], ["Equality", "Element equality/hash semantics"], ["Order", "Result order follows API behavior, not mathematical sets"]] },
  { label: "Stack", fields: [["Ops", "push/<< and pop"], ["End", "Tail of the Array"], ["Cost", "Usually efficient tail operations"]] },
  { label: "Queue", fields: [["Ops", "push and shift"], ["End", "Append tail, remove head"], ["Cost", "Head removal shifts elements; benchmark large queues"]] },
] as const;

const traversalCases = [
  { label: "Map/filter", fields: [["Methods", "map, select, reject"], ["Result", "New Arrays"], ["Rule", "Use non-bang forms unless mutation is owned"]] },
  { label: "In-place", fields: [["Methods", "map!, delete_if, compact!"], ["Result", "Mutate receiver; some bang methods return nil when unchanged"], ["Rule", "Do not structurally mutate during generic each"]] },
  { label: "Matrix", fields: [["Code", "Array.new(rows) { Array.new(cols, 0) }"], ["Shape", "Independent row Arrays"], ["Risk", "Array.new(rows, same_row) aliases every row"]] },
  { label: "Zip", fields: [["Code", "left.zip(right)"], ["Result", "Rows paired by index"], ["Missing", "Shorter arrays contribute nil"]], alert: "Array APIs often tolerate missing shape by returning nil; validate dimensions when shape is an invariant." },
] as const;

export function RubyArrayCreationLab() {
  return <RubyOfficialLab cases={creationCases} caption="Literals, generators, word/symbol forms, and conversions create Arrays with different ownership and parsing behavior." tone="cyan" />;
}

export function RubyArrayOperationsLab() {
  return <RubyOfficialLab cases={operationCases} caption="Index, set-like, stack, and queue operations expose distinct equality, ordering, and cost contracts." tone="violet" />;
}

export function RubyArrayTraversalLab() {
  return <RubyOfficialLab cases={traversalCases} caption="Transform, in-place mutation, matrix construction, and zip require explicit shape and aliasing guarantees." tone="amber" />;
}
