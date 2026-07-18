"use client";

import { CvcOfficialLab } from "./official-lab";

const graphCases = [
  { label: "Discover graph", fields: [["Formatter task", "Track roots, object identity, cycles"], ["Contract", "Which members/types participate"], ["Risk", "Unexpected private state and huge graph"]] },
  { label: "Write", fields: [["Formatter task", "Emit type/member/value records"], ["Contract", "Version and type identity"], ["Risk", "Sensitive data and unbounded output"]] },
  { label: "Allocate", fields: [["Formatter task", "Create objects, sometimes without constructors"], ["Contract", "Allowed types and invariants"], ["Risk", "Gadget activation and invalid state"]] },
  { label: "Fix up", fields: [["Formatter task", "Restore references/cycles and callbacks"], ["Contract", "Deserialization ordering"], ["Risk", "Callbacks observe partial graph"]], alert: "BinaryFormatter-style object graph deserialization is unsafe for untrusted data and should not be enabled in modern systems." },
] as const;

const controlCases = [
  { label: "Serializable", fields: [["Mechanism", "Type opt-in and default field graph"], ["Control", "NonSerialized/callbacks"], ["Risk", "Private layout becomes persistence contract"]] },
  { label: "ISerializable", fields: [["Mechanism", "Type writes named values and special constructor reads"], ["Control", "Full custom graph payload"], ["Risk", "Version, base chaining, security"]] },
  { label: "Surrogate", fields: [["Mechanism", "External object serialization policy"], ["Control", "SurrogateSelector by type/context"], ["Risk", "Hidden substitution and chain order"]] },
  { label: "Binder", fields: [["Mechanism", "Map serialized assembly/type names"], ["Control", "Allowlist and version translation"], ["Risk", "Type confusion/gadget if permissive"]] },
] as const;

const modernCases = [
  { label: "JSON DTO", fields: [["Shape", "Explicit public data contract"], ["Version", "Named fields and optional additions"], ["Security", "Allowlisted DTO types, bounded parser"]] },
  { label: "Protobuf", fields: [["Shape", "Schema field numbers and messages"], ["Version", "Reserved tags/unknown preservation"], ["Security", "Bound size/depth and validate domain"]] },
  { label: "Database", fields: [["Shape", "Normalized/versioned persistence model"], ["Version", "Migrations and compatibility windows"], ["Security", "Parameterized access and authorization"]] },
  { label: "Object graph", fields: [["Shape", "Legacy BinaryFormatter/ISerializable"], ["Version", "Private type identity/layout coupling"], ["Security", "Trusted-only is still fragile; migrate"]], alert: "Persist stable data contracts, not arbitrary runtime object identity and private layout." },
] as const;

export function CvcSerializationGraphLab() { return <CvcOfficialLab cases={graphCases} caption="Graph discovery, writing, allocation, and fixups expose identity, ordering, size, and code-execution hazards." tone="rose" />; }
export function CvcSerializationControlLab() { return <CvcOfficialLab cases={controlCases} caption="Serializable defaults, ISerializable, surrogates, and binders trade convenience for deeper coupling and security responsibility." tone="violet" />; }
export function CvcSerializationMigrationLab() { return <CvcOfficialLab cases={modernCases} caption="Explicit JSON, protobuf, and database contracts provide clearer evolution than arbitrary object graph persistence." tone="amber" />; }
