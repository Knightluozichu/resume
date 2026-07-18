"use client";

import { LuaOfficialLab } from "./official-lab";

const identityCases = [
  { label: "Assign", fields: [["Operation", "b = a"], ["Result", "Both bindings reference one table"], ["Evidence", "Mutation through b is visible through a"]] },
  { label: "Equal content", fields: [["Operation", "a = {}; b = {}"], ["Result", "Different table identities"], ["Evidence", "a == b is false"]] },
  { label: "Nil key", fields: [["Operation", "t[nil] = value"], ["Result", "Invalid table index"], ["Evidence", "Boundary rejects missing key"]] },
  { label: "Nil value", fields: [["Operation", "t[key] = nil"], ["Result", "Entry is removed"], ["Evidence", "pairs no longer yields the key"]], alert: "A table cannot preserve a present key whose stored value is nil; use a sentinel when presence and nil-like meaning must differ." },
] as const;

const sequenceCases = [
  { label: "Proper sequence", fields: [["Shape", "Integer keys 1..n, no holes"], ["Length", "#t is n"], ["Traversal", "ipairs yields every element in order"]] },
  { label: "Hole", fields: [["Shape", "A nil inside 1..n"], ["Length", "#t may select a border, not element count"], ["Traversal", "ipairs stops at first nil"]] },
  { label: "Map", fields: [["Shape", "Arbitrary non-nil keys"], ["Length", "# is not a map-size API"], ["Traversal", "pairs order is unspecified"]] },
  { label: "Mixed", fields: [["Shape", "Sequence and record keys together"], ["Length", "Only sequence border is relevant"], ["Traversal", "Use explicit APIs for each region"]] },
] as const;

const libraryCases = [
  { label: "insert/remove", fields: [["Contract", "Shift elements in a proper sequence"], ["Cost", "Potential O(n) movement"], ["Risk", "Holes and mixed keys are not repaired"]] },
  { label: "move", fields: [["Contract", "Copy a contiguous integer range, overlap-safe"], ["Cost", "Linear in moved elements"], ["Risk", "Source/target ranges and destination owner"]] },
  { label: "sort", fields: [["Contract", "In-place sequence reorder by strict comparator"], ["Cost", "Comparator called repeatedly"], ["Risk", "No stable-order guarantee; invalid comparator breaks ordering"]] },
  { label: "pack/unpack", fields: [["Contract", "Preserve argument count via n field; expand a range"], ["Cost", "Result/argument limits"], ["Risk", "Nil values require explicit upper bound"]] },
] as const;

export function PilTableIdentityLab() {
  return <LuaOfficialLab cases={identityCases} caption="Table assignment shares identity; nil keys are invalid and nil values remove entries." tone="cyan" />;
}

export function PilSequenceTraversalLab() {
  return <LuaOfficialLab cases={sequenceCases} caption="Proper sequences, sparse integer tables, maps, and mixed tables have different length and traversal contracts." tone="violet" />;
}

export function PilTableLibraryLab() {
  return <LuaOfficialLab cases={libraryCases} caption="Table-library operations assume explicit contiguous ranges, ownership, and comparator laws." tone="amber" />;
}
