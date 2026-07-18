"use client";

import { LuaOfficialLab } from "./official-lab";

const tokenCases = [
  { label: "ASCII words", fields: [["Pattern", "%w+"], ["Normalization", "Usually string.lower under the active locale"], ["Tradeoff", "Compact, but underscore/digits and non-ASCII policy need review"]] },
  { label: "Letters only", fields: [["Pattern", "%a+"], ["Normalization", "Case fold after matching"], ["Tradeoff", "Locale-dependent named class; punctuation splits words"]] },
  { label: "Apostrophes", fields: [["Pattern", "A letter run with an internal apostrophe rule"], ["Normalization", "Canonicalize apostrophe variants first"], ["Tradeoff", "Contractions and possessives become an explicit product choice"]] },
  { label: "UTF-8", fields: [["Pattern", "Use a Unicode-aware tokenizer, not byte classes"], ["Normalization", "Unicode case fold and normalization"], ["Tradeoff", "Requires a library and versioned language policy"]], alert: "Tokenization is part of the result definition. Two reasonable patterns can produce different frequency tables from the same bytes." },
] as const;

const countCases = [
  { label: "First token", fields: [["Lookup", "counts[word] is nil"], ["Update", "Store 1"], ["Invariant", "Every stored count is a positive integer"]] },
  { label: "Repeated token", fields: [["Lookup", "counts[word] is n"], ["Update", "Store n + 1"], ["Invariant", "Total count increases by exactly one"]] },
  { label: "New vocabulary", fields: [["Lookup", "A new normalized key"], ["Update", "Increase unique-word count"], ["Invariant", "Vocabulary is bounded or memory can grow with input"]] },
  { label: "Overflow/budget", fields: [["Lookup", "Counter or vocabulary limit reached"], ["Update", "Reject, saturate, or spill by explicit policy"], ["Invariant", "Never silently wrap or exhaust memory"]], alert: "The `(counts[word] or 0) + 1` idiom is correct only when the table cannot contain false and every value is a validated non-negative counter." },
] as const;

const rankingCases = [
  { label: "Count desc", fields: [["Primary key", "Higher count first"], ["Tie", "Still unresolved"], ["Outcome", "Comparator must not use >="]] },
  { label: "Lexical tie", fields: [["Primary key", "Count descending"], ["Tie", "Word ascending"], ["Outcome", "Deterministic report for equal counts"]] },
  { label: "Top k", fields: [["Primary key", "Sort all keys or maintain a bounded heap"], ["Tie", "The same stable policy at the cutoff"], ["Outcome", "Clamp k to the vocabulary size"]] },
  { label: "Display", fields: [["Primary key", "Rank, word, count"], ["Tie", "Preserve comparator order"], ["Outcome", "Escape delimiters and separate data from formatting"]], alert: "pairs order is unspecified. A report is reproducible only when the comparator completely resolves equal counts." },
] as const;

export function PilTokenPipelineLab() {
  return <LuaOfficialLab cases={tokenCases} caption="A frequency report starts with a versioned token and normalization policy, not with the counter table." tone="cyan" />;
}

export function PilFrequencyTableLab() {
  return <LuaOfficialLab cases={countCases} caption="Each token update preserves positive-count and total-frequency invariants while respecting vocabulary and numeric budgets." tone="violet" />;
}

export function PilFrequencyRankingLab() {
  return <LuaOfficialLab cases={rankingCases} caption="Deterministic ranking sorts by descending count and a complete tie-break before applying the top-k display boundary." tone="amber" />;
}
