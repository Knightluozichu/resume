"use client";

import { LuaOfficialLab } from "./official-lab";

const sequenceCases = [
  { label: "Sequence", fields: [["Shape", "Integer keys 1..n without holes"], ["Operation", "Indexed access, append at n+1, ipairs traversal"], ["Risk", "A nil assignment breaks the sequence contract"]] },
  { label: "Nested matrix", fields: [["Shape", "matrix[row][column]"], ["Operation", "Rows can be allocated or replaced independently"], ["Risk", "Ragged rows and two lookups per element"]] },
  { label: "Flat matrix", fields: [["Shape", "data[(row-1)*columns+column]"], ["Operation", "One contiguous logical sequence"], ["Risk", "Dimension metadata and bounds must stay consistent"]] },
  { label: "Sparse matrix", fields: [["Shape", "Only non-default coordinates are stored"], ["Operation", "Nested row maps or encoded coordinate keys"], ["Risk", "Traversal order and zero/removal policy are explicit"]], alert: "The same table cannot safely be treated as a proper sequence, a sparse matrix, and a record without an API that separates those shapes." },
] as const;

const linkedCases = [
  { label: "Linked list", fields: [["State", "Head points to nodes with next links"], ["Cost", "O(1) prepend, O(n) search/index"], ["Invariant", "Every reachable node has a valid next or nil; cycles are policy"]] },
  { label: "Queue front", fields: [["State", "first index names the oldest item"], ["Cost", "O(1) pop by nil-ing the slot and incrementing first"], ["Invariant", "Empty when first is greater than last"]] },
  { label: "Queue back", fields: [["State", "last index names the newest item"], ["Cost", "O(1) push by incrementing last"], ["Invariant", "No table.remove shift from the front"]] },
  { label: "Deque", fields: [["State", "Both first and last can move"], ["Cost", "Amortized O(1) at both ends"], ["Invariant", "Popped slots are cleared so objects can be collected"]], alert: "Leaving popped values in numeric slots retains object graphs and may also make later traversal observe stale data." },
] as const;

const semanticCases = [
  { label: "Reverse map", fields: [["Shape", "reverse[value] = key"], ["Meaning", "Fast inverse lookup for a one-to-one relation"], ["Risk", "Duplicate values overwrite unless each value maps to a collection"]] },
  { label: "Set", fields: [["Shape", "set[value] = true"], ["Meaning", "Presence only"], ["Risk", "Assign nil to remove; false complicates membership idioms"]] },
  { label: "Bag", fields: [["Shape", "bag[value] = positive count"], ["Meaning", "Multiplicity"], ["Risk", "Delete the key when count reaches zero"]] },
  { label: "String buffer", fields: [["Shape", "Array of chunks plus table.concat"], ["Meaning", "Linear assembly of immutable strings"], ["Risk", "Chunk count/size and final allocation still need budgets"]], alert: "A set, bag, reverse index, and buffer all use tables but preserve different invariants; sharing mutation helpers between them is a correctness bug." },
] as const;

export function PilSequenceMatrixLab() {
  return <LuaOfficialLab cases={sequenceCases} caption="Sequence, nested, flat, and sparse layouts trade shape guarantees, metadata, locality, and traversal semantics." tone="cyan" />;
}

export function PilLinkedQueueLab() {
  return <LuaOfficialLab cases={linkedCases} caption="Linked lists and index-based queues optimize different operations while requiring explicit reachability and slot-clearing invariants." tone="violet" />;
}

export function PilSemanticStructureLab() {
  return <LuaOfficialLab cases={semanticCases} caption="Reverse maps, sets, bags, and string buffers reuse tables but assign different meanings to keys and values." tone="emerald" />;
}
