"use client";

import { CvcOfficialLab } from "./official-lab";

const enumCases = [
  { label: "Named value", fields: [["Storage", "Underlying integral value"], ["Validity", "May map to one declared name"], ["Versioning", "Numeric value is serialized contract"]] },
  { label: "Unnamed value", fields: [["Storage", "Any underlying bit pattern can be cast"], ["Validity", "Not automatically rejected"], ["Versioning", "Forward-compatible or invalid by domain policy"]] },
  { label: "Zero", fields: [["Storage", "All bits clear"], ["Validity", "Prefer None/default meaning"], ["Versioning", "default(T) always produces zero"]] },
  { label: "Alias", fields: [["Storage", "Several names share numeric value"], ["Validity", "ToString/name lookup may be ambiguous"], ["Versioning", "Avoid unless compatibility requires"]] },
] as const;

const flagCases = [
  { label: "Single flag", fields: [["Value", "One bit, usually power of two"], ["Test", "(value & flag) == flag"], ["Risk", "Zero is special"]] },
  { label: "Composite", fields: [["Value", "OR of named flags"], ["Test", "Contains all component bits"], ["Risk", "Do not allocate overlapping future bits"]] },
  { label: "Unknown bits", fields: [["Value", "Bits outside known mask"], ["Test", "value & ~KnownMask"], ["Risk", "Reject, preserve, or ignore by protocol policy"]] },
  { label: "Toggle", fields: [["Value", "XOR changes selected bits"], ["Test", "Use only when true toggle intended"], ["Risk", "Repeated call is not idempotent"]], alert: "Enum.IsDefined is usually wrong for valid flag combinations because combinations need not have individual declared names." },
] as const;

const apiCases = [
  { label: "Parse", fields: [["Input", "Name or numeric text"], ["Policy", "Case, whitespace, unknown numeric"], ["Output", "Enum value still needs domain validation"]] },
  { label: "Format", fields: [["Input", "Enum/flag bits"], ["Policy", "Name, decimal, hex, flags"], ["Output", "Unknown bits require deliberate representation"]] },
  { label: "Extension", fields: [["Input", "Enum value as receiver copy"], ["Policy", "Central domain predicates/labels"], ["Output", "Static helper, not new runtime member"]] },
  { label: "Wire DTO", fields: [["Input", "External integer/string"], ["Policy", "Known/unknown preservation and version"], ["Output", "Validated domain enum or unknown wrapper"]] },
] as const;

export function CvcEnumDomainLab() { return <CvcOfficialLab cases={enumCases} caption="Declared, unnamed, zero, and aliased enum values require domain validation beyond the underlying integer." tone="cyan" />; }
export function CvcBitFlagLab() { return <CvcOfficialLab cases={flagCases} caption="Single, composite, unknown, and toggled bits need masks and explicit forward-compatibility rules." tone="amber" />; }
export function CvcEnumApiLab() { return <CvcOfficialLab cases={apiCases} caption="Parsing, formatting, extension methods, and wire adapters should centralize enum policy." tone="violet" />; }
