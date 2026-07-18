"use client";

import { CvcOfficialLab } from "./official-lab";

const propertyCases = [
  { label: "Field", fields: [["Metadata", "Stored value"], ["Call", "Direct load/store"], ["Contract", "Representation exposed"]] },
  { label: "Property", fields: [["Metadata", "Property row plus get/set methods"], ["Call", "Accessor method invocation"], ["Contract", "Value-like, quick, repeatable access"]] },
  { label: "Auto property", fields: [["Metadata", "Generated backing field and accessors"], ["Call", "Ordinary accessors"], ["Contract", "Can add validation only with compatibility review"]] },
  { label: "Method", fields: [["Metadata", "Method"], ["Call", "Explicit operation"], ["Contract", "Cost, failure, action, or async are visible"]], alert: "Property syntax does not make access free, side-effect-free, thread-safe, or cached." },
] as const;

const initializerCases = [
  { label: "Object init", fields: [["Sequence", "Constructor then member assignments"], ["Invariant", "Object may be partially assigned between setters"], ["Risk", "Required relationships spread across call site"]] },
  { label: "Collection init", fields: [["Sequence", "Constructor then Add calls"], ["Invariant", "Each Add may validate/fail"], ["Risk", "Partial mutation after failure"]] },
  { label: "Anonymous type", fields: [["Sequence", "Compiler-generated immutable shape"], ["Invariant", "Structural property values"], ["Risk", "Assembly-local implementation type"]] },
  { label: "Tuple", fields: [["Sequence", "ValueTuple fields constructed"], ["Invariant", "Positional short-lived grouping"], ["Risk", "Names not a durable runtime contract"]] },
] as const;

const indexerCases = [
  { label: "Indexer", fields: [["Signature", "Property with one or more parameters"], ["Use", "Natural keyed/indexed access"], ["Risk", "Hidden lookup cost and exceptions"]] },
  { label: "Accessor visibility", fields: [["Signature", "Setter may be less accessible"], ["Use", "Public read, controlled write"], ["Risk", "Serializer/tool assumptions"]] },
  { label: "Ref return", fields: [["Signature", "Reference to backing storage"], ["Use", "High-performance mutable/readonly access"], ["Risk", "Aliasing, lifetime, invariant bypass"]] },
  { label: "Generic owner", fields: [["Signature", "Property may use containing type parameters"], ["Use", "Typed reusable container"], ["Risk", "C# property itself cannot declare fresh method-like type parameters"]], alert: "If an operation needs its own type argument, use a generic method; C# accessors do not independently declare generic parameters." },
] as const;

export function CvcPropertyMethodLab() { return <CvcOfficialLab cases={propertyCases} caption="Fields, properties, auto properties, and methods expose different representation, call, and evolution contracts." tone="cyan" />; }
export function CvcInitializerShapeLab() { return <CvcOfficialLab cases={initializerCases} caption="Object/collection initializers, anonymous types, and tuples construct values through different sequencing and identity rules." tone="emerald" />; }
export function CvcIndexerAccessorLab() { return <CvcOfficialLab cases={indexerCases} caption="Indexers and accessor variants must expose cost, visibility, aliasing, and generic limits." tone="violet" />; }
