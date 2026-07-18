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

function divisionTrace(dividend: number, divisor: number, width = 8) {
  const states: Array<{ bit: number; incoming: number; quotient: number; remainder: number; subtract: boolean }> = [];
  let quotient = 0;
  let remainder = 0;
  for (let bit = width - 1; bit >= 0; bit -= 1) {
    const incoming = (dividend >>> bit) & 1;
    remainder = remainder * 2 + incoming;
    const subtract = remainder >= divisor;
    if (subtract) {
      remainder -= divisor;
      quotient |= 1 << bit;
    }
    states.push({ bit, incoming, quotient, remainder, subtract });
  }
  return states;
}

function unsignedViaSignedShape(dividend: number, divisor: number) {
  if (divisor >= 128) {
    const quotient = dividend >= divisor ? 1 : 0;
    return { quotient, remainder: dividend - quotient * divisor, path: "high-bit divisor: quotient is 0 or 1" };
  }
  if (dividend < 128) {
    const quotient = Math.floor(dividend / divisor);
    return { quotient, remainder: dividend % divisor, path: "both operands signed-nonnegative" };
  }
  let quotient = 2 * Math.floor((dividend >>> 1) / divisor);
  let remainder = dividend - quotient * divisor;
  if (remainder >= divisor) {
    quotient += 1;
    remainder -= divisor;
  }
  return { quotient, remainder, path: "halve dividend, double quotient, correct once" };
}

export function HD9DivisionIdentityLab() {
  const [dividend, setDividend] = useState(173);
  const [divisor, setDivisor] = useState(13);
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  return (
    <Figure caption="Unsigned Euclidean division returns the unique q and r satisfying n = qd + r with 0 ≤ r < d.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">n = {dividend}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={dividend} onChange={(event) => setDividend(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">d = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="63" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="quotient q" value={quotient.toString()} /><Stat label="remainder r" value={remainder.toString()} /><Stat label="qd+r" value={(quotient * divisor + remainder).toString()} tone="success" /><Stat label="r<d" value={remainder < divisor ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD9RestoringStepLab() {
  const [dividend, setDividend] = useState(173);
  const [divisor, setDivisor] = useState(13);
  const [step, setStep] = useState(4);
  const states = divisionTrace(dividend, divisor);
  const state = states[Math.min(step, states.length - 1)];
  return (
    <Figure caption="Restoring division shifts one dividend bit into the partial remainder, subtracts d when possible, and emits the corresponding quotient bit.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">n = {bits(dividend)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={dividend} onChange={(event) => setDividend(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">d = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="63" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label></div>
      <label className="mt-4 block text-sm font-semibold text-primary">processed step = {step + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="source bit" value={state.bit.toString()} /><Stat label="incoming" value={state.incoming.toString()} /><Stat label="subtract d" value={state.subtract ? "yes" : "no"} tone={state.subtract ? "success" : "accent"} /><Stat label="partial q:r" value={`${bits(state.quotient)}:${state.remainder}`} /></div>
    </Figure>
  );
}

export function HD9DivisionInvariantLab() {
  const [dividend, setDividend] = useState(173);
  const divisor = 13;
  const trace = divisionTrace(dividend, divisor);
  const final = trace[trace.length - 1];
  const reconstructed = final.quotient * divisor + final.remainder;
  return (
    <Figure caption="At completion, quotient and remainder reconstruct the dividend exactly and the remainder is normalized below the divisor.">
      <label className="text-sm font-semibold text-primary">n = {dividend}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={dividend} onChange={(event) => setDividend(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="q" value={final.quotient.toString()} /><Stat label="r" value={final.remainder.toString()} /><Stat label="q·d+r" value={reconstructed.toString()} tone="success" /><Stat label="exact" value={reconstructed === dividend ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD9UnsignedSignedCasesLab() {
  const [dividend, setDividend] = useState(221);
  const [divisor, setDivisor] = useState(37);
  const result = unsignedViaSignedShape(dividend, divisor);
  return (
    <Figure caption="Using only signed division requires case splits: a high-bit divisor bounds q by one, while a high-bit dividend with positive divisor uses halve/double/correct.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">unsigned n = {dividend}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={dividend} onChange={(event) => setDividend(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">unsigned d = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="selected path" value={result.path} /><Stat label="quotient" value={result.quotient.toString()} tone="success" /><Stat label="remainder" value={result.remainder.toString()} /></div>
    </Figure>
  );
}

export function HD9HalfDividendLab() {
  const [dividend, setDividend] = useState(221);
  const divisor = 37;
  const half = dividend >>> 1;
  const baseQuotient = 2 * Math.floor(half / divisor);
  const residual = dividend - baseQuotient * divisor;
  const correction = residual >= divisor ? 1 : 0;
  return (
    <Figure caption="For high-bit n and positive signed d, doubling floor(floor(n/2)/d) is at most one below the true quotient.">
      <label className="text-sm font-semibold text-primary">unsigned n = {dividend}<input className="mt-2 w-full accent-current" type="range" min="128" max="255" value={dividend} onChange={(event) => setDividend(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="floor n/2" value={half.toString()} /><Stat label="base quotient" value={baseQuotient.toString()} /><Stat label="residual" value={residual.toString()} /><Stat label="correction" value={correction.toString()} tone="success" /></div>
    </Figure>
  );
}

export function HD9LongDivisionLab() {
  const [dividend, setDividend] = useState(0b11010110);
  const [divisor, setDivisor] = useState(11);
  const trace = divisionTrace(dividend, divisor);
  const quotientBits = trace.map((state) => state.subtract ? "1" : "0").join("");
  const final = trace[trace.length - 1];
  return (
    <Figure caption="Unsigned long division emits quotient bits from most to least significant while carrying only a bounded partial remainder.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">n = {bits(dividend)}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={dividend} onChange={(event) => setDividend(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">d = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="emitted q bits" value={quotientBits} tone="success" /><Stat label="quotient" value={final.quotient.toString()} /><Stat label="remainder" value={final.remainder.toString()} /></div>
    </Figure>
  );
}

export function HD9PartialRemainderWidthLab() {
  const [remainder, setRemainder] = useState(29);
  const divisor = 31;
  const incoming = 1;
  const shifted = remainder * 2 + incoming;
  return (
    <Figure caption="Although r is below d before a step, shifting it and adding one may require w+1 bits; wide storage or carry-aware logic is necessary.">
      <label className="text-sm font-semibold text-primary">partial r = {remainder}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={remainder} onChange={(event) => setRemainder(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="d" value={divisor.toString()} /><Stat label="2r+bit" value={shifted.toString()} tone={shifted > 31 ? "warning" : "accent"} /><Stat label="needs 6th bit" value={shifted > 31 ? "yes" : "no"} tone={shifted > 31 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD9NormalizationLab() {
  const [divisor, setDivisor] = useState(37);
  const shift = divisor === 0 ? 8 : Math.clz32(divisor) - 24;
  const normalized = (divisor << shift) & 0xff;
  return (
    <Figure caption="Multiword division normalizes the divisor so its highest limb has the top bit set, making quotient-digit estimates tightly bounded.">
      <label className="text-sm font-semibold text-primary">8-bit divisor = {bits(divisor)}<input className="mt-2 w-full accent-current" type="range" min="1" max="255" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="leading zeros" value={shift.toString()} /><Stat label="normalized" value={bits(normalized)} tone="success" /><Stat label="top bit set" value={(normalized & 0x80) !== 0 ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD9QuotientEstimateLab() {
  const [lowDigit, setLowDigit] = useState(13);
  const base = 16;
  const u2 = 6;
  const u1 = 12;
  const d1 = 9;
  const d0 = 11;
  const dividend = u2 * base * base + u1 * base + lowDigit;
  const divisor = d1 * base + d0;
  const estimate = Math.min(base - 1, Math.floor((u2 * base + u1) / d1));
  const exact = Math.floor(dividend / divisor);
  return (
    <Figure caption="A normalized top-limb estimate may be slightly high because it ignores lower divisor digits; multiply-subtract and correction produce the exact quotient digit.">
      <label className="text-sm font-semibold text-primary">low dividend digit = {lowDigit}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={lowDigit} onChange={(event) => setLowDigit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="dividend" value={dividend.toString()} /><Stat label="divisor" value={divisor.toString()} /><Stat label="top estimate" value={estimate.toString()} tone={estimate === exact ? "success" : "warning"} /><Stat label="exact digit" value={exact.toString()} /></div>
    </Figure>
  );
}

export function HD9DoublewordDivisionLab() {
  const [high, setHigh] = useState(23);
  const [low, setLow] = useState(197);
  const [divisor, setDivisor] = useState(37);
  const dividend = high * 256 + low;
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const fits = quotient <= 255;
  return (
    <Figure caption="Dividing a high:low doubleword by one word yields a one-word quotient exactly when the high word is below the divisor.">
      <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold text-primary">high = {high}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={high} onChange={(event) => setHigh(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">low = {low}<input className="mt-2 w-full accent-current" type="range" min="0" max="255" value={low} onChange={(event) => setLow(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">d = {divisor}<input className="mt-2 w-full accent-current" type="range" min="1" max="63" value={divisor} onChange={(event) => setDivisor(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="doubleword n" value={dividend.toString()} /><Stat label="quotient" value={quotient.toString()} tone={fits ? "success" : "warning"} /><Stat label="remainder" value={remainder.toString()} /><Stat label="q fits byte" value={fits ? "yes" : "no"} /></div>
    </Figure>
  );
}

export function HD9QuotientFitLab() {
  const [high, setHigh] = useState(23);
  const divisor = 37;
  const fits = high < divisor;
  return (
    <Figure caption="For base B, (high·B+low)/d is below B for every low digit exactly when high is below d.">
      <label className="text-sm font-semibold text-primary">high word = {high}<input className="mt-2 w-full accent-current" type="range" min="0" max="63" value={high} onChange={(event) => setHigh(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="divisor" value={divisor.toString()} /><Stat label="high<d" value={fits ? "yes" : "no"} tone={fits ? "success" : "warning"} /><Stat label="one-word quotient" value={fits ? "guaranteed" : "not guaranteed"} /></div>
    </Figure>
  );
}

export function HD9ExceptionalCasesLab() {
  const [divisorZero, setDivisorZero] = useState(false);
  const [minimumOverMinusOne, setMinimumOverMinusOne] = useState(true);
  const [rounding, setRounding] = useState(false);
  const safe = !divisorZero && !minimumOverMinusOne && rounding;
  return (
    <Figure caption="Signed division needs explicit guards for divisor zero, minimum divided by minus one, and the language's quotient rounding rule.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={divisorZero} onChange={(event) => setDivisorZero(event.target.checked)} />divisor zero</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={minimumOverMinusOne} onChange={(event) => setMinimumOverMinusOne(event.target.checked)} />min / −1</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={rounding} onChange={(event) => setRounding(event.target.checked)} />rounding specified</label></div>
      <div className="mt-4"><Stat label="division contract" value={safe ? "safe" : "incomplete"} tone={safe ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD9DivisionCertificateLab() {
  const [identity, setIdentity] = useState(true);
  const [width, setWidth] = useState(false);
  const [exceptions, setExceptions] = useState(true);
  const complete = identity && width && exceptions;
  return (
    <Figure caption="A division routine is complete when quotient/remainder identity, temporary widths, and exceptional inputs are all proved.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={identity} onChange={(event) => setIdentity(event.target.checked)} />q·d+r</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={width} onChange={(event) => setWidth(event.target.checked)} />temporary width</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={exceptions} onChange={(event) => setExceptions(event.target.checked)} />exceptions</label></div>
      <div className="mt-4"><Stat label="division certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
