"use client";

import { RubyOfficialLab } from "./official-lab";

const tokenCases = [
  { label: "Anchors", fields: [["Tokens", "\\A, \\z, ^, $"], ["Meaning", "String or line boundaries"], ["Use", "Whole-input versus per-line validation"]] },
  { label: "Classes", fields: [["Tokens", "[a-z], [^0-9], \\d, \\s"], ["Meaning", "One character from a set/category"], ["Boundary", "Encoding and Unicode semantics"]] },
  { label: "Wildcard", fields: [["Token", "."], ["Meaning", "One character, newline behavior depends on options"], ["Risk", "Too broad for structured data"]] },
  { label: "Quantifier", fields: [["Tokens", "*, +, ?, {m,n}"], ["Meaning", "Repeat previous atom/group"], ["Risk", "Nested ambiguous repetition can backtrack heavily"]] },
] as const;

const evidenceCases = [
  { label: "match", fields: [["Result", "MatchData or nil"], ["Evidence", "Full match, offsets, captures"], ["Use", "Parsing and diagnostics"]] },
  { label: "=~", fields: [["Result", "Start index or nil"], ["Evidence", "Position only plus global match state"], ["Use", "Compact legacy tests"]] },
  { label: "match?", fields: [["Result", "Boolean"], ["Evidence", "No MatchData"], ["Version", "Availability differs; Ruby 2.3 baseline may lack it"]] },
  { label: "Capture", fields: [["Form", "(...) or (?<name>...)"], ["Result", "Positional or named fields"], ["Rule", "Noncapturing (?:...) for grouping without schema fields"]] },
] as const;

const transformCases = [
  { label: "quote", fields: [["API", "Regexp.quote(text)"], ["Use", "Treat dynamic text literally"], ["Boundary", "Does not create a whole-input grammar by itself"]] },
  { label: "sub / gsub", fields: [["Result", "Replace first/all matches"], ["Block", "Compute replacement from MatchData/text"], ["Risk", "Backreferences and output expansion"]] },
  { label: "scan", fields: [["Result", "Array or yields each match"], ["Capture", "Shape changes when captures exist"], ["Risk", "Materializing huge match sets"]] },
  { label: "Options", fields: [["Examples", "i, m, x and encoding-related modes"], ["Effect", "Case, dot/newline, whitespace/comments"], ["Rule", "Localize and test option scope"]], alert: "Regex success proves only the pattern's scope; type conversion and business validation still follow." },
] as const;

export function RubyRegexpTokensLab() {
  return <RubyOfficialLab cases={tokenCases} caption="Anchors, character classes, wildcard, and quantifiers define the language and its potential backtracking cost." tone="cyan" />;
}

export function RubyRegexpEvidenceLab() {
  return <RubyOfficialLab cases={evidenceCases} caption="match, =~, match?, and captures trade detailed evidence for lighter boolean or positional results." tone="violet" />;
}

export function RubyRegexpTransformLab() {
  return <RubyOfficialLab cases={transformCases} caption="Quoting, replacement, scanning, and options require explicit dynamic-input, output-size, and result-shape policies." tone="amber" />;
}
