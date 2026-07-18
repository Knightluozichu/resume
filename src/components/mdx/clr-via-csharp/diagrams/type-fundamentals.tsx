"use client";

import { CvcOfficialLab } from "./official-lab";

const objectCases = [
  { label: "Reference type", fields: [["Value", "Reference to an object or null"], ["Object header", "Runtime type and synchronization/GC information"], ["Copy", "Copies the reference, not the object"]] },
  { label: "Value type", fields: [["Value", "Inline data representation"], ["Object header", "Only after boxing"], ["Copy", "Copies the value fields"]] },
  { label: "Boxed value", fields: [["Value", "Reference to heap object containing a copied value"], ["Object header", "Present"], ["Copy", "Boxing allocates; unboxing retrieves the value"]] },
  { label: "System.Object", fields: [["Value", "Common assignable reference surface"], ["Object header", "Actual runtime type still preserved"], ["Copy", "Virtual methods dispatch by runtime type"]], alert: "All types participate in System.Object semantics, but a value type is not permanently stored as an object reference." },
] as const;

const castCases = [
  { label: "Implicit", fields: [["Check", "Compiler proves conversion"], ["Failure", "No runtime cast exception expected"], ["Use", "Derived-to-base or compatible reference conversion"]] },
  { label: "Explicit", fields: [["Check", "Runtime verifies actual object type"], ["Failure", "InvalidCastException"], ["Use", "Base-to-derived when invariant guarantees type"]] },
  { label: "is pattern", fields: [["Check", "Runtime test plus scoped variable"], ["Failure", "False branch"], ["Use", "Branching by type without duplicate cast"]] },
  { label: "as", fields: [["Check", "Runtime reference/nullable conversion"], ["Failure", "null"], ["Use", "Optional conversion when null is handled immediately"]] },
] as const;

const identityCases = [
  { label: "Namespace", fields: [["Purpose", "Source/API name organization"], ["Uniqueness", "Not a deployment identity"], ["Inspect", "Type.FullName"]] },
  { label: "Assembly", fields: [["Purpose", "Definition, version, deployment identity"], ["Uniqueness", "Name/version/culture/key plus load context"], ["Inspect", "Type.AssemblyQualifiedName"]] },
  { label: "Type object", fields: [["Purpose", "Runtime handle and metadata view"], ["Uniqueness", "One runtime type identity per loading universe"], ["Inspect", "typeof(T), GetType(), TypeHandle"]] },
  { label: "Instance", fields: [["Purpose", "State governed by its runtime type"], ["Uniqueness", "Reference identity or value equality rules"], ["Inspect", "Object address is not a stable managed identifier"]], alert: "Matching namespaces and type names do not make types assignment-compatible when defining assemblies or load contexts differ." },
] as const;

export function CvcObjectModelLab() { return <CvcOfficialLab cases={objectCases} caption="Reference values, inline values, boxed values, and System.Object participation have distinct storage semantics." tone="cyan" />; }
export function CvcCastingDecisionLab() { return <CvcOfficialLab cases={castCases} caption="Implicit casts, explicit casts, is patterns, and as conversions encode different failure contracts." tone="amber" />; }
export function CvcRuntimeIdentityLab() { return <CvcOfficialLab cases={identityCases} caption="Namespace, assembly, runtime type, and instance identity answer different questions." tone="violet" />; }
