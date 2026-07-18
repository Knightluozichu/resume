"use client";

import { CvcOfficialLab } from "./official-lab";

const shapeCases = [
  { label: "SZ array", fields: [["Shape", "One-dimensional, zero lower bound"], ["Access", "Fast vector indexing"], ["Example", "int[]"]] },
  { label: "Rectangular", fields: [["Shape", "One object with multiple dimensions"], ["Access", "GetLength/rank-aware indexing"], ["Example", "int[,]"]] },
  { label: "Jagged", fields: [["Shape", "Array of array references"], ["Access", "Rows may differ/null"], ["Example", "int[][]"]] },
  { label: "Non-zero lower", fields: [["Shape", "System.Array with custom bounds"], ["Access", "GetLowerBound/GetValue"], ["Example", "Reflection/interop legacy"]], alert: "An array's rank and lower bounds are part of its runtime shape; Length alone is insufficient." },
] as const;

const typeCases = [
  { label: "Reference covariance", fields: [["Conversion", "Derived[] to Base[]"], ["Write", "Runtime checks actual element array type"], ["Failure", "ArrayTypeMismatchException"]] },
  { label: "Value array", fields: [["Conversion", "No covariance to object[]"], ["Write", "Elements inline"], ["Failure", "Box each element only through enumeration/object path"]] },
  { label: "Generic view", fields: [["Conversion", "SZ arrays implement generic list/collection interfaces"], ["Write", "Fixed-size; some mutators unsupported"], ["Failure", "Capability mismatch"]] },
  { label: "Span view", fields: [["Conversion", "Contiguous memory slice without ownership"], ["Write", "Mutable or readonly span"], ["Failure", "Lifetime/ref-safety restrictions"]] },
] as const;

const boundaryCases = [
  { label: "Pass", fields: [["Value", "Array reference copied"], ["Ownership", "Caller/callee alias same storage"], ["Control", "ReadOnlySpan/read-only contract or copy"]] },
  { label: "Return", fields: [["Value", "Reference to array"], ["Ownership", "May expose internal mutable state"], ["Control", "Snapshot, immutable collection, pool owner"]] },
  { label: "Pin", fields: [["Value", "Stable address during fixed/pin"], ["Ownership", "GC cannot move object"], ["Control", "Keep scope short and define native lifetime"]] },
  { label: "Pool", fields: [["Value", "Borrowed array often larger than request"], ["Ownership", "Must return exactly once"], ["Control", "Track logical length and clear sensitive data"]], alert: "Array pooling changes ownership and data-remanence rules; it is not a transparent allocation optimization." },
] as const;

export function CvcArrayShapeLab() { return <CvcOfficialLab cases={shapeCases} caption="Vector, rectangular, jagged, and custom-bound arrays have different shape and access contracts." tone="cyan" />; }
export function CvcArrayTypeLab() { return <CvcOfficialLab cases={typeCases} caption="Covariance, inline value storage, generic interfaces, and spans expose different type-safety and mutation behavior." tone="violet" />; }
export function CvcArrayBoundaryLab() { return <CvcOfficialLab cases={boundaryCases} caption="Passing, returning, pinning, and pooling arrays require explicit alias, lifetime, and cleanup ownership." tone="amber" />; }
