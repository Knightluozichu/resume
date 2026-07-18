"use client";

import { LuaOfficialLab } from "./official-lab";

const dataFileCases = [
  { label: "Return value", fields: [["Form", "return { ... }"], ["Consumer", "Load the chunk and validate its single result"], ["Risk", "The file is executable Lua code, not passive syntax"]] },
  { label: "Record calls", fields: [["Form", "Entry { name=..., value=... }"], ["Consumer", "A narrow environment collects validated records"], ["Risk", "Every exposed function is a capability"]] },
  { label: "Text-only load", fields: [["Form", "loadfile(path, \"t\", environment)"], ["Consumer", "Reject binary chunks and choose globals"], ["Risk", "CPU and memory denial remain without process limits"]] },
  { label: "Schema gate", fields: [["Form", "version plus typed fields"], ["Consumer", "Validate before constructing domain objects"], ["Risk", "Unknown fields and migrations need explicit policy"]], alert: "A restricted environment narrows names but does not turn arbitrary Lua code into harmless data; loops and allocation can still consume resources." },
] as const;

const acyclicCases = [
  { label: "Scalar", fields: [["Input", "nil, boolean, bounded number, string"], ["Encoding", "Canonical Lua literal or another schema format"], ["Reject", "NaN/infinity and unsupported numeric precision by policy"]] },
  { label: "Sequence", fields: [["Input", "Proper sequence without holes"], ["Encoding", "Ordered list fields"], ["Reject", "Sparse indices unless the schema declares them"]] },
  { label: "Record", fields: [["Input", "Allowed scalar keys and values"], ["Encoding", "Sorted keys for deterministic output"], ["Reject", "Functions, userdata, threads, and metatables unless adapted"]] },
  { label: "Repeated table", fields: [["Input", "The same table reached twice"], ["Encoding", "A tree serializer would duplicate or recurse incorrectly"], ["Reject", "Treat as shared identity and switch to graph serialization"]], alert: "A no-cycle serializer also needs a seen set: repeated references may be aliases even when they do not form a cycle." },
] as const;

const graphCases = [
  { label: "Discover", fields: [["Pass", "Traverse table keys and values"], ["State", "Assign one stable ID per table identity"], ["Invariant", "Each reachable table appears exactly once"]] },
  { label: "Allocate", fields: [["Pass", "Emit an empty table for every ID"], ["State", "All identities now exist"], ["Invariant", "Forward and cyclic references can target allocated tables"]] },
  { label: "Link", fields: [["Pass", "Emit key/value assignments using IDs"], ["State", "Aliases and cycles are restored"], ["Invariant", "Key order and scalar encoding are deterministic"]] },
  { label: "Validate", fields: [["Pass", "Load in a constrained environment and validate schema"], ["State", "Map decoded tables to domain objects"], ["Invariant", "Depth, count, bytes, and version stay bounded"]], alert: "Serializing table contents without identity IDs changes the program: one shared table can become two copies, and cycles cannot be expressed as a finite constructor tree." },
] as const;

export function PilDataFileLab() {
  return <LuaOfficialLab cases={dataFileCases} caption="Lua data files can return values or call collector functions, but loading them still executes a chunk with explicit capabilities." tone="cyan" />;
}

export function PilAcyclicSerializationLab() {
  return <LuaOfficialLab cases={acyclicCases} caption="Acyclic serialization defines a closed value domain, deterministic key order, and a seen-reference policy." tone="violet" />;
}

export function PilGraphSerializationLab() {
  return <LuaOfficialLab cases={graphCases} caption="Identity-preserving serialization discovers tables, allocates every identity, links references, then validates the reconstructed graph." tone="amber" />;
}
