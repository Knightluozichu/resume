"use client";

import { CfpOfficialLab } from "./official-lab";

const mutationCases = [
  { label: "alias write", fields: [["state", "Two references share one mutable object"], ["risk", "A local write changes another observer"]] },
  { label: "copy", fields: [["state", "A new immutable value is created"], ["risk", "Old and new observations remain distinct"]] },
  { label: "concurrent", fields: [["state", "Multiple writers update shared identity"], ["risk", "Order and synchronization become semantics"]] },
  { label: "snapshot", fields: [["state", "Readers hold versioned immutable state"], ["risk", "Memory/version retention replaces write races"]] },
] as const;

const identityCases = [
  { label: "value", fields: [["sameness", "Equal contents represent the same value"], ["change", "Return a different value"]] },
  { label: "entity", fields: [["sameness", "Stable identity persists across state versions"], ["change", "Transition from old state to new state"]] },
  { label: "event", fields: [["sameness", "An immutable fact with its own id/order"], ["change", "Fold facts to derive entity state"]] },
  { label: "reference", fields: [["sameness", "Same memory object"], ["change", "Not a sufficient domain identity model"]] },
] as const;

const structureCases = [
  { label: "full copy", fields: [["update", "Duplicate the whole collection"], ["cost", "Simple but O(n) memory/work"]] },
  { label: "structural share", fields: [["update", "Copy changed path, reuse unchanged nodes"], ["cost", "Persistent versions with logarithmic/path cost"]] },
  { label: "builder", fields: [["update", "Local mutable construction then immutable publish"], ["cost", "Efficient boundary when alias cannot escape"]] },
  { label: "retention", fields: [["update", "Many old versions stay referenced"], ["cost", "Sharing helps copies but history still consumes memory"]] },
] as const;

export function CfpMutationAliasLab() { return <CfpOfficialLab cases={mutationCases} caption="Mutation cost comes from aliases, ordering, and ownership; immutable snapshots trade writes for explicit versions." tone="rose" />; }
export function CfpIdentityChangeLab() { return <CfpOfficialLab cases={identityCases} caption="Value equality, entity identity, event identity, and object reference answer different sameness questions." tone="cyan" />; }
export function CfpPersistentStructureLab() { return <CfpOfficialLab cases={structureCases} caption="Functional data structures preserve old versions through structural sharing, with explicit construction and retention costs." tone="emerald" />; }
