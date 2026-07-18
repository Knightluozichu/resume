"use client";

import { CvcOfficialLab } from "./official-lab";

const declarationCases = [
  { label: "Target", fields: [["Choice", "Assembly, type, member, parameter, return, generic parameter"], ["Control", "AttributeUsage.ValidOn"], ["Risk", "Wrong metadata owner"]] },
  { label: "Inherited", fields: [["Choice", "Whether lookup may flow from base"], ["Control", "AttributeUsage.Inherited plus reflection API"], ["Risk", "Member/type inheritance differs"]] },
  { label: "Multiple", fields: [["Choice", "One or several instances per target"], ["Control", "AttributeUsage.AllowMultiple"], ["Risk", "Ordering/merge assumptions"]] },
  { label: "Payload", fields: [["Choice", "Constructor positional and named property/field values"], ["Control", "Restricted metadata-serializable types"], ["Risk", "Version and default changes"]] },
] as const;

const detectionCases = [
  { label: "Instantiate", fields: [["API", "GetCustomAttributes"], ["Effect", "Construct attribute objects"], ["Risk", "Constructor code, allocation, dependency load"]] },
  { label: "IsDefined", fields: [["API", "Attribute.IsDefined/member.IsDefined"], ["Effect", "Presence query"], ["Risk", "Inheritance semantics must match"]] },
  { label: "Metadata data", fields: [["API", "CustomAttributeData"], ["Effect", "Read constructor/named arguments without constructing attribute"], ["Risk", "Still loads reflection metadata/types"]] },
  { label: "Raw metadata", fields: [["API", "System.Reflection.Metadata"], ["Effect", "Inspect blobs/tokens without loading target assembly"], ["Risk", "Manual signature/blob decoding"]] },
] as const;

const policyCases = [
  { label: "Equality", fields: [["Question", "Do two attribute instances represent same metadata declaration?"], ["Mechanism", "Attribute.Equals/TypeId or explicit normalized comparison"], ["Risk", "Arrays/mutable fields/reference equality"]] },
  { label: "Conditional", fields: [["Question", "Should compiler emit usage under a symbol?"], ["Mechanism", "ConditionalAttribute on attribute class"], ["Risk", "Different builds carry different metadata"]] },
  { label: "Runtime policy", fields: [["Question", "Should attribute authorize behavior?"], ["Mechanism", "Validated policy layer"], ["Risk", "Metadata is untrusted input, not permission itself"]] },
  { label: "Trimming/AOT", fields: [["Question", "Will reflection-discovered target remain?"], ["Mechanism", "Source generation/annotations/descriptors"], ["Risk", "Attribute alone may not preserve code"]], alert: "An attribute records metadata intent; a separate owner must validate and enforce it." },
] as const;

export function CvcAttributeDeclarationLab() { return <CvcOfficialLab cases={declarationCases} caption="Targets, inheritance, multiplicity, and payload types define an attribute's metadata contract." tone="cyan" />; }
export function CvcAttributeDetectionLab() { return <CvcOfficialLab cases={detectionCases} caption="Instantiation, presence checks, CustomAttributeData, and raw metadata trade convenience for execution and loading control." tone="violet" />; }
export function CvcAttributePolicyLab() { return <CvcOfficialLab cases={policyCases} caption="Equality, conditional emission, runtime enforcement, and trimming preservation need separate policies." tone="amber" />; }
