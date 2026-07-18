"use client";

import { RubyOfficialLab } from "./official-lab";

const truthCases = [
  { label: "nil", fields: [["Condition", "Falsey"], ["Fallback", "nil || default returns default"], ["Meaning", "Usually absence, but validate the domain"]] },
  { label: "false", fields: [["Condition", "Falsey"], ["Fallback", "false || default returns default"], ["Meaning", "A real boolean value, distinct from nil"]] },
  { label: "0", fields: [["Condition", "Truthy"], ["Fallback", "0 || default returns 0"], ["Meaning", "Use zero? for numeric intent"]] },
  { label: "empty", fields: [["Condition", "Truthy"], ["Fallback", "\"\" || default returns \"\""], ["Meaning", "Use empty? for content intent"]], alert: "Ruby has exactly two falsey values: nil and false." },
] as const;

const branchCases = [
  { label: "if", fields: [["Intent", "Run/select when condition is truthy"], ["Result", "Last expression of the chosen branch"], ["Use", "Positive condition with meaningful alternatives"]] },
  { label: "unless", fields: [["Intent", "Run when condition is falsey"], ["Result", "Like if, it is an expression"], ["Use", "One simple negative guard"]] },
  { label: "elsif", fields: [["Intent", "Ordered mutually exclusive tests"], ["Stop", "First truthy branch wins"], ["Use", "Predicates differ by branch"]] },
  { label: "modifier", fields: [["Form", "action if condition"], ["Use", "Short guard with one obvious action"], ["Risk", "Long expressions hide precedence and effects"]] },
] as const;

const caseCases = [
  { label: "Literal", fields: [["when", "\"ready\""], ["Check", "\"ready\" === value"], ["Use", "Discrete value dispatch"]] },
  { label: "Range", fields: [["when", "200..299"], ["Check", "Range#=== tests inclusion"], ["Use", "Numeric bands"]] },
  { label: "Regexp", fields: [["when", "/\\Auser:/"], ["Check", "Regexp#=== performs a match"], ["Use", "Text shape dispatch"]] },
  { label: "Class", fields: [["when", "String"], ["Check", "String === value uses is_a? semantics"], ["Use", "Boundary normalization, not sprawling type switches"]], alert: "case asks each when object to evaluate `=== value`; it is not limited to ordinary `==`." },
] as const;

export function RubyTruthConditionLab() {
  return <RubyOfficialLab cases={truthCases} caption="nil and false are falsey; zero and empty collections remain truthy and require domain predicates." tone="amber" />;
}

export function RubyIfUnlessLab() {
  return <RubyOfficialLab cases={branchCases} caption="if, unless, elsif, and modifiers express related branch policies with different readability tradeoffs." tone="cyan" />;
}

export function RubyCaseEqualityLab() {
  return <RubyOfficialLab cases={caseCases} caption="case dispatch calls each when candidate's === method, enabling literals, ranges, regexps, and classes." tone="violet" />;
}
