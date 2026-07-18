"use client";

import { LuaOfficialLab } from "./official-lab";

const representationCases = [
  { label: "Integer", fields: [["Lua 5.3 default", "Signed 64-bit integer subtype"], ["Inspect", "math.type(value) == integer"], ["Risk", "Overflow wraps in integer arithmetic"]] },
  { label: "Float", fields: [["Lua 5.3 default", "Double-precision floating subtype"], ["Inspect", "math.type(value) == float"], ["Risk", "Rounding and NaN/infinity behavior"]] },
  { label: "Exact crossover", fields: [["Safe fact", "A double exactly represents integers only through 2^53"], ["Comparison", "Do not force large IDs through float"], ["Evidence", "Round-trip and subtype checks"]] },
  { label: "Configured Lua", fields: [["Build option", "Integer and float widths can differ"], ["Contract", "Record runtime and numeric limits"], ["Evidence", "math.maxinteger, math.mininteger, string.packsize"]], alert: "Do not serialize identifiers or counters through an assumed double-only model; Lua 5.3 has integer and float subtypes." },
] as const;

const arithmeticCases = [
  { label: "/", fields: [["Result", "Floating-point division"], ["Example", "7 / 3 == 2.333..."], ["Use", "Ratios and measurements"]] },
  { label: "//", fields: [["Result", "Floor division"], ["Example", "-7 // 3 == -3"], ["Use", "Buckets with floor semantics"]] },
  { label: "%", fields: [["Law", "a == (a // b) * b + a % b"], ["Sign", "Remainder follows floor division"], ["Use", "Wrap ranges only after checking divisor"]] },
  { label: "floor/ceil", fields: [["floor", "Greatest integer not above x"], ["ceil", "Smallest integer not below x"], ["Risk", "Negative values expose truncation mistakes"]] },
] as const;

const conversionCases = [
  { label: "tonumber(text)", fields: [["Accept", "A complete numeric string"], ["Failure", "nil"], ["Boundary", "Validate whitespace, locale expectations and range"]] },
  { label: "tonumber(text, base)", fields: [["Accept", "Integer digits for base 2..36"], ["Failure", "nil for invalid digit"], ["Boundary", "Sign is allowed; prefix policy is explicit"]] },
  { label: "math.tointeger", fields: [["Accept", "An exactly representable integer value"], ["Failure", "nil for fractional/out-of-range"], ["Boundary", "Use before integer-only APIs"]] },
  { label: "math.random", fields: [["Output", "Pseudo-random values from implementation state"], ["Seed", "Explicit for a test process"], ["Boundary", "Not cryptographic and not a portable sequence"]] },
] as const;

export function PilNumberRepresentationLab() {
  return <LuaOfficialLab cases={representationCases} caption="Lua 5.3 numbers share one type name but have integer and float runtime subtypes with different limits." tone="cyan" />;
}

export function PilArithmeticRoundingLab() {
  return <LuaOfficialLab cases={arithmeticCases} caption="Floating division, floor division, modulo, and rounding must agree for positive and negative operands." tone="violet" />;
}

export function PilNumberConversionLab() {
  return <LuaOfficialLab cases={conversionCases} caption="Text parsing, exact integer conversion, and pseudo-random generation are explicit boundary contracts." tone="amber" />;
}
