"use client";

import { CvcOfficialLab } from "./official-lab";

const typeCases = [
  { label: "Open type", fields: [["Example", "Dictionary<,>"], ["Runtime", "Contains unassigned generic parameters"], ["Use", "Metadata/reflection definition, not ordinary instance"]] },
  { label: "Closed type", fields: [["Example", "Dictionary<string,int>"], ["Runtime", "All parameters supplied"], ["Use", "Can construct and own static state"]] },
  { label: "Constructed", fields: [["Example", "Outer<int>.Inner<string>"], ["Runtime", "Identity includes definition and every argument"], ["Use", "Assignment requires exact compatible construction"]] },
  { label: "Generic method", fields: [["Example", "Map<TIn,TOut>"], ["Runtime", "Method arguments may be inferred or explicit"], ["Use", "Capability without generic owner type"]] },
] as const;

const varianceCases = [
  { label: "Invariant", fields: [["Direction", "No conversion between constructed types"], ["Reason", "T consumed and produced or mutable"], ["Example", "IList<string> is not IList<object>"]] },
  { label: "Covariant out", fields: [["Direction", "IProducer<Derived> to IProducer<Base>"], ["Reason", "T only produced at contract positions"], ["Example", "IEnumerable<string> to IEnumerable<object>"]] },
  { label: "Contravariant in", fields: [["Direction", "IConsumer<Base> to IConsumer<Derived>"], ["Reason", "T only consumed at contract positions"], ["Example", "IComparer<object> to IComparer<string>"]] },
  { label: "Value types", fields: [["Direction", "Variance conversion applies to reference types"], ["Reason", "No reference identity conversion for value constructions"], ["Example", "IEnumerable<int> not IEnumerable<object>"]], alert: "Variance is a safe reference conversion rule, not a request to reinterpret mutable storage." },
] as const;

const constraintCases = [
  { label: "Primary", fields: [["Form", "class/struct/unmanaged/notnull/base type"], ["Capability", "Representation or base contract"], ["Verification", "Allowed operations and null/default rules"]] },
  { label: "Secondary", fields: [["Form", "Interface/type parameter constraints"], ["Capability", "Members and conversions"], ["Verification", "Constrained dispatch without ad hoc casts"]] },
  { label: "Constructor", fields: [["Form", "new()"], ["Capability", "Public parameterless construction"], ["Verification", "Does not express factories, DI, or required initialization"]] },
  { label: "Static abstract", fields: [["Form", "Modern interface static members"], ["Capability", "Operators/factories in generic algorithms"], ["Verification", "Language/runtime target must support it"]], alert: "A constraint is a capability proof for the generic body, not merely documentation for callers." },
] as const;

export function CvcGenericTypeIdentityLab() { return <CvcOfficialLab cases={typeCases} caption="Open definitions, closed constructions, nested identities, and generic methods are distinct runtime artifacts." tone="cyan" />; }
export function CvcGenericVarianceLab() { return <CvcOfficialLab cases={varianceCases} caption="Invariance, covariance, and contravariance follow whether a type parameter is consumed or produced." tone="violet" />; }
export function CvcGenericConstraintLab() { return <CvcOfficialLab cases={constraintCases} caption="Primary, secondary, constructor, and modern static constraints prove different capabilities to the generic body." tone="amber" />; }
