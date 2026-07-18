"use client";

import { CvcOfficialLab } from "./official-lab";

const textUnitCases = [
  { label: "UTF-16 unit", fields: [[".NET view", "char"], ["Represents", "One 16-bit code unit"], ["Risk", "May be half of surrogate pair"]] },
  { label: "Scalar", fields: [[".NET view", "Rune in modern .NET"], ["Represents", "One Unicode scalar value"], ["Risk", "Not necessarily one visible symbol"]] },
  { label: "Grapheme", fields: [[".NET view", "Text element/StringInfo segmentation"], ["Represents", "User-perceived character cluster"], ["Risk", "Segmentation follows Unicode rules"]] },
  { label: "Bytes", fields: [[".NET view", "Encoding result"], ["Represents", "Protocol/storage code units"], ["Risk", "Decoder fallback, truncation, BOM"]], alert: "String.Length counts UTF-16 code units, not Unicode scalars or user-perceived characters." },
] as const;

const stringCases = [
  { label: "Ordinal", fields: [["Meaning", "Compare UTF-16 code units"], ["Use", "Identifiers, protocols, security decisions"], ["Risk", "Case rules only when explicit OrdinalIgnoreCase"]] },
  { label: "Culture", fields: [["Meaning", "Linguistic collation"], ["Use", "User-facing sort/search"], ["Risk", "Culture/version dependent"]] },
  { label: "Intern", fields: [["Meaning", "Canonical runtime reference for selected equal literals/strings"], ["Use", "Compiler/runtime optimization"], ["Risk", "Retention and identity misuse"]] },
  { label: "Immutable", fields: [["Meaning", "Operations return new logical strings"], ["Use", "Safe sharing"], ["Risk", "Repeated concatenation allocation"]] },
] as const;

const conversionCases = [
  { label: "Format", fields: [["Direction", "Object/value to text"], ["Contract", "Format string and culture"], ["Failure", "Invalid format or unsupported provider"]] },
  { label: "Parse", fields: [["Direction", "Text to typed value"], ["Contract", "Grammar, styles, culture, range"], ["Failure", "TryParse false or Parse exception"]] },
  { label: "Encode", fields: [["Direction", "Unicode text to bytes"], ["Contract", "Encoding and fallback"], ["Failure", "Replacement or exception"]] },
  { label: "Decode", fields: [["Direction", "Bytes to Unicode text"], ["Contract", "Framing, incremental decoder, BOM"], ["Failure", "Invalid sequence and boundary truncation"]], alert: "Formatting culture and wire encoding are separate choices; neither should inherit ambient defaults at protocol boundaries." },
] as const;

export function CvcUnicodeUnitLab() { return <CvcOfficialLab cases={textUnitCases} caption="UTF-16 units, Unicode scalars, grapheme clusters, and encoded bytes are different counting and slicing domains." tone="cyan" />; }
export function CvcStringSemanticsLab() { return <CvcOfficialLab cases={stringCases} caption="Ordinal/cultural comparison, interning, and immutability answer separate text identity and allocation questions." tone="violet" />; }
export function CvcTextConversionLab() { return <CvcOfficialLab cases={conversionCases} caption="Formatting, parsing, encoding, and decoding need explicit grammar, culture, framing, and failure rules." tone="amber" />; }
