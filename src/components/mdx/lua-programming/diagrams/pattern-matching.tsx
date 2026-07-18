"use client";

import { LuaOfficialLab } from "./official-lab";

const functionCases = [
  { label: "find", fields: [["Result", "Start index, end index, then captures"], ["Control", "Optional start position and plain=true"], ["Best fit", "Need location or literal-search mode"]] },
  { label: "match", fields: [["Result", "Captures, or the whole match when none exist"], ["Control", "Optional start position"], ["Best fit", "Need extracted values, not indices"]] },
  { label: "gmatch", fields: [["Result", "Iterator yields captures or each whole match"], ["Control", "Advances through non-overlapping matches"], ["Best fit", "Tokenization and scanning"]] },
  { label: "gsub", fields: [["Result", "New string and replacement count"], ["Control", "String, table, or function replacement; optional limit"], ["Best fit", "Transform and audit how many substitutions occurred"]], alert: "find and match do not have interchangeable result shapes; adding one capture can change what callers observe from match and gmatch." },
] as const;

const grammarCases = [
  { label: "Classes/sets", fields: [["Form", "%a, %d, %s, [A-F], [^,]+"], ["Meaning", "One character from a class or set"], ["Boundary", "Uppercase class letters complement; locale can affect named classes"]] },
  { label: "Repetition", fields: [["Form", "+, *, -, ?"], ["Meaning", "One-or-more, zero-or-more greedy, minimal, optional"], ["Boundary", "Quantifiers apply to one pattern item; no alternation operator"]] },
  { label: "Anchors", fields: [["Form", "^ at start, $ at end"], ["Meaning", "Constrain match position"], ["Boundary", "gmatch iteration and a leading ^ are not a useful combination"]] },
  { label: "Special", fields: [["Form", "%b(), %f[%w], escaped magic"], ["Meaning", "Balanced pair, frontier, or literal magic character"], ["Boundary", "Balanced pairs are limited and do not turn patterns into a full parser"]], alert: "Lua patterns have their own compact grammar: regex alternation, brace counts, and backslash escaping do not carry over." },
] as const;

const replacementCases = [
  { label: "String", fields: [["Replacement", "%0 for whole match, %1..%9 for captures"], ["Nil/false", "Not applicable"], ["Risk", "Escape percent signs and do not confuse replacement syntax with pattern syntax"]] },
  { label: "Function", fields: [["Replacement", "Called with captures, or the whole match"], ["Nil/false", "Keep the original match unchanged"], ["Risk", "Validate returned type and bound callback cost"]] },
  { label: "Table", fields: [["Replacement", "Lookup by first capture, or whole match"], ["Nil/false", "Keep the original match unchanged"], ["Risk", "Missing keys may silently preserve input"]] },
  { label: "Position capture", fields: [["Replacement", "Empty capture () yields the current byte position"], ["Nil/false", "Useful as callback input rather than replacement itself"], ["Risk", "Byte position is not a Unicode character column"]], alert: "gsub always returns two values. Ignoring the replacement count removes evidence that the intended pattern matched at all." },
] as const;

export function PilPatternFunctionLab() {
  return <LuaOfficialLab cases={functionCases} caption="find, match, gmatch, and gsub expose different locations, captures, iteration, and transformation result contracts." tone="cyan" />;
}

export function PilPatternGrammarLab() {
  return <LuaOfficialLab cases={grammarCases} caption="Lua pattern grammar combines character items, compact repetition, anchors, balanced pairs, and frontier assertions." tone="violet" />;
}

export function PilReplacementLab() {
  return <LuaOfficialLab cases={replacementCases} caption="Replacement strings, functions, and tables use captures differently; position captures expose byte offsets for layout recipes." tone="amber" />;
}
