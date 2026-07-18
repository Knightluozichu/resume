"use client";

import { RubyOfficialLab } from "./official-lab";

const creationCases = [
  { label: "Literal", fields: [["Code", "{ name: \"Ruby\", score: 90 }"], ["Keys", "Symbols in keyword-style syntax"], ["Use", "Known records"]] },
  { label: "Hash.new", fields: [["Code", "Hash.new(0)"], ["Default", "Returned for every missing key"], ["Use", "Immutable default such as a counter zero"]] },
  { label: "Default block", fields: [["Code", "Hash.new { |h, k| h[k] = [] }"], ["Default", "Independent value created per key"], ["Use", "Grouping/adjacency lists"]] },
  { label: "Pairs", fields: [["Code", "Hash[[[:a, 1], [:b, 2]]]"], ["Input", "Enumerable key-value pairs"], ["Boundary", "Duplicate keys resolve by input order"]] },
] as const;

const accessCases = [
  { label: "[]", fields: [["Missing", "Returns configured default/nil"], ["Evidence", "Cannot alone prove key presence"], ["Use", "Optional lookup"]] },
  { label: "fetch", fields: [["Missing", "Raises KeyError or uses explicit default/block"], ["Evidence", "Required key boundary"], ["Use", "Schemas and configuration"]] },
  { label: "key? / value?", fields: [["key?", "Presence by Hash key semantics"], ["value?", "Linear search for a value"], ["Use", "Do not confuse presence with truthiness"]] },
  { label: "keys / values", fields: [["Result", "New Arrays"], ["Order", "Hash iteration/insertion order behavior"], ["Cost", "Materializes all entries"]] },
] as const;

const mutationCases = [
  { label: "Delete", fields: [["Methods", "delete, delete_if, reject!"], ["Missing", "nil or supplied block result"], ["Rule", "Avoid generic structural mutation during each"]] },
  { label: "Clear", fields: [["Method", "clear"], ["Effect", "Mutates same Hash object"], ["Aliasing", "All references observe empty state"]] },
  { label: "Merge", fields: [["Methods", "merge and merge!"], ["Conflict", "Later value or conflict block"], ["Rule", "Record precedence/provenance"]] },
  { label: "Count", fields: [["Pattern", "counts[word] += 1 with default 0"], ["Normalization", "Encoding, case, punctuation"], ["Output", "Sort by count and stable tie-breaker"]], alert: "A word-frequency Hash is only as correct as its tokenization and normalization contract." },
] as const;

export function RubyHashCreationLab() {
  return <RubyOfficialLab cases={creationCases} caption="Literal, static default, default block, and pair construction define different missing-value and ownership behavior." tone="cyan" />;
}

export function RubyHashAccessLab() {
  return <RubyOfficialLab cases={accessCases} caption="Optional lookup, required fetch, presence checks, and materialized keys/values provide different evidence and cost." tone="violet" />;
}

export function RubyHashMutationLab() {
  return <RubyOfficialLab cases={mutationCases} caption="Delete, clear, merge, and frequency counting expose mutation, conflict, aliasing, and normalization policy." tone="amber" />;
}
