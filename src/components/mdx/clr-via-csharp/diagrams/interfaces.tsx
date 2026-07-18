"use client";

import { CvcOfficialLab } from "./official-lab";

const inheritanceCases = [
  { label: "Base class", fields: [["Relationship", "One implementation/state inheritance chain"], ["Dispatch", "Virtual slots plus nonvirtual members"], ["Evolution", "Protected/constructor invariants bind derived types"]] },
  { label: "Interface", fields: [["Relationship", "Multiple capability contracts"], ["Dispatch", "Interface implementation map"], ["Evolution", "Implementers are consumers of every abstract member"]] },
  { label: "Composition", fields: [["Relationship", "Object delegates to owned collaborator"], ["Dispatch", "Ordinary call through field/interface"], ["Evolution", "Owner can replace collaborator behind contract"]] },
  { label: "Adapter", fields: [["Relationship", "Translate one contract into another"], ["Dispatch", "Boundary mapping"], ["Evolution", "Contains version and error translation"]], alert: "Choose a base class only when shared implementation and lifecycle invariant are as important as the capability surface." },
] as const;

const implementationCases = [
  { label: "Implicit", fields: [["Surface", "One public member serves class and interface calls"], ["Use", "Operation naturally belongs to public type"], ["Risk", "Name/semantics collision"]] },
  { label: "Explicit", fields: [["Surface", "Visible only through interface reference"], ["Use", "Hide niche contract or separate same-signature semantics"], ["Risk", "Discoverability and boxing for value types"]] },
  { label: "Default member", fields: [["Surface", "Modern interface may provide implementation"], ["Use", "Evolve capability with fallback"], ["Risk", "Runtime target, ambiguity, semantic compatibility"]] },
  { label: "Reimplementation", fields: [["Surface", "Derived type remaps interface"], ["Use", "Rarely alter inherited mapping"], ["Risk", "Calls through different static views may surprise"]] },
] as const;

const genericCases = [
  { label: "Constraint", fields: [["Purpose", "Generic body can call interface members"], ["Dispatch", "Constrained call may avoid boxing"], ["Safety", "Compile-time capability proof"]] },
  { label: "Covariant", fields: [["Purpose", "Safely widen producer result"], ["Dispatch", "Reference conversion between interface constructions"], ["Safety", "T only in output positions"]] },
  { label: "Contravariant", fields: [["Purpose", "Safely reuse broader consumer"], ["Dispatch", "Reference conversion between interface constructions"], ["Safety", "T only in input positions"]] },
  { label: "Same signature", fields: [["Purpose", "Two contracts happen to share shape"], ["Dispatch", "Implicit one implementation or explicit separate mappings"], ["Safety", "Semantic meaning must decide"]], alert: "Matching method signatures do not prove matching semantics; explicit implementations can preserve distinct contracts." },
] as const;

export function CvcClassInterfaceChoiceLab() { return <CvcOfficialLab cases={inheritanceCases} caption="Base inheritance, interfaces, composition, and adapters package state, capability, and evolution differently." tone="cyan" />; }
export function CvcInterfaceImplementationLab() { return <CvcOfficialLab cases={implementationCases} caption="Implicit, explicit, default, and remapped implementations create different public and dispatch surfaces." tone="amber" />; }
export function CvcGenericInterfaceLab() { return <CvcOfficialLab cases={genericCases} caption="Constraints, variance, and same-signature mappings use interfaces for capability while preserving type safety." tone="violet" />; }
