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
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

function bits(value: number, width = 8) {
  const mask = 2 ** width - 1;
  return (value & mask).toString(2).padStart(width, "0");
}

function inverseOdd8(divisor: number) {
  for (let candidate = 1; candidate < 256; candidate += 2)
    if ((candidate * divisor & 0xff) === 1) return candidate;
  return 0;
}

function divideShiftSubtract(dividend: number, divisor: number) {
  let quotient = 0;
  let remainder = dividend;
  for (let bit = 7; bit >= 0; bit -= 1) {
    const shifted = divisor * (2 ** bit);
    if (shifted <= remainder) {
      remainder -= shifted;
      quotient |= 1 << bit;
    }
  }
  return { quotient, remainder };
}

export function HD10SignedPowerLab() {
  const [value, setValue] = useState(-37);
  const [exponent, setExponent] = useState(3);
  const divisor = 2 ** exponent;
  const bias = value < 0 ? divisor - 1 : 0;
  const shifted = Math.floor((value + bias) / divisor);
  const exact = Math.trunc(value / divisor);
  return (
    <Figure caption="Arithmetic right shift rounds negative values down; adding 2^k−1 only for negative inputs changes the result to truncation toward zero.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">signed n = {value}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">divisor = 2^{exponent} = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="negative bias" value={bias.toString()} /><Stat label="biased shift" value={shifted.toString()} tone="success" /><Stat label="trunc oracle" value={exact.toString()} /><Stat label="agree" value={shifted === exact ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD10PowerRemainderLab() {
  const [value, setValue] = useState(-37);
  const divisor = 8;
  const quotient = Math.trunc(value / divisor);
  const remainder = value - quotient * divisor;
  return (
    <Figure caption="For truncation-toward-zero signed division, remainder has the dividend's sign and is reconstructed from n−qd after the biased quotient.">
      <label className="text-sm font-semibold text-primary">signed n = {value}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="q = trunc(n/8)" value={quotient.toString()} /><Stat label="r = n−8q" value={remainder.toString()} tone="success" /><Stat label="8q+r" value={(quotient * divisor + remainder).toString()} /><Stat label="|r|<8" value={Math.abs(remainder) < divisor ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD10SignedMagicLab() {
  const [value, setValue] = useState(-101);
  const magic = 86;
  const high = Math.floor((value * magic) / 256);
  const signMask = value < 0 ? -1 : 0;
  const quotient = high - signMask;
  const oracle = Math.trunc(value / 3);
  return (
    <Figure caption="For signed 8-bit division by 3, multiply-high by 86 approximates the quotient and subtracting the sign mask corrects negative truncation.">
      <label className="text-sm font-semibold text-primary">signed n = {value}<input className="mt-2 w-full accent-current" type="range" min="-128" max="127" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="magic M" value={magic.toString()} /><Stat label="signed high M·n" value={high.toString()} /><Stat label="sign correction" value={(-signMask).toString()} /><Stat label="q / oracle" value={`${quotient} / ${oracle}`} tone={quotient === oracle ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function HD10SignedMagicProofLab() {
  const [magic, setMagic] = useState(86);
  let failures = 0;
  for (let value = -128; value <= 127; value += 1) {
    const high = Math.floor((value * magic) / 256);
    const quotient = high - (value < 0 ? -1 : 0);
    if (quotient !== Math.trunc(value / 3)) failures += 1;
  }
  return (
    <Figure caption="A width-specific exhaustive oracle checks every signed input; changing the magic number by one immediately exposes counterexamples.">
      <label className="text-sm font-semibold text-primary">candidate magic = {magic}<input className="mt-2 w-full accent-current" type="range" min="82" max="90" value={magic} onChange={(event) => setMagic(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="inputs checked" value="256" /><Stat label="failures" value={failures.toString()} tone={failures === 0 ? "success" : "danger"} /><Stat label="certificate" value={failures === 0 ? "all pass" : "invalid magic"} /></div>
    </Figure>
  );
}

export function HD10UnsignedMagicLab() {
  const [value, setValue] = useState(221);
  const magic = 171;
  const product = value * magic;
  const quotient = Math.floor(product / 512);
  const oracle = Math.floor(value / 3);
  return (
    <Figure caption="Unsigned 8-bit division by 3 uses ceil(2^9/3)=171 and takes the product above bit 8, equivalent to multiply-high plus one shift.">
      <label className="text-sm font-semibold text-primary">unsigned n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="magic M" value={magic.toString()} /><Stat label="M·n" value={product.toString()} /><Stat label="floor product/512" value={quotient.toString()} tone="success" /><Stat label="oracle" value={oracle.toString()} /></div>
    </Figure>
  );
}

export function HD10RemainderFromQuotientLab() {
  const [value, setValue] = useState(221);
  const divisor = 7;
  const quotient = Math.floor(value / divisor);
  const remainder = value - quotient * divisor;
  return (
    <Figure caption="Once a constant-division quotient is proved exact, remainder is best derived as n−qd so quotient and remainder share one correctness path.">
      <label className="text-sm font-semibold text-primary">unsigned n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="d" value={divisor.toString()} /><Stat label="q" value={quotient.toString()} /><Stat label="q·d" value={(quotient * divisor).toString()} /><Stat label="r" value={remainder.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD10ExactInverseLab() {
  const [quotient, setQuotient] = useState(57);
  const divisor = 3;
  const inverse = 171;
  const dividend = quotient * divisor;
  const recovered = (dividend * inverse) & 0xff;
  return (
    <Figure caption="When an 8-bit n is known divisible by odd d=3, multiplying by d's inverse 171 modulo 256 recovers the exact quotient.">
      <label className="text-sm font-semibold text-primary">known quotient = {quotient}<input className="mt-2 w-full accent-current" type="range" min="0" max="85" value={quotient} onChange={(event) => setQuotient(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="n = 3q" value={dividend.toString()} /><Stat label="inverse" value={inverse.toString()} /><Stat label="n·inverse mod 256" value={recovered.toString()} tone="success" /><Stat label="exact" value={recovered === quotient ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD10InverseExplorerLab() {
  const [divisor, setDivisor] = useState(5);
  const odd = divisor | 1;
  const inverse = inverseOdd8(odd);
  return (
    <Figure caption="Every odd word is invertible modulo 2^w; even constants contain a power-of-two factor that must be removed by an exact shift first.">
      <label className="text-sm font-semibold text-primary">odd divisor = {odd}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" step="2" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="inverse mod 256" value={inverse.toString()} tone="success" /><Stat label="d·inverse mod 256" value={((odd * inverse) & 0xff).toString()} /><Stat label="invertible" value={inverse ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD10DigitSumLab() {
  const [value, setValue] = useState(221);
  const digits = [value & 3, (value >>> 2) & 3, (value >>> 4) & 3, (value >>> 6) & 3];
  const sum = digits.reduce((total, digit) => total + digit, 0);
  const remainder = sum % 3;
  return (
    <Figure caption="Because base 4 is congruent to 1 modulo 3, an 8-bit number's remainder modulo 3 equals the sum of its 2-bit digits modulo 3.">
      <label className="text-sm font-semibold text-primary">n = {value} ({bits(value)})<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="base-4 digits" value={digits.slice().reverse().join(" ")} /><Stat label="digit sum" value={sum.toString()} /><Stat label="sum mod 3" value={remainder.toString()} tone="success" /><Stat label="n mod 3" value={(value % 3).toString()} /></div>
    </Figure>
  );
}

export function HD10AlternatingDigitsLab() {
  const [value, setValue] = useState(221);
  const binaryDigits = Array.from({ length: 8 }, (__, bit) => (value >>> bit) & 1);
  const alternating = binaryDigits.reduce((total, digit, index) => total + (index % 2 === 0 ? digit : -digit), 0);
  const normalized = ((alternating % 3) + 3) % 3;
  return (
    <Figure caption="Because binary base 2 is congruent to −1 modulo 3, alternating bit sums also preserve the remainder modulo 3.">
      <label className="text-sm font-semibold text-primary">n = {bits(value)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="alternating sum" value={alternating.toString()} /><Stat label="normalized mod 3" value={normalized.toString()} tone="success" /><Stat label="oracle" value={(value % 3).toString()} /></div>
    </Figure>
  );
}

export function HD10NoMulHighLab() {
  const [value, setValue] = useState(221);
  const divisor = 7;
  const result = divideShiftSubtract(value, divisor);
  return (
    <Figure caption="A fixed shift-subtract divider uses pre-shifted constant divisors and comparisons, providing a no-multiply-high fallback with fixed width-bounded work.">
      <label className="text-sm font-semibold text-primary">unsigned n = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="constant d" value={divisor.toString()} /><Stat label="fixed steps" value="8" /><Stat label="quotient" value={result.quotient.toString()} tone="success" /><Stat label="remainder" value={result.remainder.toString()} /></div>
    </Figure>
  );
}

export function HD10PreconditionLab() {
  const [divisible, setDivisible] = useState(true);
  const [width, setWidth] = useState(false);
  const [rounding, setRounding] = useState(true);
  const complete = divisible && width && rounding;
  return (
    <Figure caption="Magic and modular-inverse division are safe only when divisibility, width, signedness, and rounding preconditions match the generated constants.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={divisible} onChange={(event) => setDivisible(event.target.checked)} />divisibility</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={width} onChange={(event) => setWidth(event.target.checked)} />width/signedness</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={rounding} onChange={(event) => setRounding(event.target.checked)} />rounding</label></div>
      <div className="mt-4"><Stat label="constant-division contract" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD10ConstantDivisionCertificateLab() {
  const [proof, setProof] = useState(true);
  const [exhaustive, setExhaustive] = useState(false);
  const [compiler, setCompiler] = useState(true);
  const complete = proof && exhaustive && compiler;
  return (
    <Figure caption="A constant divider is ready when its fixed-point error proof, full small-width oracle, and target compiler/ISA audit agree.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={proof} onChange={(event) => setProof(event.target.checked)} />error proof</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={exhaustive} onChange={(event) => setExhaustive(event.target.checked)} />exhaustive oracle</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={compiler} onChange={(event) => setCompiler(event.target.checked)} />target audit</label></div>
      <div className="mt-4"><Stat label="divider certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
