"use client";

import { RubyOfficialLab } from "./official-lab";

const expressionCases = [
  { label: "Assignment", fields: [["Code", "total = price + tax"], ["Result", "Assigned value"], ["Risk", "Assignment inside conditions can hide a typo"]] },
  { label: "Logical", fields: [["Code", "cached || load_value"], ["Result", "A selected operand"], ["Risk", "false is treated like missing"]] },
  { label: "Conditional", fields: [["Code", "ready ? publish : wait"], ["Result", "One branch expression"], ["Risk", "Nested ternaries obscure policy"]] },
  { label: "Range", fields: [["Code", "1..5 or 1...5"], ["Meaning", "Inclusive or exclusive end"], ["Use", "Membership and iteration"]] },
] as const;

const precedenceCases = [
  { label: "Arithmetic", fields: [["Expression", "2 + 3 * 4"], ["Grouping", "2 + (3 * 4)"], ["Result", "14"]] },
  { label: "Boolean", fields: [["Expression", "a || b && c"], ["Grouping", "a || (b && c)"], ["Rule", "Use parentheses for policy"]] },
  { label: "and / =", fields: [["Expression", "result = work and audit"], ["Grouping", "(result = work) and audit"], ["Risk", "and/or have low precedence"]] },
  { label: "Block", fields: [["Expression", "log items.map { ... }"], ["Question", "Which call owns the block?"], ["Rule", "Parenthesize or split nested calls"]], alert: "Parser precedence is fixed; redefining an operator method cannot change grouping." },
] as const;

const definitionCases = [
  { label: "Binary", fields: [["Method", "+(other)"], ["Expected", "Return a new value compatible with the domain"], ["Test", "Identity, associativity where promised, coercion"]] },
  { label: "Unary", fields: [["Method", "+@ or -@"], ["Expected", "One receiver, no explicit operand"], ["Test", "Sign/inversion semantics"]] },
  { label: "Index read", fields: [["Method", "[](key)"], ["Expected", "Read by index/key/range"], ["Test", "Missing, negative, range and type errors"]] },
  { label: "Index write", fields: [["Method", "[]=(key, value)"], ["Expected", "Validate and mutate through one boundary"], ["Test", "Return value and invariant preservation"]] },
] as const;

export function RubyOperatorExpressionLab() {
  return <RubyOfficialLab cases={expressionCases} caption="Assignment, logical, conditional, and range operators each return values and encode distinct boundary risks." tone="cyan" />;
}

export function RubyOperatorPrecedenceLab() {
  return <RubyOfficialLab cases={precedenceCases} caption="Precedence determines grouping before method dispatch; parentheses make business policy explicit." tone="amber" />;
}

export function RubyOperatorDefinitionLab() {
  return <RubyOfficialLab cases={definitionCases} caption="Custom binary, unary, and index operators must preserve familiar domain and collection contracts." tone="violet" />;
}
