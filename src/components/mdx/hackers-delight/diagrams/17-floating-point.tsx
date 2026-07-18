"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

function float32Bits(value: number) {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setFloat32(0, value, false);
  return view.getUint32(0, false);
}

function float32FromBits(bits: number) {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, bits >>> 0, false);
  return view.getFloat32(0, false);
}

function fields(value: number) {
  const bits = float32Bits(value);
  return {
    bits,
    sign: bits >>> 31,
    exponent: (bits >>> 23) & 0xff,
    fraction: bits & 0x7fffff,
  };
}

function classifyBits(bits: number) {
  const exponent = (bits >>> 23) & 0xff;
  const fraction = bits & 0x7fffff;
  if (exponent === 0) return fraction === 0 ? "zero" : "subnormal";
  if (exponent === 0xff) return fraction === 0 ? "infinity" : "NaN";
  return "normal";
}

function hex(value: number, width = 8) {
  return (value >>> 0).toString(16).toUpperCase().padStart(width, "0");
}

function orderedKey(value: number) {
  const bits = float32Bits(value);
  const sign = bits >>> 31;
  const mask = sign === 0 ? 0x80000000 : 0xffffffff;
  return (bits ^ mask) >>> 0;
}

function nextUp32(value: number) {
  const rounded = Math.fround(value);
  if (Number.isNaN(rounded) || rounded === Infinity) return rounded;
  if (Object.is(rounded, -0) || rounded === 0) return float32FromBits(1);
  const bits = float32Bits(rounded);
  return float32FromBits(rounded > 0 ? bits + 1 : bits - 1);
}

function rsqrtApprox(value: number, iterations: number) {
  const input = Math.fround(value);
  const half = Math.fround(0.5 * input);
  let bits = float32Bits(input);
  bits = (0x5f375a82 - (bits >>> 1)) >>> 0;
  let estimate = float32FromBits(bits);
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const square = Math.fround(estimate * estimate);
    const correction = Math.fround(1.5 - Math.fround(half * square));
    estimate = Math.fround(estimate * correction);
  }
  return estimate;
}

function leadingDigit(value: number) {
  let current = Math.abs(value);
  if (current === 0 || !Number.isFinite(current)) return 0;
  while (current >= 10) current /= 10;
  while (current < 1) current *= 10;
  return Math.floor(current);
}

export function HD17Binary32FieldsLab() {
  const [value, setValue] = useState(6.5);
  const info = fields(value);
  return (
    <Figure caption="Binary32 stores one sign bit, eight biased-exponent bits, and twenty-three fraction bits; interpretation depends on the exponent class.">
      <label className="text-sm font-semibold text-primary">value = {value}<input className="mt-2 w-full accent-current" type="range" min="-16" max="16" step="0.25" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-[1fr_3fr_6fr] gap-1 font-mono text-xs"><div className="border border-danger p-3 text-center text-danger"><div>sign</div><div className="mt-2">{info.sign}</div></div><div className="border border-warning p-3 text-center text-warning"><div>exponent</div><div className="mt-2">{info.exponent.toString(2).padStart(8, "0")}</div></div><div className="border border-accent p-3 text-center text-accent"><div>fraction</div><div className="mt-2 break-all">{info.fraction.toString(2).padStart(23, "0")}</div></div></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="hex word" value={`0x${hex(info.bits)}`} /><Stat label="class" value={classifyBits(info.bits)} /><Stat label="stored exponent" value={info.exponent.toString()} /><Stat label="unbiased exponent" value={info.exponent > 0 && info.exponent < 255 ? (info.exponent - 127).toString() : "special"} tone="success" /></div>
    </Figure>
  );
}

export function HD17CategoryLab() {
  const options = [
    { label: "+0", bits: 0x00000000 },
    { label: "-0", bits: 0x80000000 },
    { label: "min subnormal", bits: 0x00000001 },
    { label: "min normal", bits: 0x00800000 },
    { label: "+infinity", bits: 0x7f800000 },
    { label: "quiet NaN", bits: 0x7fc00000 },
  ];
  const [selection, setSelection] = useState(3);
  const selected = options[selection];
  const value = float32FromBits(selected.bits);
  const info = fields(value);
  return (
    <Figure caption="Exponent zero selects zeros or subnormals; exponent all ones selects infinities or NaNs; only middle exponents use the implicit leading one.">
      <label className="text-sm font-semibold text-primary">bit-pattern landmark<select className="mt-2 block w-full border border-border bg-background p-2" value={selection} onChange={(event) => setSelection(Number(event.target.value))}>{options.map((option, index) => <option key={option.label} value={index}>{option.label}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="word" value={`0x${hex(selected.bits)}`} /><Stat label="class" value={classifyBits(selected.bits)} tone="success" /><Stat label="exponent" value={info.exponent.toString()} /><Stat label="fraction" value={`0x${hex(info.fraction, 6)}`} /></div>
    </Figure>
  );
}

export function HD17ULPLab() {
  const [exponent, setExponent] = useState(0);
  const value = Math.fround(2 ** exponent);
  const next = nextUp32(value);
  const spacing = next - value;
  return (
    <Figure caption="For normal binary32 values in a fixed binade, adjacent spacing is 2^(e−23); ULP grows with magnitude.">
      <label className="text-sm font-semibold text-primary">binade exponent e = {exponent}<input className="mt-2 w-full accent-current" type="range" min="-20" max="20" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="value 2^e" value={value.toExponential(7)} /><Stat label="next float" value={next.toExponential(7)} /><Stat label="ULP spacing" value={spacing.toExponential(7)} tone="success" /><Stat label="relative spacing" value={(spacing / value).toExponential(7)} /></div>
    </Figure>
  );
}

export function HD17IntegerExactnessLab() {
  const [offset, setOffset] = useState(1);
  const integer = 2 ** 24 + offset;
  const rounded = Math.fround(integer);
  return (
    <Figure caption="Binary32 has twenty-four significant bits including the hidden one, so every integer through 2^24 is exact; beyond it, representable integers become spaced.">
      <label className="text-sm font-semibold text-primary">integer = 2^24 {offset >= 0 ? "+" : "−"} {Math.abs(offset)}<input className="mt-2 w-full accent-current" type="range" min="-8" max="16" value={offset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="integer" value={integer.toString()} /><Stat label="binary32 rounded" value={rounded.toString()} /><Stat label="round-trip difference" value={(rounded - integer).toString()} tone={rounded === integer ? "success" : "warning"} /><Stat label="exact" value={rounded === integer ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD17FloatToIntLab() {
  const options = [3.75, -3.75, 2147483647, 2147483648, Number.NaN, Infinity];
  const [selection, setSelection] = useState(0);
  const value = Math.fround(options[selection]);
  const finite = Number.isFinite(value);
  const truncated = finite ? Math.trunc(value) : null;
  const inInt32 = truncated !== null && truncated >= -2147483648 && truncated <= 2147483647;
  return (
    <Figure caption="Float-to-integer conversion needs an explicit rounding rule and an out-of-range/NaN policy; language casts are not universally saturating.">
      <label className="text-sm font-semibold text-primary">input<select className="mt-2 block w-full border border-border bg-background p-2" value={selection} onChange={(event) => setSelection(Number(event.target.value))}>{options.map((option, index) => <option key={index} value={index}>{String(option)}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="binary32 value" value={String(value)} /><Stat label="toward-zero" value={truncated === null ? "invalid" : truncated.toString()} /><Stat label="fits int32" value={inInt32 ? "yes" : "no"} tone={inInt32 ? "success" : "warning"} /><Stat label="required action" value={inInt32 ? "convert" : "reject or saturate"} /></div>
    </Figure>
  );
}

export function HD17IntegerOrderKeyLab() {
  const [left, setLeft] = useState(-3.5);
  const [right, setRight] = useState(2.25);
  const left32 = Math.fround(left);
  const right32 = Math.fround(right);
  const leftKey = orderedKey(left32);
  const rightKey = orderedKey(right32);
  return (
    <Figure caption="For finite non-NaN binary32, complement negative encodings and flip the sign bit of nonnegative encodings to obtain an unsigned monotone key.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">left = {left}<input className="mt-2 w-full accent-current" type="range" min="-8" max="8" step="0.25" value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">right = {right}<input className="mt-2 w-full accent-current" type="range" min="-8" max="8" step="0.25" value={right} onChange={(event) => setRight(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="left key" value={`0x${hex(leftKey)}`} /><Stat label="right key" value={`0x${hex(rightKey)}`} /><Stat label="numeric relation" value={left32 < right32 ? "<" : left32 > right32 ? ">" : "="} /><Stat label="key relation" value={leftKey < rightKey ? "<" : leftKey > rightKey ? ">" : "="} tone={(left32 < right32) === (leftKey < rightKey) && (left32 > right32) === (leftKey > rightKey) ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD17SpecialCompareLab() {
  const options = [
    { label: "-0", value: -0 },
    { label: "+0", value: 0 },
    { label: "-infinity", value: -Infinity },
    { label: "+infinity", value: Infinity },
    { label: "NaN", value: Number.NaN },
  ];
  const [selection, setSelection] = useState(0);
  const selected = options[selection];
  const value = selected.value;
  return (
    <Figure caption="Numeric comparison, bitwise identity, and IEEE total ordering differ for signed zeros and NaNs; choose one contract before building integer keys.">
      <label className="text-sm font-semibold text-primary">special value<select className="mt-2 block w-full border border-border bg-background p-2" value={selection} onChange={(event) => setSelection(Number(event.target.value))}>{options.map((option, index) => <option key={option.label} value={index}>{option.label}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="word" value={`0x${hex(float32Bits(value))}`} /><Stat label="class" value={classifyBits(float32Bits(value))} /><Stat label="value equals itself" value={value === value ? "yes" : "no"} tone={value === value ? "success" : "warning"} /><Stat label="Object.is +0" value={Object.is(value, 0) ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD17RSqrtSeedLab() {
  const [halfExponent, setHalfExponent] = useState(6);
  const value = Math.fround(2 ** (halfExponent / 2));
  const seed = rsqrtApprox(value, 0);
  const exact = 1 / Math.sqrt(value);
  return (
    <Figure caption="The reciprocal-square-root bit hack treats the biased exponent as approximately affine, halves it by shifting, then subtracts from a tuned magic constant.">
      <label className="text-sm font-semibold text-primary">x = 2^({halfExponent}/2) = {value.toPrecision(6)}<input className="mt-2 w-full accent-current" type="range" min="-20" max="20" value={halfExponent} onChange={(event) => setHalfExponent(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="input bits" value={`0x${hex(float32Bits(value))}`} /><Stat label="magic constant" value="0x5F375A82" /><Stat label="seed" value={seed.toPrecision(7)} /><Stat label="seed relative error" value={((seed - exact) / exact).toExponential(3)} tone="warning" /></div>
    </Figure>
  );
}

export function HD17RSqrtNewtonLab() {
  const [value, setValue] = useState(10);
  const [iterations, setIterations] = useState(1);
  const input = Math.fround(value);
  const estimate = rsqrtApprox(input, iterations);
  const exact = 1 / Math.sqrt(input);
  const error = (estimate - exact) / exact;
  return (
    <Figure caption="Newton refinement y ← y(1.5 − 0.5xy²) rapidly squares the relative-error scale when the seed is already near 1/√x.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">positive x = {value}<input className="mt-2 w-full accent-current" type="range" min="0.25" max="100" step="0.25" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">Newton steps = {iterations}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={iterations} onChange={(event) => setIterations(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="exact" value={exact.toPrecision(8)} /><Stat label="estimate" value={estimate.toPrecision(8)} /><Stat label="relative error" value={error.toExponential(4)} tone={Math.abs(error) < 0.00001 ? "success" : "warning"} /><Stat label="steps" value={iterations.toString()} /></div>
    </Figure>
  );
}

export function HD17LeadingDigitsLab() {
  const probabilities = Array.from({ length: 9 }, (_, index) => {
    const digit = index + 1;
    return { digit, probability: Math.log10(1 + 1 / digit) };
  });
  const max = probabilities[0].probability;
  return (
    <Figure caption="Benford's law predicts P(first digit d) = log10(1+1/d) for many scale-spanning data sets, not for every collection of numbers.">
      <div className="space-y-2">{probabilities.map(({ digit, probability }) => <div key={digit} className="grid grid-cols-[2rem_1fr_5rem] items-center gap-2 text-sm"><span className="font-mono text-primary">{digit}</span><div className="h-4 border border-border"><div className="h-full bg-accent" style={{ width: `${100 * probability / max}%` }} /></div><span className="text-right font-mono text-secondary">{(100 * probability).toFixed(2)}%</span></div>)}</div>
    </Figure>
  );
}

export function HD17DistributionSampleLab() {
  const [mode, setMode] = useState("log");
  const counts = Array(10).fill(0) as number[];
  const samples = 9000;
  for (let index = 0; index < samples; index += 1) {
    let value: number;
    if (mode === "log") value = 10 ** (6 * (index + 0.5) / samples);
    else if (mode === "powers") value = 2 ** (index / 100);
    else value = index + 1;
    counts[leadingDigit(value)] += 1;
  }
  return (
    <Figure caption="Leading-digit shape depends on the sampling process: log-uniform scales approach Benford, while a fixed-width uniform integer range is nearly flat.">
      <label className="text-sm font-semibold text-primary">sample model<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value)}><option value="log">log-uniform across decades</option><option value="uniform">uniform integers</option><option value="powers">powers of two</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="first digit 1" value={`${(100 * counts[1] / samples).toFixed(1)}%`} /><Stat label="first digit 5" value={`${(100 * counts[5] / samples).toFixed(1)}%`} /><Stat label="first digit 9" value={`${(100 * counts[9] / samples).toFixed(1)}%`} tone="success" /></div>
    </Figure>
  );
}

export function HD17MiscValuesLab() {
  const rows = [
    ["epsilon at 1", "2^-23", Math.fround(2 ** -23).toExponential(8)],
    ["minimum normal", "2^-126", Math.fround(2 ** -126).toExponential(8)],
    ["minimum subnormal", "2^-149", float32FromBits(1).toExponential(8)],
    ["maximum finite", "(2-2^-23)2^127", float32FromBits(0x7f7fffff).toExponential(8)],
    ["exact integer threshold", "2^24", (2 ** 24).toString()],
  ];
  return (
    <Figure caption="A compact binary32 landmark table anchors boundary tests for conversion, spacing, underflow, overflow, and exact integer representation.">
      <div className="overflow-x-auto"><table className="w-full min-w-[34rem] border-collapse text-sm"><thead><tr className="text-secondary"><th className="border-b border-border p-2 text-left">quantity</th><th className="border-b border-border p-2 text-left">exact form</th><th className="border-b border-border p-2 text-left">value</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}><td className="border-b border-border/60 p-2">{row[0]}</td><td className="border-b border-border/60 p-2 font-mono">{row[1]}</td><td className="border-b border-border/60 p-2 font-mono text-accent">{row[2]}</td></tr>)}</tbody></table></div>
    </Figure>
  );
}

export function HD17ConversionContractLab() {
  const [rounding, setRounding] = useState(true);
  const [range, setRange] = useState(true);
  const [specials, setSpecials] = useState(false);
  const complete = rounding && range && specials;
  return (
    <Figure caption="A floating conversion contract must state rounding mode, out-of-range behavior, and handling of NaN, infinities, subnormals, and signed zero.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={rounding} onChange={(event) => setRounding(event.target.checked)} />rounding mode</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={range} onChange={(event) => setRange(event.target.checked)} />range policy</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={specials} onChange={(event) => setSpecials(event.target.checked)} />special values</label></div>
      <div className="mt-4"><Stat label="conversion contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD17FloatingCertificateLab() {
  const [vectors, setVectors] = useState(true);
  const [specials, setSpecials] = useState(false);
  const [errorSweep, setErrorSweep] = useState(true);
  const complete = vectors && specials && errorSweep;
  return (
    <Figure caption="A floating bit trick is ready only after exact bit-pattern vectors, complete special-value behavior, and full-range ULP or relative-error sweeps.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={vectors} onChange={(event) => setVectors(event.target.checked)} />bit vectors</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={specials} onChange={(event) => setSpecials(event.target.checked)} />special values</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={errorSweep} onChange={(event) => setErrorSweep(event.target.checked)} />error sweep</label></div>
      <div className="mt-4"><Stat label="floating certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
