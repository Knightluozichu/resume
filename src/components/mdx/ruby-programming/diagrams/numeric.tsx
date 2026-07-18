"use client";

import { RubyOfficialLab } from "./official-lab";

const typeCases = [
  { label: "Integer", fields: [["Domain", "Whole numbers with arbitrary-precision behavior"], ["Literal", "42, 0xff, 0b1010, 1_000"], ["Conversion", "Integer(text, base)"]] },
  { label: "Float", fields: [["Domain", "Binary floating-point approximation"], ["Literal", "3.14, 1.0e-3"], ["Risk", "Rounding and comparison error"]] },
  { label: "Rational", fields: [["Domain", "Exact ratio of Integers"], ["Create", "Rational(1, 3)"], ["Use", "Exact fractional arithmetic when supported"]] },
  { label: "Complex", fields: [["Domain", "Real and imaginary components"], ["Create", "Complex(2, 3)"], ["Use", "Scientific/domain calculations"]] },
] as const;

const operationCases = [
  { label: "Division", fields: [["Integer", "5 / 2 => 2"], ["Float", "5 / 2.0 => 2.5"], ["Explicit", "5.fdiv(2) => 2.5"]] },
  { label: "Modulo", fields: [["Methods", "%, modulo, remainder"], ["Boundary", "Negative operands differ by intent"], ["Test", "All sign combinations"]] },
  { label: "Math", fields: [["Module", "Math.sqrt, sin, log"], ["Result", "Usually Float"], ["Boundary", "Domain errors and precision"]] },
  { label: "Bitwise", fields: [["Operators", "&, |, ^, ~, <<, >>"], ["Domain", "Integer bit patterns"], ["Risk", "Signed shifts and external-width assumptions"]] },
] as const;

const reliabilityCases = [
  { label: "Random", fields: [["API", "Random instance or Kernel.rand"], ["Test", "Inject a seeded generator"], ["Security", "Use SecureRandom for tokens"]] },
  { label: "Counting", fields: [["API", "Integer#times, upto, downto, step"], ["Boundary", "Inclusive endpoints and step direction"], ["Result", "Enumerator when no block"]] },
  { label: "Rounding", fields: [["API", "round, floor, ceil, truncate"], ["Policy", "Tie-breaking and decimal places"], ["Rule", "Round at a named domain boundary"]] },
  { label: "Error", fields: [["Example", "0.1 + 0.2 is not exactly 0.3"], ["Compare", "Tolerance or exact decimal/rational domain"], ["Rule", "Never use binary Float blindly for money"]], alert: "Numeric correctness depends on domain, representation, rounding policy, and acceptable error together." },
] as const;

export function RubyNumericTypesLab() {
  return <RubyOfficialLab cases={typeCases} caption="Integer, Float, Rational, and Complex represent different numeric domains and conversion guarantees." tone="cyan" />;
}

export function RubyNumericOperationsLab() {
  return <RubyOfficialLab cases={operationCases} caption="Division, modulo, Math functions, and bitwise operators change semantics with operand type and sign." tone="violet" />;
}

export function RubyNumericReliabilityLab() {
  return <RubyOfficialLab cases={reliabilityCases} caption="Randomness, counting, rounding, and approximation require explicit reproducibility and error policies." tone="amber" />;
}
