"use client";

import { CvcOfficialLab } from "./official-lab";

const primitiveCases = [
  { label: "int", fields: [["CLR type", "System.Int32"], ["Default", "0"], ["Risk", "Overflow and numeric conversion"]] },
  { label: "decimal", fields: [["CLR type", "System.Decimal"], ["Default", "0m"], ["Risk", "Different range/performance from binary floating point"]] },
  { label: "string", fields: [["CLR type", "System.String"], ["Default", "null"], ["Risk", "Reference identity differs from ordinal/cultural equality"]] },
  { label: "dynamic", fields: [["CLR type", "Static representation is usually object plus dynamic metadata"], ["Default", "null"], ["Risk", "Member binding failures move to runtime"]] },
] as const;

const storageCases = [
  { label: "Class field", fields: [["Storage", "Inside heap object"], ["Assignment", "Reference copied"], ["Mutation", "Aliases observe same instance"]] },
  { label: "Struct local", fields: [["Storage", "Inline in containing storage/location"], ["Assignment", "All fields copied"], ["Mutation", "Copy changes independently"]] },
  { label: "Box", fields: [["Storage", "New heap object with copied struct data"], ["Assignment", "Object reference copied"], ["Mutation", "Interface call may mutate boxed copy"]] },
  { label: "Unbox", fields: [["Storage", "Typed access to boxed payload then value copy"], ["Assignment", "Requires exact boxed value type"], ["Mutation", "Ordinary cast returns a separate value"]], alert: "Unboxing is not numeric conversion: a boxed Int32 cannot be directly unboxed as Int64." },
] as const;

const equalityCases = [
  { label: "Identity", fields: [["Question", "Are these references the same object?"], ["Mechanism", "ReferenceEquals"], ["Invariant", "Independent of value equality override"]] },
  { label: "Value equality", fields: [["Question", "Do domain values represent the same thing?"], ["Mechanism", "Equals/IEquatable<T>/operators"], ["Invariant", "Symmetric, transitive, consistent"]] },
  { label: "Hash", fields: [["Question", "Which bucket may contain an equal value?"], ["Mechanism", "GetHashCode plus comparer"], ["Invariant", "Equal values must hash equally while in collection"]] },
  { label: "Dynamic bind", fields: [["Question", "Which member/operator fits runtime operands?"], ["Mechanism", "DLR call site and binder"], ["Invariant", "Failure is runtime and must be tested"]], alert: "A hash code is neither an identity nor a unique key; collisions are valid." },
] as const;

export function CvcPrimitiveMappingLab() { return <CvcOfficialLab cases={primitiveCases} caption="Language keywords map to CLR types while preserving distinct numeric, reference, and dynamic contracts." tone="cyan" />; }
export function CvcValueStorageLab() { return <CvcOfficialLab cases={storageCases} caption="Inline storage, reference aliasing, boxing, and unboxing determine copies, allocation, and mutation visibility." tone="violet" />; }
export function CvcEqualityHashLab() { return <CvcOfficialLab cases={equalityCases} caption="Identity, value equality, hashing, and dynamic binding must each preserve their own invariants." tone="amber" />; }
