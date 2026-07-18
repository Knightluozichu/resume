"use client";

import { RubyOfficialLab } from "./official-lab";

const pipelineCases = [
  { label: "Download", fields: [["Input", "Allowlisted URI"], ["Output", "Bounded raw bytes plus metadata"], ["Boundary", "Timeout, status, content type, encoding, SSRF"]] },
  { label: "Extract body", fields: [["Input", "Parsed document tree"], ["Output", "Selected content nodes"], ["Boundary", "Site-specific selector and missing/duplicate body"]] },
  { label: "Remove tags", fields: [["Input", "HTML nodes"], ["Output", "Decoded text with structural separators"], ["Boundary", "Use parser, preserve paragraphs, avoid script/style"]] },
  { label: "Normalize", fields: [["Input", "Decoded text"], ["Output", "Stable line/space/Unicode policy"], ["Boundary", "Keep mapping if source offsets are needed"]] },
] as const;

const grepCases = [
  { label: "Count", fields: [["Evidence", "Number of non-overlapping matches"], ["Question", "Per line, per file, or total?"], ["Boundary", "Zero-length match progress"]] },
  { label: "Match part", fields: [["Evidence", "Matched substring and offsets"], ["API", "MatchData begin/end"], ["Boundary", "Byte/character units and encoding"]] },
  { label: "Highlight", fields: [["Evidence", "Segments: normal/matched"], ["Output", "Terminal ANSI, HTML, or plain"], ["Boundary", "Escape target format; don't corrupt nested matches"]] },
  { label: "Context", fields: [["Evidence", "N chars before/after"], ["Boundary", "String edge and grapheme/character unit"], ["Rule", "Clamp without negative wraparound"]] },
] as const;

const contextCases = [
  { label: "Fixed 10", fields: [["Before", "max(match_start - 10, 0)"], ["After", "min(match_end + 10, length)"], ["Use", "Simple inspectable window"]] },
  { label: "Variable N", fields: [["Input", "Validated non-negative maximum"], ["Cost", "Output can grow matches × window"], ["Rule", "Cap N and total output"]] },
  { label: "Overlap", fields: [["Case", "Nearby windows overlap"], ["Policy", "Merge windows or report each separately"], ["Rule", "Stable deterministic order"]] },
  { label: "Streaming", fields: [["Case", "Input too large for whole String"], ["Policy", "Ring buffer plus delayed suffix"], ["Boundary", "Cross-chunk matches and encoding-safe chunks"]], alert: "Source offsets, normalized-text offsets, bytes, characters, and graphemes are different coordinate systems." },
] as const;

export function RubyTextPipelineLab() {
  return <RubyOfficialLab cases={pipelineCases} caption="Download, DOM selection, text extraction, and normalization form separate trust and evidence-preservation stages." tone="cyan" />;
}

export function RubyGrepExtensionsLab() {
  return <RubyOfficialLab cases={grepCases} caption="Counting, extracting, highlighting, and context each require a precise match and coordinate contract." tone="violet" />;
}

export function RubyContextWindowLab() {
  return <RubyOfficialLab cases={contextCases} caption="Fixed, variable, overlapping, and streaming context windows need clamped bounds and output budgets." tone="amber" />;
}
