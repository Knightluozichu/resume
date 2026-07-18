"use client";

import { LuaOfficialLab } from "./official-lab";

const representationCases = [
  { label: "Quoted literal", fields: [["Delimiter", "Single or double quotes"], ["Processing", "Escape sequences are interpreted"], ["Use", "Short text and byte escapes"]] },
  { label: "Long string", fields: [["Delimiter", "[[...]] or [=[...]=] levels"], ["Processing", "No ordinary escape processing"], ["Use", "Multiline source, templates and fixtures"]] },
  { label: "Binary bytes", fields: [["Capability", "Embedded zero and arbitrary bytes"], ["Length", "#s counts bytes"], ["Use", "Protocol payloads with explicit encoding"]] },
  { label: "Immutable value", fields: [["Mutation", "Operations create another string"], ["Sharing", "Implementation may intern/share storage"], ["Use", "Safe value key; watch concatenation cost"]], alert: "A Lua string is a byte sequence. UTF-8 is an application convention, not an automatic character-indexing model." },
] as const;

const libraryCases = [
  { label: "sub", fields: [["Index", "Inclusive byte positions; negative indexes count from end"], ["Output", "A new substring value"], ["Risk", "Can split a UTF-8 sequence"]] },
  { label: "byte/char", fields: [["byte", "Expose numeric byte values"], ["char", "Build from byte values"], ["Risk", "Not Unicode code-point conversion"]] },
  { label: "format", fields: [["Input", "Format contract plus values"], ["Output", "Locale/implementation-aware formatted text"], ["Risk", "Display text is not automatically a wire format"]] },
  { label: "concat buffer", fields: [["Input", "String fragments in a sequence"], ["Output", "One joined string"], ["Benefit", "Avoid quadratic repeated concatenation"]] },
] as const;

const unicodeCases = [
  { label: "Byte", fields: [["Meaning", "One octet in the Lua string"], ["API", "#s, string.byte, string.sub"], ["Failure", "May be a partial UTF-8 code unit sequence"]] },
  { label: "Code point", fields: [["Meaning", "One Unicode scalar value"], ["API", "utf8.codes, utf8.codepoint, utf8.char"], ["Failure", "Invalid UTF-8 or range"]] },
  { label: "Grapheme", fields: [["Meaning", "One user-perceived character"], ["API", "Requires a Unicode segmentation library"], ["Failure", "Multiple code points can form one grapheme"]] },
  { label: "Display width", fields: [["Meaning", "Terminal/UI columns or glyph shaping"], ["API", "Platform text renderer"], ["Failure", "Not equal to bytes, points, or graphemes"]] },
] as const;

export function PilStringRepresentationLab() {
  return <LuaOfficialLab cases={representationCases} caption="Quoted literals, long strings, binary bytes, and immutable values are four views of the same Lua string type." tone="cyan" />;
}

export function PilStringLibraryLab() {
  return <LuaOfficialLab cases={libraryCases} caption="The core string library is byte-indexed; buffering and formatting have separate ownership contracts." tone="violet" />;
}

export function PilUnicodeBoundaryLab() {
  return <LuaOfficialLab cases={unicodeCases} caption="Bytes, Unicode code points, grapheme clusters, and display width are distinct units." tone="amber" />;
}
