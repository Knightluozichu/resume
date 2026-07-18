"use client";

import { CtcOfficialLab } from "./official-lab";

const engineCases = [
  { label: "interpreted", fields: [["engine", "Regex opcodes interpreted at runtime"], ["gate", "Low startup, reuse object or static cache"]] },
  { label: "compiled", fields: [["engine", "Regex emits CIL for JIT"], ["gate", "Higher creation cost; benchmark hot reuse"]] },
  { label: "backtracking", fields: [["engine", "Try alternatives and restore states"], ["gate", "Near-miss corpus, timeout, input limit"]] },
  { label: "nonbacktracking", fields: [["engine", "Linear-time compatible subset"], ["gate", "Later runtime support and feature limits"]] },
] as const;

const patternCases = [
  { label: "character set", fields: [["pattern", "One character from class/range/category"], ["gate", "Unicode and negation semantics"]] },
  { label: "greedy", fields: [["pattern", "Consume max then backtrack"], ["gate", "Ambiguous suffix and nested quantifiers"]] },
  { label: "lazy", fields: [["pattern", "Consume min then expand"], ["gate", "Still backtracks; not automatically faster"]] },
  { label: "atomic", fields: [["pattern", "Do not revisit internal choices"], ["gate", "Prove discarded alternatives unnecessary"]] },
] as const;

const extractionCases = [
  { label: "assertion", fields: [["result", "Validate position without consuming"], ["gate", "Lookaround cost and fixed semantics"]] },
  { label: "group", fields: [["result", "Capture named submatch"], ["gate", "Repeated captures and optional success"]] },
  { label: "replace", fields: [["result", "Template or evaluator transformation"], ["gate", "Escaping, count, output-size limit"]] },
  { label: "split", fields: [["result", "Segments plus captured delimiters"], ["gate", "Empty matches, count, delimiter behavior"]] },
] as const;

export function CtcRegexEngineLab() { return <CtcOfficialLab cases={engineCases} caption="Regex execution strategy trades startup, throughput, feature support, backtracking risk, and deployment behavior." tone="cyan" />; }
export function CtcRegexPatternLab() { return <CtcOfficialLab cases={patternCases} caption="Character sets and quantifiers define candidate paths; greedy, lazy, and atomic choices control how paths are revisited." tone="violet" />; }
export function CtcRegexExtractionLab() { return <CtcOfficialLab cases={extractionCases} caption="Assertions, groups, replacement, and splitting turn match positions into bounded validated data transformations." tone="amber" />; }
